const items = [ '🍑', '🍎', '🍇', '🍉', '🍌', '🫐', '🥝', '🥥', '🥕' ]
const dialog = document.querySelector('dialog')

dialog.onsubmit = (event) => {
  const formData = new FormData(document.querySelector('form'))
  const content = generateContent(formData.get('pairs'))

  if (!content) return event.preventDefault()
  const cards = new Cards(document.body, content, handleGameEnd)
  cards.render()
}

const rand = (min, max) => min + Math.round(Math.random() * max)

function generateContent(pairs) {
  if (pairs > items.length || pairs < 4) return false

  let baseList = []

  while (baseList.length < pairs) {
    const randItem = items[rand(0, items.length - 1)]
    if (!baseList.includes(randItem)) baseList = [ ...baseList, randItem ]
  }

  const doubledList = [ ...baseList, ...baseList ]
  let shuffledList = []

  while (shuffledList.length < pairs * 2) {
    const randIndex = rand(0, doubledList.length - 1)
    shuffledList = [ ...shuffledList, doubledList[randIndex] ]
    doubledList.splice(randIndex, 1)
  }

  return shuffledList
}

function createStats({ flips, start, end }) {
  const stats = document.createElement('details')
  stats.className = 'stats'

  const summary = document.createElement('summary')
  summary.textContent = 'Statistics'

  const statList = document.createElement('ul')

  const tags = [ [ 'Game started at', start.toLocaleTimeString() ], [ 'Game ended at', end.toLocaleTimeString() ], [ 'Cards flipped', flips ] ]
  tags.map(([ label, stat ]) => {
    const tag = document.createElement('li')
    tag.innerHTML = `${label}: <b>${stat}</b>`
    statList.appendChild(tag)
  })

  stats.append(summary, statList)
  return stats
}

function handleGameEnd(elem) {
  if (document.querySelector('details')) document.querySelector('form').removeChild(document.querySelector('details'))
  document.querySelector('form').insertBefore(createStats(elem.stats), document.querySelector('#btn'))
  setTimeout(() => {
    elem.destroy()
    dialog.show()
  }, 1000)
}