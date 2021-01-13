export default function patchText(prevNode, nextNode) {
  const el = (nextNode.el = prevNode.el)
  if (nextNode.text !== prevNode.text) el.nodeValue = nextNode.text
}