import { GetterTree } from "vuex"
import { State } from "@/types"

const getters: GetterTree<State, State> = {
    encrypt: (state) => state.encrypt,
    key: (state) => state.key,
    result: (state) => state.result,
    loading: (state) => state.loading,
    sourceSelected: (state) => state.sourceSelected,
    secretSelected: (state) => state.secretSelected,
}

export default getters
