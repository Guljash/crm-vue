import * as firebase from "firebase/app";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    },
  },
  actions: {
    async fetchInfo(ctx) {
      try {
        const uid = await ctx.dispatch('getUid')
        const info = (await firebase.default.database().ref(`/users/${uid}/info`).once('value')).val()
        ctx.commit('setInfo', info)
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    info: s => s.info
  }
}