class Cards {
  cards = []
  showed = []
  locked = []
  stats = { flips: 0, start: null, end: null }

  constructor(root, content, callback) {
    this.root = root
    this.callback = callback
    this.element = document.createElement('main')
    this.element.className = 'cards'

    content.map(item => {
      const card = new Card(this.element, item)
      card.element.onclick = () => this.show(card)
      this.cards = [ ...this.cards, card ]
      card.render()
    })
  }

  show(elem) {
    if (elem.position === 1 || this.showed.length === 2) return
    this.stats.flips += 1
    elem.setPosition(1)
    this.showed = [ ...this.showed, elem ]
    if (this.showed.length === 2) {
      if (checkCards(this.showed)) return setTimeout(() => this.lock(), 1000)
      setTimeout(() => this.hide(), 1000)
    } 
  }

  hide() {
    this.showed.map(elem => elem.setPosition(0))
    this.showed = []
  }

  lock() {
    this.showed.map(elem => {
      elem.lock()
      this.locked = [ ...this.locked, elem ]
    })
    this.showed = []
    if (this.locked.length === this.cards.length) {
      this.stats.end = new Date()
      this.callback(this)
    }
  }

  render() {
    this.stats.start = new Date()
    this.root.appendChild(this.element)
  }

  destroy() {
    this.root.removeChild(this.element) 
  }
}

function checkCards([ elem1, elem2 ]) {
  if (elem1.content === elem2.content) return true
  return false
}