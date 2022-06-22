const img = {
  rabbit: { name: "rabbit", src: "./img/rabbit.png", id: 1 },
  wolf: { name: "wolf", src: "./img/gamewolf.png", id: 2 },
  ban: { name: "ban", src: "./img/ban.png", id: 3 },
  house: { name: "house", src: "./img/home.png", id: 4 },
}
const rabbit = img.rabbit.name
const house = img.house.name
const wolf = img.wolf.name
const ban = img.ban.name
const game_over = "game_over"
const you_win = "you_win"
const freebox = "0"
let boardNum = 0
const intervalObj = {}



function tamplate(gameNum) {
  return `<div class="start" id = "${"startButton" + gameNum}">
  <button class="startbutton" id="${"startbutton" + gameNum}">START</button>
  <select name="" id="${"select" + gameNum}" class="select">
    <option value="5">5 x 5</option>
    <option value="7">7 x 7</option>
    <option value="10">10 x 10</option>
  </select>
</div>
<div id="${"over" + gameNum}">
  <img
    src="./img/game-over-escape-rooms.jpg"
    alt="game over"
    class="game_over"
    id="${"game_over" + gameNum}"/>
</div>
<div id="${"win" + gameNum}"> 
  <img
    src="./img/you-win-sign-pop-art-style_175838-498.jpeg"
    alt="you win"
    class="you_win"
    id="${"you_win" + gameNum}"/>
</div>
<div id="${"game_zone" + gameNum}"  class="game_zone"></div>
<div class="up">
  <button id="${"up" + gameNum}" class ="up" >UP</button>
</div>
<div class="leftRight">
  <button id="${"left" + gameNum}" class ="left">Left</button>
  <button id="${"right" + gameNum}" class ="right">Right</button>
</div>
<div class="down"><button id="${
    "down" + gameNum
  }" class="down">Down</button></div>`
}

function newBoard() {
  const wrapper = document.querySelector(".wrapper")
  const tamp = tamplate(boardNum)
  const newDiv = document.createElement("div")
  newDiv.id = "newDiv" + boardNum
  newDiv.setAttribute("class", "newDiv")
  newDiv.innerHTML = tamp
  wrapper.append(newDiv)
}

function eventListener(num) {
  const startX = document.getElementById("startbutton" + num)
  startX.addEventListener("click", () => start(num))
}

function creatBoard() {
  boardNum++
  newBoard()
  eventListener(boardNum)
}

document.getElementById("createNewBoard").addEventListener("click", creatBoard)

function getArray(boardSize) {
  return new Array(boardSize).fill(freebox).map(() => new Array(boardSize).fill(freebox))
}

function freeCoordinates(matrix) {
  const x = Math.floor(Math.random() * matrix.length)
  const y = Math.floor(Math.random() * matrix.length)
  if (matrix[x][y] === freebox) {
    return [x, y]
  } else {
    return freeCoordinates(matrix)
  }
}

function setMember(gameMember, gameState) {
  const matrix = gameState.gameZone
  const [x, y] = freeCoordinates(matrix)
  matrix[x][y] = gameMember
}

function memberCount(count, gameState, gameMember) {
  for (let i = 0; i < count; i++) {
    setMember(gameMember, gameState)
  }
}

function getMemberPosition(matrix, gameMember) {
  const findeposs = function (accum, row, x) {
    row.forEach((item, y) => {
      if (item === gameMember) {
        accum.push([x, y])
      }
    })
    return accum
  }
  return matrix.reduce(findeposs, [])
}

function atacRabbit(gameState, emptyCellsArr) {
  const matrix = gameState.gameZone
  const massiv = []
  emptyCellsArr.forEach((cell) => {
    const [x, y] = cell
    if (matrix[x][y] === rabbit) {
      gameState.gameResult = game_over
      gameOverAndShowMessage(gameState)
    }
    if (matrix[x][y] === freebox) {
      massiv.push([x, y])
    }
  })
  return massiv
}

function gameOverAndShowMessage(gameState) {
  showElementById(gameState.gameResult + gameState.boardNum)
  hideBoard(gameState)
  gameState.isGameover = true
}

