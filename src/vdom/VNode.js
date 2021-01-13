import { NODE_FLAG, CHILD_FLAG } from './flag.js'

class VNode {
  constructor(
    tag,
    data,
    children,
    text
  ) {
    this.tag = tag
    this.data = data
    this.el = null
    this.children = children
    this.text = text
    this.flag = tag === undefined ? NODE_FLAG.TEXT : NODE_FLAG.ELEMENT
    this._isVNode = true

    if (Array.isArray(children)) {

      if (children.length === 0) {
        this.childFlag = CHILD_FLAG.NO_CHILD
      } else if (children.length === 1) {
        this.childFlag = CHILD_FLAG.SINGLE_CHILD
        this.children = children[0]
      } else {
        this.childFlag = CHILD_FLAG.KEY_CHILD
        this.children = normalizeVNodes(children)
      }

    } else if (children == null) {

      this.childFlag = CHILD_FLAG.NO_CHILD

    } else if (children._isVNode) {

      this.childFlag = CHILD_FLAG.SINGLE_CHILD
      this.children = children

    } else {
      // 全部视为文本
      this.childFlag = CHILD_FLAG.SINGLE_CHILD
      this.children = createTextVNode(children)

    }
  }
}
function createTextVNode(text) {
  return new VNode(undefined, undefined, undefined, text + '')
}

function normalizeVNodes(children) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    if (!child._isVNode) child = children[i] = createTextVNode(child)
    if (child.key == null) child.key = '|' + i
  }
  return children
}

function h(tag, data, children) {
  if (Array.isArray(data)) {
    children = data
    data = null
  }
  return new VNode(tag, data, children)
}

export default h