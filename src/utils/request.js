import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import NProgress from 'nprogress'

const request = axios.create({
    baseURL: '/',
    validateStatus: status => {
        if (status > 400) {
            console.warn(`HTTP 请求出错 status: ${status}`)
        }
        return status >= 200 && status <= 503
    },
    withCredentials: true
})

function errorHandler (error) {
    if (error && error.response) {
        error.message = `请求出错（${error.response.status}）!`
    } else {
        // 请求超时或者网络有问题
        if (error.message.includes('timeout')) {
            error.message = '请求超时！请检查网络是否正常'
        } else {
            error.message = '请求失败，请检查网络是否已连接'
        }
    }
    return Promise.reject(Error(error))
}

request.interceptors.request.use(config => {
    NProgress.start()
    return config
})

request.interceptors.response.use(response => {
    NProgress.done()
    const { data: { code, data, message, status }, status: httpStatus } = response
    
    if (httpStatus === 401) {
        Vue.prototype.$bkMessage({
            theme: 'warning',
            message: '登录失效，请重新登录'
        })
        router.replace({
            path: '/login',
            query: {
                from: location.href
            }
        })
    } else if (httpStatus === 500 || httpStatus === 503 || httpStatus === 502) {
            return Promise.reject({ // eslint-disable-line
            status: httpStatus,
            message: message ?? '服务异常，请联系管理员'
        })
    } else if (httpStatus === 400 || httpStatus === 404) {
            return Promise.reject({ // eslint-disable-line
            status: httpStatus,
            message: message ?? '接口请求失败，请联系管理员'
        })
    } else if ((typeof code !== 'undefined' && code !== 0) || (typeof status !== 'undefined' && status !== 0)) {
        let msg = message
        if (Object.prototype.toString.call(message) === '[object Object]') {
            msg = Object.keys(message).map(key => message[key].join(';')).join(';')
        } else if (Object.prototype.toString.call(message) === '[object Array]') {
            msg = message.join(';')
        }
        const errorMsg = { httpStatus, message: msg, code: code || status }
        return Promise.reject(errorMsg)
    }
    return data
}, errorHandler)

Vue.prototype.$ajax = request

function joinUrl (url, query) {
    const keys = Object.keys(query)
    keys.forEach((key, index) => {
        const val = encodeURIComponent(query[key])
        if (index === 0) url += `?${key}=${val}`
        else url += `&${key}=${val}`
    })
    return url
}

export function ajax (method, url, { query = {}, params } = {}, msName = 'web', header = 'application/json; charset=UTF-8') {
    return new Promise((resolve, reject) => {
        url = joinUrl(msName + '/api' + url, query)
        const apiFun = request[method]
        request.defaults.headers.post['Content-Type'] = header
        apiFun(url, params).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