function rabbitMove(gameState, rabbit, x, y) {
  const matrix = gameState.gameZone
  const [i, j] = getMemberPosition(matrix, rabbit)[0]
  if (gameState.isGameover === false) {
    if (matrix[x][y] === freebox) {
      matrix[x][y] = rabbit
      matrix[i][j] = freebox
    } else if (matrix[x][y] === wolf) {
      gameState.gameResult = game_over
      gameOverAndShowMessage(gameState)
    } else if (matrix[x][y] === ban) {
      return
    } else if (matrix[x][y] === house) {
      gameState.gameResult = you_win
      gameOverAndShowMessage(gameState)
      return
    }
  }
}
function checkDoesKeyPressed(gameState, rabbit) {
  const matrix = gameState.gameZone
  const left = document.getElementById("left" + gameState.boardNum)
  const up = document.getElementById("up" + gameState.boardNum)
  const right = document.getElementById("right" + gameState.boardNum)
  const down = document.getElementById("down" + gameState.boardNum)

  function gameOneStep(x, y) {
    rabbitMove(gameState, rabbit, x, y)
    // freePossitionsAroundWolves(gameState, wolf)
    clearGameZone(gameState)
    createGameBoard(gameState)
  }

  left.onclick = () => {
    const [x, y] = getMemberPosition(matrix, rabbit)[0]
    let newX = x
    let newY = y
    newY = y - 1
    if (y === 0) {
      newY = matrix.length - 1
    }
    gameOneStep(newX, newY)
  }
  up.onclick = () => {
    const [x, y] = getMemberPosition(matrix, rabbit)[0]
    let newX = x
    let newY = y
    newX = x - 1
    if (x === 0) {
      newX = matrix.length - 1
    }
    gameOneStep(newX, newY)
  }
  right.onclick = () => {
    const [x, y] = getMemberPosition(matrix, rabbit)[0]
    let newX = x
    let newY = y
    newY = y + 1
    if (y === matrix.length - 1) {
      newY = 0
    }
    gameOneStep(newX, newY)
  }
  down.onclick = () => {
    const [x, y] = getMemberPosition(matrix, rabbit)[0]
    let newX = x
    let newY = y
    newX = x + 1
    if (x === matrix.length - 1) {
      newX = 0
    }
    gameOneStep(newX, newY)
  }
}

function getCordinat(matrix, [x, y]) {
  const cells = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]
  return cells.filter((cell) => isInRange(matrix, cell))
}
function isInRange(matrix, [x, y]) {
  return x >= 0 && x < matrix.length && y >= 0 && y < matrix.length
}

function freePossitionsAroundWolves(gameState, member) {
  const matrix = gameState.gameZone
  const wolvesCorrentPossition = getMemberPosition(matrix, member)
  wolvesCorrentPossition.forEach((wolf) => {
    if (gameState.isGameover === true) {
      return
    } else {
      const cells = getCordinat(matrix, wolf)
      const wolfNextStep = atacRabbit(gameState, cells)
      const distanceArray = getClosestCell(wolfNextStep, matrix)
      const closestCell = getMinDistance(distanceArray, wolfNextStep)
      moveSingleWolfToNewPosition(closestCell, wolf, gameState)
    }
  })
}
function getClosestCell(freeBoxes, matrix) {
  const rabbitCords = getMemberPosition(matrix, rabbit)
  const distaceArray = []
  freeBoxes.forEach((cord) => {
    const distanceSingle = distance(cord, rabbitCords[0])
    distaceArray.push(distanceSingle)
  })
  return distaceArray
}
function getMinDistance(distaceArray, freeBoxes) {
  const min = Math.min(...distaceArray)
  const index = distaceArray.indexOf(min)
  return freeBoxes[index]
}
function distance(wolf, rabbit) {
  const [x, y] = wolf
  const [z, k] = rabbit
  return Math.round(Math.sqrt(Math.pow(x - z, 2) + Math.pow(y - k, 2)))
}
function moveSingleWolfToNewPosition([x, y], [z, k], gameState) {
  const matrix = gameState.gameZone
  if (matrix[x][y] === rabbit) {
    gameState.isGameover = true
  }
  matrix[x][y] = wolf
  matrix[z][k] = freebox
}


