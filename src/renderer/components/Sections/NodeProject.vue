<template>
  <transition name="slide">
    <div class="row" v-if="showProjectPanel">
      <at-tabs>
        <at-tab-pane  icon="icon-package" label="Package" name="package" :closable="false">
          <p v-if="packageJson">
            <package :packageJson="packageJson"/>
          </p>
        </at-tab-pane>
        <at-tab-pane icon="icon-play-circle" label="Scripts" name="scripts" :closable="false">
          <p v-if="packageJson">
            <scripts :scripts="Object.keys(packageJson.scripts)"/>
          </p>
        </at-tab-pane>
        <at-tab-pane
          v-for="(item, index) in Object.keys(packageJson.scripts)" :key="index"
          v-if="projectProcess(`${path}_:::_${item}`)"
          :label="item" :name="item"
          icon="icon-monitor">
          <p v-for="message in projectMessages(`${path}_:::_${item}`)" :key="message.time">
            {{message.time}}: <span v-html="formatMessage(message.message)"/>
          </p>
        </at-tab-pane>
      </at-tabs>
    </div>
  </transition>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

import Package from '@/components/Sections/Package';
import Scripts from '@/components/Sections/Scripts';

import Convert from 'ansi-to-html';
const convert = new Convert();

export default {
  components: {
    Package,
    Scripts,
  },
  computed: {
    ...mapState('package', {
      packageJson: 'packageJson',
      processes: 'processes',
    }),
    ...mapState('system', {
      path: 'path',
    }),
    ...mapGetters('package', [
      'projectProcess',
      'projectMessages',
      'isProcessActive',
    ]),
    showProjectPanel() {
      return !!this.packageJson;
    },
  },
  methods: {
    removeHandle({ name }) {
      this.$store.commit('package/removeMessage', name);
    },
    formatMessage(message) {
      return convert.toHtml(message);
    },
    isActive(item) {
      return this.isProcessActive(`${this.path}_:::_${item}`);
    },
  },
};
</script>
<style lang="scss" scoped>

.node-project {
  padding: 10px;
  overflow: auto;
  height: 100%;
  flex: 2;
  box-shadow: -4px 0 2px -2px rgba(#3A4750, 0.3);
  background-color: #fff;
  z-index: 2;
  border-top: 1px solid #efefef;
}

.at-tabs__pane {
  height: 76vh;
  overflow: auto;
}

.slide-leave-active,
.slide-enter-active {
  transition: 200ms;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
}
</style>
