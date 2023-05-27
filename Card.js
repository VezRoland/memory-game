class Card {
  position = 0
  state = 0

  constructor(root, content) {
    this.root = root
    this.content = content

    this.element = document.createElement('div')
    this.element.className = 'card'
    this.element.setAttribute('position', '0')
    this.element.setAttribute('state', '0')

    const inside = document.createElement('div')
    inside.className = 'card__inside'

    const front = document.createElement('div')
    front.className = 'card__face card__front'

    this.back = document.createElement('div')
    this.back.className = 'card__face card__back'

    inside.append(front, this.back)
    this.element.appendChild(inside)
  }

  setPosition(pos) {
    setTimeout(() => this.back.textContent = pos > 0 ? this.content : '', 300)
    this.position = pos
    this.element.setAttribute('position', pos)
  }

  lock() {
    this.state = 1
    this.element.setAttribute('state', this.state)
  }

  render() {
    this.root.appendChild(this.element)
  }
}