import { ref, h, VNode, createVNode, render } from 'vue'

export function createLoading () {
  const visible = ref<boolean>(true)

  function close () {
    visible.value = false
  }
  const componentSetup = {
    visible,
    close
  }
  const LoadingComponent = {
    name: 'YLoading',
    setup () {
      return componentSetup
    },
    render () {
      const txtArray = 'Loading'.split('')
      const spanArray = txtArray.map((item, index) => {
        return h('span', { style: { animationDelay: `${index / 10}s` } }, item)
      })
      const loadingDom = h('div', { class: 'loading-container' }, spanArray)
      return h('div', { class: 'yzl__loading', style: { display: visible.value ? 'inherit' : 'none' } }, loadingDom)
    }
  }
  const vm: VNode = createVNode(LoadingComponent)

  render(vm, document.createElement('div'))
  return {
    ...componentSetup,
    vm,
    get $el () {
      return vm.el as HTMLElement
    }
  }
}
