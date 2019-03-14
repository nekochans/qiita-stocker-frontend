import Vue from "vue";
import Vuex, { Module } from "vuex";
import { IQiitaState } from "@/types/qiita";
import { RootState } from "@/store";
import { actions } from "./actions";
import { state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";

Vue.use(Vuex);

export const QiitaModule: Module<IQiitaState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
