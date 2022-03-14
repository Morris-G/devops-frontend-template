import Vue from 'vue'
import SvgIcon from '@/components/Icon/SvgIcon.vue'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/imgs/svg', false, /\.svg$/)
requireAll(req)

const reg = /^\.\/(.*)\.svg$/
export const iconNames = req.keys().map(dir => dir.match(reg)[1])

Vue.component('SvgIcon', SvgIcon)
