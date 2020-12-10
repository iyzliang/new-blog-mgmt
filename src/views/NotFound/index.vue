<template>
  <div class="not-found">
    <img src="./images/af7c318c1d765be354561f1dc02d18be.png" class="n-f-img">
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'not-found'
})
</script>

<style lang="scss" scoped>
.not-found {
  width: 100%;
  height: 100vh;
  position: relative;
  .n-f-img {
    width: 60%;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
