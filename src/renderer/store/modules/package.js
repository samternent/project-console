import finder from 'find-package-json';
import { spawn } from 'child_process';
import Vue from 'vue';

// this is not stored in state - just memory
// eslint-disable-next-line no-unused-vars
const processes = {};

const state = {
  packageJson: false,
  processes: {},
  messages: {},
};

const mutations = {
  packageJson(state, payload) {
    state.packageJson = payload;
  },
  processes(state, payload) {
    state.processes = Object.assign({}, state.processes, { [payload.id]: payload });
  },
  messages(state, payload) {
    state.messages = Object.assign({}, state.messages, { [payload.id]: payload.messages });
  },
  removeMessage(state, payload) {
    Vue.delete(state.messages, payload);
  },
};

const actions = {
  getPackage({ commit, rootState }) {
    const packageJson = finder(`${rootState.system.path}`);
    if (packageJson) {
      commit('packageJson', packageJson.next().value);
    }
  },
  npmRun({ commit }, payload) {
    processes[payload.id] = spawn('npm', ['run', payload.script], {
      cwd: payload.cwd,
      encoding: 'utf8',
      killSignal: 'SIGTERM',
    });

    commit('processes', {
      id: payload.id,
      active: true,
    });

    processes[payload.id].stdout.on('data', (data) => {
      commit('processes', {
        id: payload.id,
        active: true,
      });

      const messages = state.messages[payload.id] ?
        state.messages[payload.id].slice(0) : [];

      messages.push({
        time: Date.now(),
        message: data.toString(),
      });
      commit('messages', {
        id: payload.id,
        messages,
      });
    });
    processes[payload.id].stderr.on('data', (data) => {
      commit('processes', {
        id: payload.id,
        state: 'error',
      });

      const messages = state.messages[payload.id] ?
        state.messages[payload.id].slice(0) : [];

      messages.push({
        time: Date.now(),
        message: data.toString(),
      });
      commit('messages', {
        id: payload.id,
        messages,
      });
    });
    processes[payload.id].on('close', (code) => {
      commit('processes', {
        id: payload.id,
        active: false,
      });

      const messages = state.messages[payload.id] ?
        state.messages[payload.id].slice(0) : [];

      messages.push({
        time: Date.now(),
        message: `Exited with code: ${code}`,
      });
      commit('messages', {
        id: payload.id,
        messages,
      });
    });
  },
  killProcess(store, payload) {
    processes[payload].kill('SIGTERM');
  },

};

const getters = {
  isProcessActive(state) {
    return process => !!state.processes[process] && state.processes[process].active;
  },
  projectProcess(state) {
    return project => state.processes[project];
  },
  projectMessages(state) {
    return project => state.messages[project];
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
