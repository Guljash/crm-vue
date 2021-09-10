import * as firebase from "firebase/app";

export default {
    actions: {
        async createCategory(ctx, { title, limit }) {
            try {
                const uid = await ctx.dispatch('getUid')
                const category = await firebase.default.database().ref(`/users/${uid}/categories`).push({ title, limit })
                return { title, limit, id: category.key }
            } catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },
        async updateCategory(ctx, { title, limit, id }) {
            try {
                const uid = await ctx.dispatch('getUid')
                await firebase.default.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
            } catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },
        async fetchCategories(ctx) {
            try {
                const uid = await ctx.dispatch('getUid')
                const categories = (await firebase.default.database().ref(`/users/${uid}/categories`).once('value')).val()
                if (categories){
                    return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
                }
                else{
                    return []
                }
            } catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },
        async fetchCategoryById(ctx, id) {
            try {
                const uid = await ctx.dispatch('getUid')
                const category = (await firebase.default.database().ref(`/users/${uid}/categories`).child(id).once('value')).val()
                if (category){
                    return {...category, id}
                }
                else{
                    return []
                }
            } catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },
    }
}