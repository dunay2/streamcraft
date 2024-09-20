import { createStore } from "vuex";
import { Graph } from "@/models/Graph";
import { jsPlumb } from "jsplumb";

const store = createStore({
  state: {
    graphInstance: new Graph(),
    jsPlumbInstance: jsPlumb.getInstance(),
  },
  mutations: {
    SET_GRAPH_INSTANCE(state, graph: Graph) {
      state.graphInstance = graph;
    },
    SET_JSPLUMB_INSTANCE(state, instance: any) {
      state.jsPlumbInstance = instance;
    },
  },
  actions: {
    initializeGraph({ commit }, graph: Graph) {
      commit("SET_GRAPH_INSTANCE", graph);
    },
    initializeJsPlumb({ commit }, instance: any) {
      commit("SET_JSPLUMB_INSTANCE", instance);
    },
  },
  getters: {
    graphInstance: (state) => state.graphInstance,
    jsPlumbInstance: (state) => state.jsPlumbInstance,
  },
});

export default store;
