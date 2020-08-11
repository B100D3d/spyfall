import { MutationTree } from "vuex"
import { State } from "@/types"

const mutations: MutationTree<State> = {
    CHANGE_MOD(state) {
        state.encrypt = !state.encrypt
    },
    SET_KEY(state, key: string) {
        state.key = key
    },
    SET_RESULT(state, result: string) {
        state.result = result
    },
    SET_SOURCE_SELECTED(state, selected: boolean) {
        state.sourceSelected = selected
    },
    SET_SECRET_SELECTED(state, selected: boolean) {
        state.secretSelected = selected
    },
    SET_LOADING(state, isLoading: boolean) {
        state.loading = isLoading
    },
}

export default mutations
