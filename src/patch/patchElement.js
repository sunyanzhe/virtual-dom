import patchChildren from "./patchChildren";
import patchData from "./patchData";
import replaceNode from "./replaceNode";

export default function patchElement(prevNode, nextNode, parent) {
  if (prevNode.tag !== nextNode.tag) {
    replaceNode(prevNode, nextNode, parent)
    return
  }
  const el = (nextNode.el = prevNode.el)
  let prevData = prevNode.data,
    nextData = nextNode.data;
  if (nextData) {
    for (let key of Object.keys(nextData)) {
      let prevValue = prevData[key],
        nextValue = nextData[key]
      patchData(el, key, prevValue, nextValue)
    }
  }

  if (prevData) {
    for (let key of Object.keys(prevData)) {
      if (!nextData.hasOwnProperty(key)) patchData(el, key, prevData[key], null)
    }
  }

  let prevChildren = prevNode.children,
    nextChildren = nextNode.children,
    prevChildFlag = prevNode.childFlag,
    nextChildFlag = nextNode.childFlag;

  patchChildren(
    prevChildren,
    prevChildFlag,
    nextChildren,
    nextChildFlag,
    el
  )
}