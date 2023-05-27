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

function handleGameEnd(elem) {
  setTimeout(() => {
    elem.destroy()
    dialog.show()
  }, 1000)
}