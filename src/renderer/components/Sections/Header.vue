<template>
  <div class="header">
     <at-button
      @click="$store.dispatch(`system/back`)"
      icon="icon-corner-left-up"
      circle
    />
    <breadcrumbs/>
     <at-button
      @click="$store.dispatch(`system/favorite`)"
      :icon="!isFavorite ? 'icon-star' : 'icon-star-on'"
      circle
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import Breadcrumbs from '@/components/Sections/Breadcrumbs';

export default {
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapGetters('system', {
      path: 'displayPath',
      isFavorite: 'isFavorite',
    }),
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  padding: 10px;
  box-shadow: 0 4px 2px -2px rgba(#3A4750, 0.1);
  z-index: 1;
  justify-content: space-between;
}
</style>
