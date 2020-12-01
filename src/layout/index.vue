<template>
  <div class="layout-wrapper">
    <transition name="fade-transverse"  mode="out-in">
      <keep-alive :include="keepAlive">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Layout',

  setup () {
    const keepAlive = ref<string[]>(['index'])

    return {
      keepAlive
    }
  }
})
</script>
