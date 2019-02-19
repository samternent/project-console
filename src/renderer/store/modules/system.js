// import { ls } from 'shelljs';
import { homedir } from 'os';
import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';

import merge from 'deepmerge';

const isDirectory = source => lstatSync(source).isDirectory();

const getFileSystem = (path) => {
  const paths = readdirSync(path).filter(item => !(/(^|\/)\.[^/.]/g).test(item));

  return paths.map(name => ({
    name,
    folder: isDirectory(join(path, name)),
    path: join(path, name),
  })).reduce((acc, curr) => {
    acc[curr.name] = {
      isFile: !curr.folder,
      path: curr.path,
      name: curr.name,
    };
    return acc;
  }, {});
};

const state = {
  path: localStorage.getItem('path') || homedir(),
  fileSystem: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

const mutations = {
  path(state, payload) {
    localStorage.setItem('path', payload);
    state.path = payload;
  },
  populateFileTree(state, payload) {
    state.fileSystem = merge(state.fileSystem || {}, payload);
  },
  favorite(state, payload) {
    state.favorites = payload;
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  },
};

const actions = {
  cd({ commit }, payload) {
    commit('path', `${payload}`);
    commit('app/closeAll', null, { root: true });
  },
  back({ state, commit }) {
    const pathArray = state.path.split('/');
    pathArray.pop();
    commit('path', pathArray.join('/'));
  },
  favorite({ state, commit }) {
    const favorites = state.favorites.slice(0);
    const index = favorites.indexOf(state.path);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(state.path);
    }
    commit('favorite', favorites);
  },
  buildFileTree({ commit, state }) {
    const objectTreeMap = state.path.substring(1).split('/');
    const newMap = objectTreeMap.reduceRight((obj, next, i) => ({
      [next]: objectTreeMap.length - 1 === i ? getFileSystem(state.path) : obj }), {});
    commit('populateFileTree', newMap);
  },
};

const getters = {
  displayPath(state) {
    return state.path.split('/').slice(-1)[0] || '~';
  },
  getDisplayPath() {
    return path => path.split('/').slice(-1)[0] || null;
  },
  getFileSystem(state) {
    if (!state.fileSystem) return {};
    const displayFiles = state.path.substring(1).split('/').reduce((acc, curr) => acc[curr] || {},
      Object.assign({}, state.fileSystem));

    return Object.values(displayFiles).filter(file => file.name).reduce((acc, curr) => {
      acc[curr.isFile && curr.name ? 'files' : 'folders'].push(curr.name);
      return acc;
    }, {
      files: [],
      folders: [],
    });
  },
  hasPackage(state, getters) {
    if (!getters.getFileSystem.files) {
      return false;
    }
    return getters.getFileSystem.files.includes('package.json');
  },
  isFavorite(state) {
    return state.favorites.includes(state.path);
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
