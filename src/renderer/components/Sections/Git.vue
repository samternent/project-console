<template>
  <span class="git" v-if="isGitRepository" @click="openInBrowser">
    <i class="icon icon-github"/> {{branch}}
  </span>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import { shell } from 'electron';

export default {
  computed: {
    ...mapState('git', [
      'branch',
      'browser',
    ]),
    ...mapGetters('git', {
      isGitRepository: 'isGitRepository',
    }),
  },
  methods: {
    openInBrowser() {
      shell.openExternal(`${this.browser}/tree/${this.branch}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.git {
  margin-left: 10px;
  .icon {
    margin-right: 5px;
  }
  background-color: #333;
  color: #fff;
  padding: 3px 6px;
  border-radius: 4px;
}

</style>
