import throttle from 'lodash/throttle'

let onScroll, elements
const delta = 75
const latency = 50

const Sticky = {
  init () {
    elements = document.querySelectorAll('.tobeFixed')
    onScroll = throttle(() => { Sticky.handleScroll() }, latency)
    window.addEventListener('scroll', onScroll, false)
  },
  
  destroy () {
    window.removeEventListener('scroll', onScroll, false)
  },
  
  handleScroll () {
    if (elements.length) {
      elements.forEach(el => {
        const elRect = el.getBoundingClientRect()
        
        if (elRect.top <= window.scrollY + delta) {
          el.classList.add('fixed')
          el.style.width = elRect.width + 'px'
        } else {
          el.classList.remove('fixed')
        }
      })
    }
  }
}

export default Sticky
