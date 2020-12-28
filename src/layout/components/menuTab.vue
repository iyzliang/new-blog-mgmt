<template>
  <div class="menu">
    <div class="menu-tab">
      <div :class="['menu-item', activeMenuId === item.menuId && 'active-menu']" v-for="item in menuListRef" :key="item.id" @click="changeMenuItem(item)">
        <i :class="item.menuIcon"></i>
      </div>
    </div>
    <div class="avatar"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick } from 'vue'
import router from '@/router'
import store from '@/store'
export interface MenuItem {
  menuId: number;
  menuName: string;
  menuIcon: string;
  menuRoute?: string;
}
const useCreateMenu = () => {
  const menuListRef = ref<Array<MenuItem>>([
    {
      menuId: 0,
      menuName: '数据统计',
      menuIcon: 'yzliang-tongjishangwu',
      menuRoute: 'analytic-home'
    },
    {
      menuId: 1,
      menuName: '标签管理',
      menuIcon: 'yzliang-biaoqian',
      menuRoute: 'tag-list'
    },
    {
      menuId: 2,
      menuName: '图片管理',
      menuIcon: 'yzliang-picture',
      menuRoute: 'image-home'
    },
    {
      menuId: 3,
      menuName: '文章管理',
      menuIcon: 'yzliang-wenzhang',
      menuRoute: 'article-home'
    }
  ])
  const activeMenuId = computed(() => store.state.defaultMenuId)
  onMounted(() => {
    nextTick(() => {
      console.log(activeMenuId.value)
      ;((document.querySelector('.menu-tab')) as HTMLElement).style.setProperty('--active-index', `${activeMenuId.value}`)
    })
  })
  const changeMenuItem = (item: MenuItem) => {
    store.commit('SET_ACTIVE', item.menuId)
    if (item.menuRoute) {
      router.push({ name: item.menuRoute })
    }
    ;((document.querySelector('.menu-tab')) as HTMLElement).style.setProperty('--active-index', `${item.menuId}`)
  }
  return {
    menuListRef,
    activeMenuId,
    changeMenuItem
  }
}
export default defineComponent({
  name: 'menu-tab',
  setup () {
    const { menuListRef, activeMenuId, changeMenuItem } = useCreateMenu()
    return {
      menuListRef,
      activeMenuId,
      changeMenuItem
    }
  }
})
</script>

<style lang="scss" scoped>
.menu {
  width: 100px;
  border-radius: 40px 0 40px 0;
  background-color: #313969;
  padding: 40px 0 200px;
  position: relative;
  .menu-tab {
    --navtab-count: 4;
    --navtab-item-height: 80px;
    --navtab-height: calc(var((--navtab-item-height) + 10px) * var(--navtab-count));
    --navtab-overlay-height: calc(10px * var(--navtab-count) + var(--navtab-item-height));
    height: var(--navtab-height);
    position: relative;
    overflow: hidden;
    .menu-item {
      z-index: 2;
      width: 100px;
      height: var(--navtab-item-height);
      line-height: var(--navtab-item-height);
      text-align: center;
      cursor: pointer;
      transition: all 0.5s ease;
      > i {
        font-size: 20px;
        color: #6773B5;
        transition: all 0.5s ease;
      }
      &.active-menu {
        height: var(--navtab-overlay-height);
        line-height: var(--navtab-overlay-height);
        > i {
          font-size: 30px;
          color: #FFF;
        }
      }
    }
    &::after {
      position: absolute;
      width: 5px;
      height: calc(var(--navtab-overlay-height) - 40px);
      content: "";
      top: 0;
      right: 0;
      background: #4e9ef3;
      border-radius: 5px 0 0 5px;
      transform: translateY(calc(var(--navtab-item-height) * var(--active-index) + 20px));
      transition: 0.5s ease;
    }
  }
  .avatar {
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 30px;
    left: 25px;
    border-radius: 50%;
    overflow: hidden;
    background-image: url('../../assets/images/unnamed.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
