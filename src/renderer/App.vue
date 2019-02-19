<template>
  <div id="app" clas="app">
    <app-header/>
    <div class="app-wrapper">
      <tray/>
      <console/>
      <favorites/>
      <explorer/>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Sections/Header';
import Tray from '@/components/Sections/Tray';
import Explorer from '@/components/Sections/Explorer';
import Favorites from '@/components/Sections/Favorites';
import Console from '@/components/Sections/Console';

export default {
  name: 'project-console',
  components: {
    Tray,
    AppHeader,
    Explorer,
    Favorites,
    Console,
  },
};
</script>

<style lang="scss">
@charset "utf-8";

html, body { margin: 0; padding: 0; }
* { box-sizing: border-box; }

.app {
  flex-direction: column;
  display: flex;
  height: 100vh;
  max-width: 100vw;
  overflow: hidden;
}
.app-wrapper {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  height: calc(100vh - 61px);
  overflow: hidden;
}
</style>
