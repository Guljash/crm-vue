import * as firebase from "firebase/app";

export default {
  actions: {
    async login(ctx, { email, password }) {
      try {
        await firebase.default
          .auth()
          .signInWithEmailAndPassword(email, password);
      } catch (e) { 
        ctx.commit('setError', e)
        throw e;
      }
    },
    async register(ctx, { email, password, name }) {
      try {
        await firebase.default
          .auth()
          .createUserWithEmailAndPassword(email, password);

        const uid = await ctx.dispatch("getUid");
        await firebase.default.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name: name,
        });
      } catch (e) {
        ctx.commit('setError', e)
        throw e;
      }
    },
    getUid() {
      const user = firebase.default.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout(ctx) {
      await firebase.default.auth().signOut();
      ctx.commit('clearInfo')
    },
  },
};
