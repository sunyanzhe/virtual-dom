import { NODE_FLAG } from '../vdom/flag'
import mountElement from './mountElement.js'
import mountText from './mountText.js'

export default function mount(vnode, parent) {
  const {flag} = vnode
  if (flag & NODE_FLAG.ELEMENT) {
    mountElement(vnode, parent)
  } else if (flag & NODE_FLAG.TEXT) {
    mountText(vnode, parent)
  }
}