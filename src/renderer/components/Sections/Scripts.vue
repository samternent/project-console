<template>
  <div v-if="scripts">
    <section
      class="container"
      v-for="script in scripts"
      :key="script"
    >
      <npm-script :name="script"/>
      <br/>
      <br/>
    </section>
  </div>
</template>
<script>
import NpmScript from '@/components/Sections/NpmScript';

export default {
  components: {
    NpmScript,
  },
  props: [
    'scripts',
  ],
};
</script>
<style lang="scss" scoped>
.content {
  background-color: #fff;
}
.node-project {
  padding: 10px;
  overflow: auto;
  height: 100%;
  flex: 1;
  box-shadow: -4px 0 2px -2px rgba(#3A4750, 0.3);
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
.script__title {
  font-weight: bold;
}
</style>
