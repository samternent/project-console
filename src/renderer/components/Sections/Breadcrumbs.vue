<template>
  <at-breadcrumb separator=">">
    <at-breadcrumb-item
      v-for="(name, i) in path.split('/').splice(1)"
      :key="`${name}_${i}`"
    >
      <span @click.prevent="$store.dispatch(`system/cd`, `${path.split('/').slice(0, i + 2).join('/')}`)">
        {{name}} <git v-if="displayPath === name"/>
      </span>
    </at-breadcrumb-item>
  </at-breadcrumb>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import Git from '@/components/Sections/Git';

export default {
  computed: {
    ...mapState('system', {
      path: 'path',
      displayPath: 'displayPath',
    }),
    ...mapGetters('system', {
      displayPath: 'displayPath',
    }),
  },
  components: {
    Git,
  },
};
</script>
<style lang="scss" scoped>

.at-breadcrumb {
  overflow: hidden;
  white-space: nowrap;
  padding: 10px;
  flex: 1;
}
.at-breadcrumb__item {
  cursor: pointer;
}
</style>
