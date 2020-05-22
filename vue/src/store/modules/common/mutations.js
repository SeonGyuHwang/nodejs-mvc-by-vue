import * as t from './types'

export default {
  [t.SET_CONTENT_LOADING]: (state, is_bool) => {
    state.contentLoading = is_bool
  },
  [t.SET_USER_LOGIN]: (state, args) => {
    state.user_info = args
  },
  [t.SET_USER_LOGIN_FAIL]: (state) => {
    state.user_info = null
  },
  [t.SET_USER_LOGOUT]: (state) => {
    state.user_info = null
  },
  [t.SET_USER_LOGIN_CHECK]: (state, is_bool) => {
    state.login_check = is_bool
  }
}
