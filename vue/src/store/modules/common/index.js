import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  host: window.location.origin,
  exclude_path: ['auth', 'cron'],
  login_check: false,
  user_info: null,

  contentLoading: false,

  GOOGLE_API_KEY: "",
  GOOGLE_CLIENT_ID: "",
  GOOGLE_CLIENT_SECRET_ID: "",

  NAVER_CLIENT_ID: "",
  NAVER_CLIENT_SECRET_ID: "",
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
