import mount from "../mount";
import patch from "../patch";

export default function reactdiff(prevChildren, nextChildren, parent) {
  let prevIndexMap = {},
    nextIndexMap = {};
  for (let i = 0; i < prevChildren.length; i++) {
    let { key } = prevChildren[i]
    prevIndexMap[key] = i
  }
  let lastIndex = 0;
  for (let i = 0; i < nextChildren.length; i++) {
    let nextChild = nextChildren[i],
      nextKey = nextChild.key,
      j = prevIndexMap[nextKey];

    nextIndexMap[nextKey] = i
    
    if (j === undefined) {
      let refNode = i === 0
                    ? prevChildren[0].el
                    : nextChildren[i - 1].el.nextSibling;
      mount(nextChild, parent, refNode)
    } else {
      patch(prevChildren[j], nextChild, parent)
      if (j < lastIndex) {
        let refNode = nextChildren[i - 1].el.nextSibling;
        parent.insertBefore(nextChild.el, refNode)
      } else {
        lastIndex = j
      }
    }
  }

  for (let i = 0; i < prevChildren.length; i++) {
    let { key } = prevChildren[i]
    if (!nextIndexMap.hasOwnProperty(key)) parent.removeChild(prevChildren[i].el)
  }
}