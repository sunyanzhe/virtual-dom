import mount from "../mount";
import patch from "../patch";

export default function vue2diff(prevChildren, nextChildren, parent) {
  let prevStartIndex = 0,
    nextStartIndex = 0,
    prevEndIndex = prevChildren.length - 1,
    nextEndIndex = nextChildren.length - 1,
    prevStartNode = prevChildren[prevStartIndex],
    prevEndNode = prevChildren[prevEndIndex],
    nextStartNode = nextChildren[nextStartIndex],
    nextEndNode = nextChildren[nextEndIndex];
  while (prevStartIndex <= prevEndIndex && nextStartIndex <= nextEndIndex) {
    if (prevStartNode === undefined) {
      prevStartNode = prevChildren[++prevStartIndex]
    } else if (prevEndNode === undefined) {
      prevEndNode = prevChildren[--prevEndIndex]
    } else if (prevStartNode.key === nextStartNode.key) {
      patch(prevStartNode, nextStartNode, parent)

      prevStartIndex++
      nextStartIndex++
      prevStartNode = prevChildren[prevStartIndex]
      nextStartNode = nextChildren[nextStartIndex]
    } else if (prevEndNode.key === nextEndNode.key) {
      patch(prevEndNode, nextEndNode, parent)

      prevEndIndex--
      nextEndIndex--
      prevEndNode = prevChildren[prevEndIndex]
      nextEndNode = nextChildren[nextEndIndex]
    } else if (prevStartNode.key === nextEndNode.key) {
      patch(prevStartNode, nextEndNode, parent)
      parent.insertBefore(prevStartNode.el, prevEndNode.el.nextSibling)
      prevStartIndex++
      nextEndIndex--
      prevStartNode = prevChildren[prevStartIndex]
      nextEndNode = nextChildren[nextEndIndex]
    } else if (prevEndNode.key === nextStartNode.key) {
      patch(prevEndNode, nextStartNode, parent)
      parent.insertBefore(prevEndNode.el, prevStartNode.el)
      prevEndIndex--
      nextStartIndex++
      prevEndNode = prevChildren[prevEndIndex]
      nextStartNode = nextChildren[nextStartIndex]
    } else {
      let nextKey = nextStartNode.key,
        prevIndex = prevChildren.findIndex(child => child && (child.key === nextKey));
      if (prevIndex === -1) {
        mount(nextStartNode, parent, prevStartNode.el)
      } else {
        let prevNode = prevChildren[prevIndex]
        patch(prevNode, nextStartNode, parent)
        parent.insertBefore(prevNode.el, prevStartNode.el)
        prevChildren[prevIndex] = undefined
      }
      nextStartIndex++
      nextStartNode = nextChildren[nextStartIndex]
    }
  }
  if (nextStartIndex > nextEndIndex) {
    while (prevStartIndex <= prevEndIndex) {
      if (!prevChildren[prevStartIndex]) {
        prevStartIndex++
        continue
      }
      parent.removeChild(prevChildren[prevStartIndex++].el)
    }
  } else if (prevStartIndex > prevEndIndex) {
    while (nextStartIndex <= nextEndIndex) {
      mount(nextChildren[nextStartIndex++], parent, prevStartNode.el)
    }
  }
}