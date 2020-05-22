import * as t from './types'
import {
  mainChartDataAPI,
  getRowAPI,
  setRowAPI,
  delRowAPI,
  getListAPI,
} from "./api";

export default {
  setShowModal ({ commit }, bool) {
    return commit(t.SET_SHOW_MODAL, bool)
  },
  setIdx ({ commit }, idx) {
    return commit(t.SET_IDX, idx)
  },
  setUserEmail ({ commit }, email) {
    return commit(t.SET_USER_EMAIL, email)
  },
  setStartDate ({ commit }, date) {
    return commit(t.SET_START_DATE, date)
  },
  setEndDate ({ commit }, date) {
    return commit(t.SET_END_DATE, date)
  },
  getRow ({ commit }, payload) {
    return Promise.resolve()
      .then(() => {
        commit(t.CLEAR_ROW)

        return getRowAPI(payload)
      })
      .then((res) => {

        const result = typeof res === 'object' ? res.data : {}

        commit(t.SET_ROW, result.arr.row)

      })
      .catch((err) => {
        throw err
      })
  },
  setRow ({ commit }, payload) {
    return Promise.resolve()
      .then(() => {
        return setRowAPI(payload)
      })
      .then((res) => {

        const result = typeof res === 'object' ? res.data : {}

        alert(result.msg)

      })
      .catch((err) => {
        throw err
      })
  },
  delRow ({ commit }, payload) {
    return Promise.resolve()
      .then(() => {
        return delRowAPI(payload)
      })
      .then((res) => {

        const result = typeof res === 'object' ? res.data : {}

        if( result.status === 200 ) {
          commit(t.CLEAR_ROW)
        } else {
          alert(result.msg)
        }

      })
      .catch((err) => {
        throw err
      })
  },
  clearRow ({ commit }) {
    return commit(t.CLEAR_ROW)
  },
  getList ({ commit }, payload) {
    commit(t.SET_DATA, [])
    commit(t.SET_DATA_COUNT, 0)

    return Promise.resolve()
      .then(() => {
        this.dispatch('common/setContentLoading', true)

        return getListAPI(payload)
      })
      .then((res) => {

        //const result = res.data || {}
        const result = typeof res === 'object' ? res.data : {}
        let dataList = []
        let dataCount = 0

        try {
          dataList = result.arr.list
          dataCount = result.recordsTotal
        } catch(e) {

        }

        commit(t.SET_DATA, dataList)
        commit(t.SET_DATA_COUNT, dataCount)

      })
      .catch((err) => {
        throw err
      })
      .finally(() => {
        this.dispatch('common/setContentLoading', false)
      })
  }
}
