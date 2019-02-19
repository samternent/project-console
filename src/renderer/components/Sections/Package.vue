<template>
  <div clas="content">
    <tree-view
      :data="packageJson"
      :options="{
        maxDepth: 3,
        rootObjectKey: 'package.json',
      }"
    />
  </div>
</template>
<script>
export default {
  props: [
    'packageJson',
  ],
  data: () => ({
    displayKeys: [
      'name',
      'description',
      'version',
      'author',
    ],
  }),
};
</script>
<style lang="scss" scoped>

</style>
