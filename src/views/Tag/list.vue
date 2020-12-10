<template>
  <div class="tag-list">
    <h2>tagList</h2>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useTagList } from './hooks/list'
export default defineComponent({
  name: 'tag-list',

  setup () {
    const { tagListRef } = useTagList()
    return {
      tagListRef
    }
  }
})
</script>

<style lang="scss" scoped>
.tag-list {
  width: 100%;
  height: 100%;
  background: #f0a;
}
</style>
