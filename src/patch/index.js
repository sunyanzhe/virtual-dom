import { NODE_FLAG } from '../vdom/flag'
import replaceNode from './replaceNode.js'
import patchElement from './patchElement.js'
import patchText from './patchText.js'

export default function patch(prevNode, nextNode, parent) {
  if (prevNode.flag !== nextNode.flag) {
    replaceNode(prevNode, nextNode, parent)
  } else if (nextNode.flag === NODE_FLAG.ELEMENT) {
    patchElement(prevNode, nextNode, parent)
  } else if (nextNode.flag === NODE_FLAG.TEXT) {
    patchText(prevNode, nextNode)
  }
}