import { CHILD_FLAG } from '../vdom/flag.js'
import patchData from '../patch/patchData.js'
import mount from './index.js'

export default function mountElement(vnode, parent, refNode) {
  const { tag, children, data, childFlag } = vnode
  const el = document.createElement(tag)
  vnode.el = el
  if (data) {
    for (let key of Object.keys(data)) {
      patchData(el, key, null, data[key])
    }
  }

  if (childFlag !== CHILD_FLAG.NO_CHILD) {
    if (childFlag & CHILD_FLAG.SINGLE_CHILD) {
      mount(children, el)
    } else if (childFlag & CHILD_FLAG.MULTI_CHILD) {
      for (let child of children) {
        mount(child, el)
      }
    }
  }
  refNode
    ? parent.insertBefore(el, refNode)
    : parent.appendChild(el)
}