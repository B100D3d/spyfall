import { State } from "@/types"

export default {
    changeMod(state: State) {
        state.encrypt = !state.encrypt
    },
    setKey(state: State, key: string) {
        state.key = key
    },
    setResult(state: State, result: string) {
        state.result = result
    },
    setSourceSelected(state: State, selected: boolean) {
        state.sourceSelected = selected
    },
    setSecretSelected(state: State, selected: boolean) {
        state.secretSelected = selected
    },
    setLoading(state: State, isLoading: boolean) {
        state.loading = isLoading
    }
}