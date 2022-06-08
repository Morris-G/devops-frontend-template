import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import { throttleMessage, copy } from '@/utils'
import '@/plugins/svgIcon'

import bkMagic from '@ghost2019/bk-magic-vue'
import '@ghost2019/bk-magic-vue/dist/bk-magic-vue.min.css'

Vue.use(bkMagic)
window.Vue = Vue

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$copy = copy
Vue.prototype.$bkMessage = throttleMessage(Vue.prototype.$bkMessage, 1500)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
