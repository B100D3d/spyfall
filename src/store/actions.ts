import { ActionTree } from "vuex"
import { Query, SelectedImage, State } from "@/types"
import { encryptApi, decryptApi } from "@/services"

const actions: ActionTree<State, State> = {
    changeMod({ commit }) {
        commit("CHANGE_MOD")
    },
    setKey({ commit }, key: string) {
        commit("SET_KEY", key)
    },
    setResult({ commit }, result?: string) {
        commit("SET_RESULT", result)
    },
    setImageSelected(
        { commit },
        payload: { type: SelectedImage; selected: boolean }
    ) {
        switch (payload.type) {
            case SelectedImage.Secret:
                commit("SET_SECRET_SELECTED", payload.selected)
                break
            case SelectedImage.Source:
                commit("SET_SOURCE_SELECTED", payload.selected)
                break
        }
    },
    setLoading({ commit }, loading: boolean) {
        commit("SET_LOADING", loading)
    },
    submit(
        { commit, getters, dispatch },
        payload: {
            query: Query
            onError: (error: Error) => void
        }
    ) {
        const submitFunction = getters.encrypt ? encryptApi : decryptApi
        submitFunction(payload.query)
            .then((data) => dispatch("setResult", data.result))
            .catch(payload.onError)
            .finally(() => dispatch("setLoading", false))
    },
}

export default actions
