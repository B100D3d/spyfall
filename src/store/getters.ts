import { State } from "@/types"

export default {
    encrypt: (state: State) => state.encrypt,
    key: (state: State) => state.key,
    result: (state: State) => state.result,
    loading: (state: State) => state.loading,
    sourceSelected: (state: State) => state.sourceSelected,
    secretSelected: (state: State) => state.secretSelected,
}
