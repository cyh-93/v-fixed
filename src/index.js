import Fixed from './lib/fixed.js'
import PlaceHolder from './lib/placeholder.js'
import { window, scroll_top } from './lib/global.js'
import Element from './element.js'

console.log(Element)

const vFixed = {
  install(Vue) {
    Vue.directive('fixed', {
      inserted(el, binding, vnode) {
        const style = window.getComputedStyle(el)
        const rect = el.getBoundingClientRect()
        const placeholder = new PlaceHolder(el)
        const fixed = new Fixed(el)
        const is_fixed = scroll_top > rect.top

        // init Fixed
        vnode._fixed = fixed.init()

        // set placeholder style with el width & height
        placeholder.setStyle({ ...style, width: `${rect.width}px`, height: `${rect.height}px` })

        // fixed to show placeholder or hidden it
        is_fixed ? placeholder.show() : placeholder.hidden()

        vnode._fd_placeholder = placeholder
      },
      unbind(el, binding, vnode) {
        debugger
        vnode._fd_placeholder.destroy()
        vnode._fixed.destroy()
      },
    })
  }
}

window.vFixed = vFixed
export default vFixed