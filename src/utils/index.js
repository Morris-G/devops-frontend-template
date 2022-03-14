/**
 * Cookie名称
 */
export const COOKIES_TENANT = 'X-DEVOPS-TENANT-ID'

/**
 * 动态加载脚本
 * @param {string} url
 * @returns Promise
 */
export function loadScript (url) {
    return new Promise(resolve => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        document.getElementsByTagName('head')[0].appendChild(script)
        script.onload = () => {
            resolve()
        }
    })
}

export function joinUrl (url, query) {
    const keys = Object.keys(query)
    keys.forEach((key, index) => {
        const val = encodeURIComponent(query[key])
        if (index === 0) url += `?${key}=${val}`
        else url += `&${key}=${val}`
    })
    return url
}

export function throttleMessage (fn, delay = 1000) {
    let lastTime = 0
    return function (messageBody) {
        // 设置默认配置
        const message = {
            limit: 1,
            offsetY: 80,
            ellipsisLine: 2,
            ellipsisCopy: true,
            ...messageBody
        }
        if (message.theme !== 'error') {
            fn(message)
            return
        }
        if (
            ['property', 'defined'].find(
                ignore =>
                    !message.message || message.message.indexOf(ignore) !== -1
            )
        ) {
            throw new Error(message.message)
        }
        const now = +new Date()
        if (lastTime + delay > now) return
        fn(message)
        lastTime = now
    }
}

/**
 * 绑定事件
 *
 * @param {Object} elem DOM 元素
 * @param {string} type 事件名称
 * @param {Function} handler 事件处理函数
 */
export function addEvent (elem, type, handler) {
    if (!elem) {
        return
    }
    if (elem.addEventListener) {
        elem.addEventListener(type, handler, false)
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, handler)
    } else {
        elem['on' + type] = handler
    }
}

/**
 * 移除事件
 *
 * @param {Object} elem DOM 元素
 * @param {string} type 事件名称
 * @param {Function} handler 事件处理函数
 */
export function removeEvent (elem, type, handler) {
    if (!elem) {
        return
    }
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handler, false)
    } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, handler)
    } else {
        elem['on' + type] = null
    }
}

/**
 * 格式化大小
 * @param {Number} size_
 * @returns string
 */
export function parseSize (size_) {
    if (size_ === undefined) return
    let size = ''
    if (size_ < 0.1 * 1024) {
        size = size_.toFixed(2) + 'B'
    } else if (size_ < 0.1 * 1024 * 1024) {
        size = (size_ / 1024).toFixed(2) + 'KB'
    } else if (size_ < 0.1 * 1024 * 1024 * 1024) {
        size = (size_ / (1024 * 1024)).toFixed(2) + 'MB'
    } else {
        size = (size_ / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
    }
    const sizestr = size + ''
    const len = sizestr.indexOf('.')
    const dec = sizestr.substr(len + 1, 2)
    if (dec === '00') {
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
    }
    return sizestr
}

/**
 * 用于时间格式化
 * @param {*} time 时间
 * @returns 返回相差于现在时间xx分钟
 */
export function showMinute (time) {
    const date = new Date()
    const date2 = date.getTime() - new Date(time).getTime() // 时间差的毫秒数
    const leave1 = date2 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    // 计算相差分钟数
    const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60 * 1000))
    return minutes
}

/**
 * 用于日期格式化
 * @param {*} time 时间
 * @returns 返回年月日，周几
 */
export function formateDate (time) {
    const date = new Date(time)
    const Week = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '日'
    }
    let hourStr = ''
    const hour = Number(date.getHours())
    switch (true) {
        case hour < 6:
            hourStr = '凌晨'
            break
        case hour < 9:
            hourStr = '早上'
            break
        case hour < 12:
            hourStr = '上午'
            break
        case hour < 14:
            hourStr = '中午'
            break
        case hour < 17:
            hourStr = '下午'
            break
        case hour < 19:
            hourStr = '傍晚'
            break
        case hour < 22:
            hourStr = '晚上'
            break
        default:
            hourStr = '深夜'
            break
    }
    const dateText = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    const weekText = `星期${Week[date.getDay()]}`
    const divisionText = `${hourStr}${date.getHours()}:${date.getMinutes()}`
    return { dateText, weekText, divisionText }
}

export function copy (value) {
    const textarea = document.createElement('textarea')
    // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
    textarea.readOnly = true
    // 移除屏幕范围
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    textarea.value = value
    document.body.appendChild(textarea)
    textarea.select()
    const result = document.execCommand('Copy')
    if (result) {
        window.marsVue.$bkNotify({
            limit: 1,
            delay: 3000,
            theme: 'success',
            position: 'bottom-right',
            title: '已复制链接至剪贴板'
        })
    }
    document.body.removeChild(textarea)
}

export function isJson (str) {
    if (str === '') return true
    if (typeof str === 'string') {
        try {
            const obj = JSON.parse(str)
            if (typeof obj === 'object' && obj) {
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    }
}
