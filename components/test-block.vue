<template lang="pug">
  .container
    .text {{ text }}
</template>

<script>
export default {
  name: 'TestBlock',
  props: {
    text: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: aquamarine;
  .text {
    color: white;
  }
}
</style>
