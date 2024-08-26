import { type Directive, type DirectiveBinding } from 'vue'

interface ResizeBinding extends DirectiveBinding {
  value: { footerHeight?: number; paginationHeight?: number }
}

const resizeTable = (el: HTMLElement, binding: ResizeBinding) => {
  const { value } = binding
  const footerHeight = value?.footerHeight ?? 60
  const paginationHeight = value?.paginationHeight ?? 52
  const top = el.getBoundingClientRect().top
  const pageHeight = window.innerHeight
  el.style.height = `${pageHeight - top - footerHeight - paginationHeight - 20}px`
}

const tableAdaptive: Directive = {
  mounted(el, binding) {
    const resizeListener = () => resizeTable(el, binding)
    el.resizeListener = resizeListener
    resizeListener() // Initialize resize
    window.addEventListener('resize', resizeListener)
  },
  unmounted(el) {
    window.removeEventListener('resize', el.resizeListener)
    delete el.resizeListener
  }
}

export default tableAdaptive
