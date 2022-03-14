import { ajax } from '@/utils/request'

export default {
    getImgList: (userId, query) => ajax('get', `/user/spaces/${userId}/images/list`, { query })
}
