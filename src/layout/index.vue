<template>
<div class="container-bg">
  <div class="layout-wrapper">
    <div class="container-wrapper">
      <menu-tab />
      <div class="main-contianer">
        <router-view v-slot="{ Component }">
          <transition name="fade-transverse"  mode="out-in">
            <keep-alive :include="keepAlive">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import menuTab from './components/menuTab.vue'

export default defineComponent({
  name: 'Layout',

  components: {
    menuTab
  },

  setup () {
    const keepAlive = ref<string[]>(['image-home'])
    return {
      keepAlive
    }
  }
})
</script>

<style lang="scss" scoped>
.container-bg {
  width: 100%;
  height: 100vh;
  min-height: 1000px;
  background-image: url('../assets/images/bg.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.layout-wrapper {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
  .container-wrapper {
    width: 90%;
    height: 90%;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba($color: #fff, $alpha: 0.7);
    border-radius: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .main-contianer {
      width: calc(100% - 120px);
      height: 100%;
      .view-container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
      }
    }
  }
}
</style>
