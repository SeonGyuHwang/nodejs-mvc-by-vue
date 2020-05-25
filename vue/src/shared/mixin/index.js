import * as mixinGlobals from './globals'

export default {
  install (Vue) {

    Object.values({
      ...mixinGlobals
    }).forEach((mixinGlobal) => {

      Vue.mixin(mixinGlobal)

    })

  }
}
