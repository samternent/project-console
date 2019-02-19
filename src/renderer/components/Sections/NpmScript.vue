<template>
  <at-button-group>
      <at-button
        hollow
        type="success"
        :disabled="isActive"
        @click="runScript"
        icon="icon-play-circle"
      >npm run {{name}}</at-button>
      <at-button
        :disabled="!isActive"
        type="error"
        icon="icon-stop-circle"
        @click="stopScript"
      >stop</at-button>
  </at-button-group>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  props: [
    'name', 'script',
  ],
  data: () => ({
    proc: null,
  }),
  computed: {
    ...mapState('system', {
      path: 'path',
    }),
    ...mapGetters('package', {
      isProcessActive: 'isProcessActive',
    }),
    processId() {
      return `${this.path}_:::_${this.name}`;
    },
    isActive() {
      return this.isProcessActive(this.processId);
    },
  },
  methods: {
    runScript() {
      this.$store.dispatch('package/npmRun', {
        id: this.processId,
        script: this.name,
        cwd: this.$store.state.system.path,
      });
    },

    stopScript() {
      this.$store.dispatch('package/killProcess', this.processId);
    },
  },
};
</script>

<style lang="scss" scoped>
.script {
  background-color: #1d1d1d;
  padding: 5px;
  margin: 10px 0;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.button {
  &.is-active {
    .icon {
      color: red;
    }
  }
}
</style>
