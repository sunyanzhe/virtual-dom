import h from './vdom'
import render from './render'

let vnode = h(
  'ul',
  {
    style: {
      width: '100px',
      height: '100px',
      backgroundColor: 'red'
    }
  },
  [
    h('li',{ key: 'li-a' }, 'li-a'),
    h('li',{ key: 'li-b' }, 'li-b'),
    h('li',{ key: 'li-c' }, 'li-c'),
    h('li',{ key: 'li-d', id: 'd' }, 'li-d'),
  ]
)

let nextVNode = h(
  'ul',
  {
    style: {
      width: '100px',
      height: '100px',
      backgroundColor: 'green'
    }
  },
  [
    h('li', { key: 'li-f' }, 'li-f'),
    h('li', { key: 'li-d', id: 'd' }, 'li-d'),
    h('li', { key: 'li-b' }, 'li-b'),
    h('li', { key: 'li-a' }, 'li-a'),
    h('li', { key: 'li-c' }, 'li-c'),
  ]
)

let nextVNode2 = h(
  'ul',
  {
    style: {
      width: '100px',
      backgroundColor: 'yellow'
    }
  },
  [
    h('li', { key: 'li-b' }, 'li-b'),
    h('li', { key: 'li-d', id: 'd' }, 'li-d'),
    h('li', { key: 'li-c' }, 'li-c'),
    h('li', { key: 'li-a' }, 'li-a'),
    h('li', { key: 'li-e' }, 'li-e'),
  ]
)

let nextVNode3 = h(
  'ul',
  {
    style: {
      width: '100px',
      backgroundColor: 'yellow'
    }
  },
  [
    h('li', { key: 'li-d', id: 'd' }, 'li-d'),
    h('li', { key: 'li-a' }, 'li-a'),
    h('li', { key: 'li-f' }, 'li-f'),
  ]
)

function fn() {
  setTimeout(() => {
    render(nextVNode, document.getElementById('app'))
    f = document.querySelector('li')
    fn2()
  }, 1000)
}
function fn2() {
  setTimeout(() => {
    render(nextVNode2, document.getElementById('app'))
    fn3()
  }, 1000)
}
function fn3() {
  setTimeout(() => {
    render(nextVNode3, document.getElementById('app'))
    console.log(d === document.getElementById('d'))
    console.log(firstLi === document.getElementsByTagName('li')[1])
    console.log(f === document.getElementsByTagName('li')[2])
  }, 1000)
}
render(vnode, document.getElementById('app'))

fn()
let d = document.getElementById('d')
let firstLi = document.querySelector('li')
let f = null