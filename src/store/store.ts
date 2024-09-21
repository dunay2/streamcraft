import { createStore } from "vuex";
import { Graph } from "@/models/Graph";
import { jsPlumb, jsPlumbInstance } from "jsplumb";

interface IState {
  graphInstance: Graph;
  jsPlumbInstance: jsPlumbInstance;
}

const store = createStore<IState>({
  state: {
    graphInstance: new Graph(),
    jsPlumbInstance: jsPlumb.getInstance(),
  },
  mutations: {
    SET_GRAPH_INSTANCE(state, graph: Graph) {
      state.graphInstance = graph;
    },
    SET_JSPLUMB_INSTANCE(state, instance: jsPlumbInstance) {
      state.jsPlumbInstance = instance;
    },
  },
  actions: {
    initializeGraph({ commit }, graph: Graph) {
      commit("SET_GRAPH_INSTANCE", graph);
    },
    initializeJsPlumb({ commit }, instance: jsPlumbInstance) {
      commit("SET_JSPLUMB_INSTANCE", instance);
    },
  },
  getters: {
    graphInstance: (state) => state.graphInstance,
    jsPlumbInstance: (state) => state.jsPlumbInstance,
  },
});

export default store;
