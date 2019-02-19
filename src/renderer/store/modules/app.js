const state = {
  showFavorites: false,
  showConsole: false,
};

const mutations = {
  showFavorites(state, payload) {
    state.showFavorites = payload;
  },
  showConsole(state, payload) {
    state.showConsole = payload;
  },
  closeAll(state) {
    state.showConsole = false;
    state.showFavorites = false;
  },
};

const actions = {
  toggleFavorites({ commit, state }) {
    commit('showFavorites', !state.showFavorites);
    commit('showConsole', false);
  },
  toggleConsole({ commit, state }) {
    commit('showConsole', !state.showConsole);
    commit('showFavorites', false);
  },
};

const getters = {
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
