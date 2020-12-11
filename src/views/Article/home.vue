<template>
  <div class="article-home">
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'article-home',

  setup () {
    const source = ref('# Hello World!')
    return {
      source
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
