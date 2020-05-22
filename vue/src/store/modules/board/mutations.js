import * as t from './types'

export default {
  [t.SET_SHOW_MODAL]: (state, bool) => {
    state.showModal = bool || false
  },
  [t.SET_IDX]: (state, idx) => {
    state.idx = idx || null
  },
  [t.SET_ROW]: (state, row) => {
    state.row = row || {}
  },
  [t.CLEAR_ROW]: (state) => {
    state.row = {}
  },
  [t.SET_DATA]: (state, list) => {
    state.list = list || []
  },
  [t.SET_DATA_COUNT]: (state, count) => {
    state.count = count || 0
  },
  [t.SET_USER_EMAIL]: (state, email) => {
    state.userEmail = email || ""
  },
  [t.SET_START_DATE]: (state, date) => {
    state.startDate = date || ""
  },
  [t.SET_END_DATE]: (state, date) => {
    state.endDate = date || ""
  }
}
