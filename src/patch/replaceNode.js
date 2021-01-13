import mount from "../mount"

export default function replaceNode(prevNode, nextNode, parent) {
  parent.removeChild(prevNode.el)
  mount(nextNode, parent)
}