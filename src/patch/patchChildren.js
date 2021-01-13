import patch from "."
import diff from "../diff"
import mount from "../mount"
import { CHILD_FLAG } from "../vdom/flag"

export default function patchChildren(
  prevChildren,
  prevChildFlag,
  nextChildren,
  nextChildFlag,
  parent
) {
  switch (prevChildFlag) {
    // 旧的 children 是单个子节点，会执行该 case 语句块
    case CHILD_FLAG.SINGLE_CHILD:
      switch (nextChildFlag) {
        case CHILD_FLAG.SINGLE_CHILD:
          // 新的 children 也是单个子节点时，会执行该 case 语句块
          patch(prevChildren, nextChildren, parent)

          break
        case CHILD_FLAG.NO_CHILD:
          // 新的 children 中没有子节点时，会执行该 case 语句块
          parent.removeChild(prevChildren.el)

          break
        default:
          // 新的 children 中有多个子节点时，会执行该 case 语句块
          parent.removeChild(prevChildren.el)
          for (let child of nextChildren) {
            mount(child, parent)
          }

          break
      }
      break
    // 旧的 children 中没有子节点时，会执行该 case 语句块
    case CHILD_FLAG.NO_CHILD:
      switch (nextChildFlag) {
        case CHILD_FLAG.SINGLE_CHILD:
          // 新的 children 是单个子节点时，会执行该 case 语句块
          mount(nextChildren, parent)

          break
        case CHILD_FLAG.NO_CHILD:
          // 新的 children 中没有子节点时，会执行该 case 语句块
          break
        default:
          // 新的 children 中有多个子节点时，会执行该 case 语句块
          for (const child of nextChildren) {
            mount(child, parent)
          }

          break
      }
      break
    // 旧的 children 中有多个子节点时，会执行该 case 语句块
    default:
      switch (nextChildFlag) {
        case CHILD_FLAG.SINGLE_CHILD:
          // 新的 children 是单个子节点时，会执行该 case 语句块
          for (const child of prevChildren) {
            parent.removeChild(child.el)
          }
          mount(nextChildren, parent)

          break
        case CHILD_FLAG.NO_CHILD:
          // 新的 children 中没有子节点时，会执行该 case 语句块
          for (const child of prevChildren) {
            parent.removeChild(child.el)
          }

          break
        default:
          // 新的 children 中有多个子节点时，会执行该 case 语句块
          // 关键的diff算法
          const method = process.env.METHOD
          diff[method](prevChildren, nextChildren, parent)
          break
      }
      break
  }
} 