import mount from "../mount";
import patch from "../patch";

export default function vue3diff(prevChildren, nextChildren, parent) {
  let j = 0,
    prevEnd = prevChildren.length - 1,
    nextEnd = nextChildren.length - 1,
    prevNode = prevChildren[j],
    nextNode = nextChildren[j];
  outer: {
    while (prevNode.key === nextNode.key) {
      patch(prevNode, nextNode, parent)
      j++
      if (j > prevEnd || j > nextEnd) break outer
      prevNode = prevChildren[j]
      nextNode = nextChildren[j]
    }

    prevNode = prevChildren[prevEnd]
    nextNode = nextChildren[nextEnd]

    while (prevNode.key === nextNode.key) {
      patch(prevNode, nextNode, parent)
      prevEnd--
      nextEnd--
      if (j > prevEnd || j > nextEnd) break outer
      prevNode = prevChildren[prevEnd]
      nextNode = nextChildren[nextEnd]
    }
  }

  if (j > prevEnd && j <= nextEnd) {
    let nextPos = nextEnd + 1,
      refNode = nextPos >= nextChildren.length
        ? null
        : nextChildren[nextPos].el
    while (j <= nextEd) {
      mount(nextChildren[j++], parent, refNode)
    }
    return
  } else if (j > nextEnd) {
    while (j <= prevEnd) {
      parent.removeChild(prevChildren[j++].el)
    }
    return
  }

  let nextStart = j,
    prevStart = j,
    nextLeft = nextEnd - j + 1,
    nextIndexMap = {},
    source = new Array(nextLeft).fill(-1),
    patched = 0,
    lastIndex = 0,
    move = false;

  for (let i = nextStart; i <= nextEnd; i++) {
    let key = nextChildren[i].key
    nextIndexMap[key] = i
  }

  for (let i = prevStart; i <= prevEnd; i++) {
    let prevChild = prevChildren[i],
      prevKey = prevChild.key,
      nextIndex = nextIndexMap[prevKey];

    if (patched >= nextLeft || nextIndex === undefined) {
      parent.removeChild(prevChild.el)
      continue
    }
    patched++
    let nextChild = nextChildren[nextIndex]
    patch(prevChild, nextChild, parent)

    source[nextIndex - nextStart] = i

    if (nextIndex < lastIndex) {
      move = true
    } else {
      lastIndex = nextIndex
    }
  }


  if (move) {
    const seq = lis(source);
    let j = seq.length - 1;
    for (let i = nextLeft - 1; i >= 0; i--) {
      let pos = nextStart + i,
        nextPos = pos + 1,
        nextChild = nextChildren[pos],
        refNode = nextChildren[nextPos]?.el
      if (source[i] === -1) {

        mount(nextChild, parent, refNode)
      } else if (i !== seq[j]) {
        parent.insertBefore(nextChild.el, refNode)
      } else {
        j--
      }
    }
  } else {
    for (let i = nextLeft - 1; i >= 0; i--) {
      if (source[i] === -1) {
        let pos = nextStart + i,
          nextPos = pos + 1,
          nextChild = nextChildren[pos],
          refNode = nextChildren[nextPos]?.el;
      
        mount(nextChild, parent, refNode)
      }
    }
  }
}

function lis(arr) {
  let len = arr.length,
    result = [],
    dp = new Array(len).fill(1);
  for (let i = 0; i < len; i++) {
    result.push([i])
  }

  for (let i = len - 1; i >= 0; i--) {
    let cur = arr[i],
      nextIndex = undefined;
    if (cur === -1) continue
    for (let j = i + 1; j < len; j++) {
      let next = arr[j]
      if (cur < next) {
        let max = dp[j] + 1
        if (max > dp[i]) {
          nextIndex = j
          dp[i] = max
        }
      }
    }
    if (nextIndex !== undefined) result[i] = [...result[i], ...result[nextIndex]]
  }
  let index = dp.reduce((prev, cur, i, arr) => cur > arr[prev] ? i : prev, dp.length - 1)
  return result[index]
}