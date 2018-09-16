import Vue from "vue";
import Vuex, { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { CounterState } from "@/types/counter";
import { RootState } from "@/store";

Vue.use(Vuex);

const state: CounterState = {
  counter: 0
};

const getters: GetterTree<CounterState, RootState> = {
  counter: (state): CounterState["counter"] => {
    return state.counter;
  }
};

const mutations: MutationTree<CounterState> = {
  increment: state => {
    state.counter += 1;
  },
  decrement: state => {
    state.counter -= 1;
  }
};

const actions: ActionTree<CounterState, RootState> = {
  increment: ({ commit }) => {
    commit("increment");
  },
  decrement: ({ commit }) => {
    commit("decrement");
  }
};

export const CounterModule: Module<CounterState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