function addGameStateInIntervalObj(gameState){
  intervalObj[gameState.boardNum] = gameState 
}

function delInterval(boardNum){
  if( intervalObj[boardNum]){
    clearInterval(intervalObj[boardNum].wolfMoveInterval)
  }
}


//drow
function start(boardNum) {   
  delInterval(boardNum)    
  const gameBoardSize = parseInt(
    document.getElementById("select" + boardNum).value
  )
  const matrix = getArray(gameBoardSize)
  const gameState = {
    gameZone: matrix,
    isGameover: false,
    gameResult: null,
    boardNum: boardNum,
    wolfMoveInterval: setInterval(() => {
      freePossitionsAroundWolves(gameState, wolf)
      clearGameZone(gameState)
      createGameBoard(gameState)      
    }, 1500)
  } 
  addGameStateInIntervalObj(gameState)

  drowBoard(gameState)
  
  gameZoneSize(gameState, gameBoardSize)
  const rabbitCount = 1
  const homeCount = 1
  const wolvesCount = Math.ceil((60 * gameBoardSize) / 100)
  const banersCount = Math.ceil((40 * gameBoardSize) / 100)
  memberCount(rabbitCount, gameState, rabbit)
  memberCount(homeCount, gameState, house)
  memberCount(wolvesCount, gameState, wolf)
  memberCount(banersCount, gameState, ban)
  clearGameZone(gameState)
  createGameBoard(gameState)
  checkDoesKeyPressed(gameState, rabbit)
  hideMessageById(gameState, you_win)
  hideMessageById(gameState, game_over)
  console.log(gameState.gameZone, "matrix")
}
function gameZoneSize(gameState, selectValue) {
  const gameZone = document.getElementById("game_zone" + gameState.boardNum)
  const gameZoneSize = selectValue * 61 + 20 + "px"
  gameZone.style.width = gameZoneSize
}

function createInnerDivs(gameState) {
  const mainDiv = document.getElementById("game_zone" + gameState.boardNum)

  const innerDiv = document.createElement("div")

  mainDiv.append(innerDiv)
}

function createImg(gameState, divNum, member) {
  const mainDiv = document.getElementById("game_zone"+gameState.boardNum).children
 
  const innerImg = document.createElement("img")
  innerImg.setAttribute("src", member)

  mainDiv.item(divNum).append(innerImg)
}

function createGameBoard(gameState) {
  let divNum = 0
  const matrix = gameState.gameZone
  matrix.forEach((row) => {
    row.forEach((column) => {
        createInnerDivs(gameState, divNum)
      if (column === wolf) {
        createImg(gameState, divNum, img.wolf.src)
      }
      if (column === ban) {
        createImg(gameState, divNum, img.ban.src)
      }
      if (column === house) {
        createImg(gameState, divNum, img.house.src)
      }
      if (column === rabbit) {
        createImg(gameState, divNum, img.rabbit.src)
      }
      divNum++
    })
  })
}

function clearGameZone(gameState) {
  const mainDiv = document.getElementById("game_zone" + gameState.boardNum)
  mainDiv.innerHTML = ""
}

function showElementById(id) {
  const getMessage = document.getElementById(id)
  if (getMessage) {
    getMessage.style.display = "block"
  }
}

function hideElementById(id) {
  const getMessage = document.getElementById(id)
  if (getMessage) {
    if (getMessage) {
      getMessage.style.display = "none"
    }
  }
}

function hideMessageById(gameState, messageId) {
  hideElementById(messageId + gameState.boardNum)
}

function hideBoard(gameState) {
  hideElementById("game_zone" + gameState.boardNum)
}

function drowBoard(gameState) {
  const getBorder = document.getElementById("game_zone" + gameState.boardNum)
  if (getBorder) {
    getBorder.style.display = "flex"
  }
}