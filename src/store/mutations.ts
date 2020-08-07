import { State } from "@/types"

export default {
    CHANGE_MOD(state: State) {
        state.encrypt = !state.encrypt
    },
    SET_KEY(state: State, key: string) {
        state.key = key
    },
    SET_RESULT(state: State, result: string) {
        state.result = result
    },
    SET_SOURCE_SELECTED(state: State, selected: boolean) {
        state.sourceSelected = selected
    },
    SET_SECRET_SELECTED(state: State, selected: boolean) {
        state.secretSelected = selected
    },
    SET_LOADING(state: State, isLoading: boolean) {
        state.loading = isLoading
    },
}
