<template>
  <div class="tray">
    <div class="item" @click="$store.dispatch('app/toggleFavorites')">
      <i class="icon icon-star"/>
    </div>
    <div class="item" @click="$store.dispatch('app/toggleConsole')">
      <at-badge :value="Object.keys(messages).length" :show="!!Object.keys(messages).length">
        <i class="icon icon-monitor"/>
      </at-badge>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  components: {
  },
  computed: {
    ...mapState('package', [
      'messages',
    ]),
  },
};
</script>
<style lang="scss" scoped>
  .tray {
    width: 70px;
    background-color: #3A4750;
    color: #fefefe;
    font-size: 1.5em;
    padding: 10px;
    text-align: center;
    z-index: 20;
    box-shadow: 4px 0 2px -2px rgba(#3A4750, 0.3);
  }
  .item {
    margin: 20px 0;
    cursor: pointer;

    &:hover {
      .icon {
        opacity: 0.8;
      }
    }
  }
</style>
