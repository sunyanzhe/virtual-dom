export default function mountText(vnode, parent) {
  const el = document.createTextNode(vnode.text)
  vnode.el = el
  parent.appendChild(el)
}