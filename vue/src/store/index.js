import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import common from '@/store/modules/common'
import board from '@/store/modules/board'
/**
 * Vuex
 * https://vuex.vuejs.org
 * Must call `Vue.use` before creating new instance
 */
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    common,
    board
  }
})
