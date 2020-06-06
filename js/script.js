const X_CLASS = 'x'
const y_CLASS = 'y'
const ALGO_WIN = [
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [6, 7, 8, 9],
  [10, 11, 12, 13],
  [11, 12, 13, 14],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [20, 21, 22, 23],
  [21, 22, 23, 24],

  [0, 5, 10, 15],
  [5, 10, 15, 20],
  [1, 6, 11, 16],
  [6, 11, 16, 21],
  [2, 7, 12, 17],
  [7, 12, 17, 22],
  [3 , 8, 13, 18],
  [8, 13, 18, 23],
  [4, 9, 14, 19],
  [9, 14, 19, 24],

  [3, 7, 11, 15],
  [4, 8, 12, 16],
  [8, 12, 16, 20],
  [9, 13, 17, 21],

  [1, 7, 13, 19],
  [0, 6, 12, 18],
  [6, 12, 18, 24],
  [5, 11, 17, 23],
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let yTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  yTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(y_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = yTurn ? y_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${yTurn ? "Corona" : "Manusia"} Menang!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(y_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  yTurn = !yTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(y_CLASS)
  if (yTurn) {
    board.classList.add(y_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return ALGO_WIN.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}