<template>
    <section class="explorer">
      <div class="content files-and-folders" v-if="fileSystem">
        <section class="folders" v-if="fileSystem.folders">
          <div
            class="file-row"
            v-for="(name, i) in fileSystem.folders.sort()"
            :key="`${name}_${i}`"
          >
            <a @click.prevent="$store.dispatch(`system/cd`, `${path}/${name}`)">
              <span class="icon-wrapper">
                <i class="icon icon-folder"></i>
              </span>
              {{name}}
            </a>
          </div>
        </section>
        <section class="content folders">
          <div
            class="file"
            v-for="(name, i) in fileSystem.files"
            :key="`${name}_${i}`"
            @dblclick="openFile(name)"
          >
            <!-- <i :style="{color: `#${googlePlus.hex}`}" v-html="googlePlus.svg"></i> -->
            {{name}}
          </div>
        </section>
      </div>
      <node-project class="node-project"/>
    </section>
</template>
<script>
import NodeProject from '@/components/Sections/NodeProject';
import { mapState, mapGetters } from 'vuex';
import { shell } from 'electron';
import googlePlus from 'simple-icons/icons/asana';

export default {
  components: {
    NodeProject,
  },
  data: () => ({
    googlePlus,
  }),
  computed: {
    ...mapGetters('system', {
      fileSystem: 'getFileSystem',
      displayPath: 'displayPath',
    }),
    ...mapState('system', {
      path: 'path',
    }),
  },
  methods: {
    openFile(file) {
      shell.openItem(`${this.path}/${file}`);
    },
  },
  watch: {
    path() {
      this.$store.dispatch('system/buildFileTree');
      this.$store.dispatch('git/getRepository');
      this.$store.dispatch('package/getPackage');
    },
  },
  mounted() {
    this.$store.dispatch('system/buildFileTree');
    this.$store.dispatch('git/getRepository');
    this.$store.dispatch('package/getPackage');
  },
};
</script>
<style lang="scss">

.explorer {
  background-color: #F2F2F2;
  max-width: calc(100vw - 70px);
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
}
.folders {
  margin: 20px;
}

.file-row {
  margin: 2px 0;
}
.file {
  cursor: default;
}
.files-and-folders {
  padding-right: 5px;
  overflow: auto;
  flex: 1;
}
svg {
  fill: currentColor;
  stroke: currentColor;
}
</style>
