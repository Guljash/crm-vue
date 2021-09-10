import * as firebase from "firebase/app";

export default {
    actions: {
        async createRecord(ctx, record) {
            try {
                const uid = await ctx.dispatch('getUid')
                return await firebase.default.database().ref(`/users/${uid}/records`).push(record)
            } catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },
        async fetchRecords(ctx) {
            try {
                const uid = await ctx.dispatch('getUid')
                const records = (await firebase.default.database().ref(`/users/${uid}/records`).once('value')).val() || {}
                if (records) {
                    return Object.keys(records).map(key => ({ ...records[key], id: key }))
                }
                else {
                    return []
                }
            } catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },
        async fetchRecordById(ctx, id) {
            try {
                const uid = await ctx.dispatch('getUid')
                const record = (await firebase.default.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
                if (record) {
                    return {...record, id}
                }
                else {
                    return []
                }
            } catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        }
    }
}