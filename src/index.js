import h from './vdom'
import render from './render'

let vnode = h('div', {style: {color: 'red'}}, [
  h('p', {
    style: {
      backgroundColor: 'yellow',
      width: '100px',
      height: '100px',
    }
  }),
  'text'
])

render(vnode, document.getElementById('app'))

setTimeout(() => {
  render(null, document.getElementById('app'))
}, 2000)
console.log(vnode)