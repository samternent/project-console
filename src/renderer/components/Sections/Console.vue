<template>
  <transition name="slide">
    <div class="console" v-if="showConsole">
      <at-tabs type="card" size="small" closable @on-tab-remove="removeHandle">
        <at-tab-pane
          v-for="key in Object.keys(messages)"
          :key="key"
          :label="displayName(key)"
          :name="key"
        >
          <p v-for="message in messages[key]" :key="message.time">
            {{message.time}}: <span v-html="formatMessage(message.message)"/>
          </p>
        </at-tab-pane>
      </at-tabs>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex';
import Convert from 'ansi-to-html';
const convert = new Convert();

export default {
  components: {
  },
  computed: {
    ...mapState('package', [
      'messages',
    ]),
    ...mapState('app', [
      'showConsole',
    ]),
  },
  methods: {
    removeHandle({ name }) {
      this.$store.commit('package/removeMessage', name);
    },
    formatMessage(message) {
      return convert.toHtml(message);
    },
    displayName(key) {
      return key.split('/').pop().replace('_:::_', ' | ');
    },
  },
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:200,300,400,700,900');

.console {
  font-family: 'Source Code Pro', monospace;

  position: fixed;
  top: 61px;
  left: 70px;
  background-color: #333;
  z-index: 10;
  bottom: 0;
  right: 30px;
  padding: 10px;
  border-top: 1px solid #f6f6f6;
  box-shadow: 4px 0 2px -2px rgba(#3A4750, 0.2);

  overflow: auto;

  p { color: #fff; }
}

.at-tabs__body {
  // overflow-x: hidden;
  // height: 84vh;
  // padding-bottom: 10px;
}

.at-tabs--card .at-tabs-nav__item {
  background-color: #3A4750;
  color: #fff;
}
.at-tabs--card .at-tabs-nav__item--active {
  background-color: #333;
  color: #fff;
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
