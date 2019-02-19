<template>
  <transition name="slide">
    <div class="wrapper" v-if="showFavorites">
      <div v-for="favorite in favorites" :key="favorite" class='favorite'>
        <a @click.prevent="clickFavorite(favorite)">
          <div class="display-name">{{getDisplayPath(favorite)}}</div>
          <div class="display-url">{{favorite}}</div>
        </a>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
  components: {
  },
  computed: {
    ...mapState('system', [
      'favorites',
    ]),
    ...mapGetters('system', [
      'getDisplayPath',
    ]),
    ...mapState('app', [
      'showFavorites',
    ]),
  },
  methods: {
    clickFavorite(favorite) {
      this.$store.dispatch('system/cd', favorite);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 61px;
  left: 70px;
  background-color: #fcfcfc;
  z-index: 10;
  bottom: 0;
  // padding: 10px;
  border-top: 1px solid #f6f6f6;
  box-shadow: 4px 0 2px -2px rgba(#3A4750, 0.2);
}

.favorite {
  padding: 5px;
  border-bottom: 1px solid #eee;
}
.display-name {
  text-transform: uppercase;
  font-weight: bold;
}
.display-url {
  color: #ccc;
  font-size: 0.8em;
}

.slide-leave-active,
.slide-enter-active {
  transition: 200ms;
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
