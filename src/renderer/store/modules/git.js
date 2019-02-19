import git from 'nodegit';

const state = {
  repository: null,
  name: null,
  url: null,
  browser: null,
  status: null,
  references: null,
  branch: '',
  fetching: false,
};

const mutations = {
  repository(state, payload) {
    state.repository = payload;
  },
  branch(state, payload) {
    state.branch = payload;
  },
  name(state, payload) {
    state.name = payload;
  },
  url(state, payload) {
    state.url = payload;
  },
  browser(state, payload) {
    state.browser = payload;
  },
  clear(state) {
    Object.keys(state).forEach((key) => {
      state[key] = null;
    });
  },
};

const actions = {
  getRepository({ rootState, commit }) {
    git.Repository.open(`${rootState.system.path}`)
      .then(async (repository) => {
        commit('repository', repository);


        repository.getCurrentBranch()
          .then(async (branch) => {
            const name = await branch.shorthand();
            commit('branch', name);
          });

        repository.config()
          .then(async (config) => {
            const url = await config.getStringBuf('remote.origin.url');
            const name = url.toString().split(':')[1].split('.git')[0];
            // this will probably only work for github
            const browser = url.toString().replace(':', '/').replace('git@', 'https://').replace('.git', '');

            commit('url', url);
            commit('name', name);
            commit('browser', browser);
          });
      })
      .catch(() => {
        commit('clear');
      });
  },
};

const getters = {
  isGitRepository(state) {
    return !!state.repository;
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
