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
    async updateInfo(ctx, toUpdate) {
      try {
        const uid = await ctx.dispatch('getUid')
        const updateData = {...this.getters.info, ...toUpdate}
        await firebase.default.database().ref(`/users/${uid}/info`).update(updateData)
        ctx.commit('setInfo', updateData)
      } catch (e) {
        console.log(e);
      }
    },
    async fetchInfo(ctx) {
      try {
        const uid = await ctx.dispatch('getUid')
        const info = (await firebase.default.database().ref(`/users/${uid}/info`).once('value')).val()
        ctx.commit('setInfo', info)
      } catch (e) {
        ctx.commit('setError', e);
      }
    }
  },
  getters: {
    info: s => s.info
  }
}