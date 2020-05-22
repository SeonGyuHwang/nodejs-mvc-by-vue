import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  showModal: false,

  idx: null,

  row: {},
  list: [],
  count: 0,

  userEmail: "",
  startDate: "",
  endDate: ""
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
