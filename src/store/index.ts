import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import getters from "@/store/getters"
import actions from "@/store/actions"
import { State } from "@/types"

Vue.use(Vuex)

const state: State = {
    encrypt: true,
    key: "",
    result: null,
    loading: false,
    sourceSelected: false,
    secretSelected: false,
}

export default new Vuex.Store<State>({
    state,
    getters,
    mutations,
    actions,
})
