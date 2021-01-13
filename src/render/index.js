import mount from '../mount/index.js'
import patch from '../patch/index.js'

function render(vnode, parent) {
  let prevNode = parent._vnode
  if (!prevNode) {
    mount(vnode, parent)
    parent._vnode = vnode
  } else {
    if (vnode) {
      patch(prevNode, vnode, parent)
      parent._vnode = vnode
    } else {
      parent.removeChild(prevNode.el)
    }
  }
}

export default render