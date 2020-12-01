import { VNode, Ref } from 'vue'
import { createLoading } from './createLoading'
type ILoading = {
  vm: VNode;
  $el: HTMLElement;
  visible?: Ref<boolean>;
  close: () => void;
}

const Loading = function (): ILoading {
  const target: Element = document.body
  const instance = createLoading()
  target.appendChild(instance.$el)
  return instance
}

export default Loading
