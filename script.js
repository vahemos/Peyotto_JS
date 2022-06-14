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
<div class="down"><button id="${"down" + gameNum}" class="down">Down</button></div>`
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

function freeCoordinates(arr) {
  const x = Math.floor(Math.random() * arr.length)
  const y = Math.floor(Math.random() * arr.length)
  if (arr[x][y] === freebox) {
    return [x, y]
  } else {
    return freeCoordinates(arr)
  }
}
function setMember(gameMember, gameState) {
  const arr = gameState.gameZone
  const [x, y] = freeCoordinates(arr)
  arr[x][y] = gameMember
}
function memberCount(count, gameState, gameMember) {
  // const arr = gameState.gameZone
  for (let i = 0; i < count; i++) {
    setMember(gameMember, gameState)
  }
}
function getMemberPosition(arr, gameMember) {
  const findeposs = function (accum, row, x) {
    row.forEach((item, y) => {
      if (item === gameMember) {
        accum.push([x, y])
      }
    })
    return accum
  }
  return arr.reduce(findeposs, [])
}
function rabbitOrFreebox(gameState, emptyCellsArr) {
  const arr = gameState.gameZone
  const massiv = []
  emptyCellsArr.forEach((cell) => {
    const [x, y] = cell
    if (arr[x][y] === rabbit) {
      gameState.isGameover = true
      showMessage(gameState, game_over) ////////////////////           GAME OVER
    }
    if (arr[x][y] === freebox) {
      massiv.push([x, y])
    }
  })
  return massiv
}
function rabbitMove(gameState, rabbit, x, y) {
  const arr = gameState.gameZone
  const [i, j] = getMemberPosition(arr, rabbit)[0]
  if (gameState.isGameover === false) {
    if (arr[x][y] === freebox) {
      arr[x][y] = rabbit
      arr[i][j] = freebox
    } else if (arr[x][y] === wolf) {
      gameState.gameResult = game_over
      ////     GAME OVER
    } else if (arr[x][y] === ban) {
      return
    } else if (arr[x][y] === house) {
      gameState.gameResult = you_win
      showMessage(gameState, gameState.gameResult) ////       YOU WIN
      gameState.isGameover = true
      return
    }
  }
}
function checkDoesKeyPressed(gameState, rabbit) {
  const arr = gameState.gameZone
  const left = document.getElementById("left" + gameState.boardNum)
  const up = document.getElementById("up" + gameState.boardNum)
  const right = document.getElementById("right" + gameState.boardNum)
  const down = document.getElementById("down" + gameState.boardNum)
  const [x, y] = getMemberPosition(arr, rabbit)[0]
  left.onclick = () => {
    const [x, y] = getMemberPosition(arr, rabbit)[0]
    let newX = x
    let newY = y
    newY = y - 1
    if (y === 0) {
    newY = arr.length - 1
    }
    rabbitMove(gameState, rabbit, newX, newY)
    freePossitionsAroundWolves(gameState, wolf)
    clearGameZone(gameState)
    createGameBoard(gameState)
  }
  up.onclick = () => {
    const [x, y] = getMemberPosition(arr, rabbit)[0]
    let newX = x
    let newY = y
    newX = x - 1
    if (x === 0) {
      newX = arr.length - 1
    }
    rabbitMove(gameState, rabbit, newX, newY)
    freePossitionsAroundWolves(gameState, wolf)
    clearGameZone(gameState)
    createGameBoard(gameState)
  }
  right.onclick = () => {
    const [x, y] = getMemberPosition(arr, rabbit)[0]
    let newX = x
    let newY = y
    newY = y + 1
    if (y === arr.length - 1) {
      newY = 0
    }
    rabbitMove(gameState, rabbit, newX, newY)
    freePossitionsAroundWolves(gameState, wolf)
    clearGameZone(gameState)
    createGameBoard(gameState)
  }
  down.onclick = () => {
    const [x, y] = getMemberPosition(arr, rabbit)[0]
    let newX = x
    let newY = y
    newX = x + 1
    if (x === arr.length - 1) {
      newX = 0
    }
    rabbitMove(gameState, rabbit, newX, newY)
    freePossitionsAroundWolves(gameState, wolf)
    clearGameZone(gameState)
    createGameBoard(gameState)
  }
}
function getCordinat(arr, [x, y]) {
  const cells = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]
  return cells.filter((cell) => isInRange(arr, cell))
}
function isInRange(arr, [x, y]) {
  return x >= 0 && x < arr.length && y >= 0 && y < arr.length
}

function freePossitionsAroundWolves(gameState, member) {
  const arr = gameState.gameZone
  let wolvesCorrentPossition = getMemberPosition(arr, member)
  wolvesCorrentPossition.forEach((wolf) => {
    if (gameState.isGameover === true) {
      return
    }  else{
      const cells = getCordinat(arr, wolf)
      const freeCells = rabbitOrFreebox(gameState, cells)
      const distanceArray = getClosestCell(freeCells, arr)
      const closestCell = getMinDistance(distanceArray, freeCells)
      moaveSingleWolfToNewPosition(closestCell, wolf, arr)
    }
  })
}
function getClosestCell(freeBoxes, arr) {
  const rabbitCords = getMemberPosition(arr, rabbit)
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
function moaveSingleWolfToNewPosition([x, y], [z, k], arr) {
  arr[x][y] = wolf
  arr[z][k] = freebox
}
//drow
function start(boardNum) {
 
  const value = parseInt(document.getElementById("select" + boardNum).value)
  const matrix = getArray(value)
  const gameState = {
    gameZone: matrix,
    isGameover: false,
    gameResult: null,
    boardNum: boardNum,
  }
   
  drow(gameState)
  
  gameZoneSize(gameState, value)
  const rabbitCount = 1
  const homeCount = 1
  const wolvesCount = Math.ceil(
    (60 * document.querySelector(".select").value) / 100
  )
  const banersCount = Math.ceil(
    (40 * document.querySelector(".select").value) / 100
  )
  memberCount(rabbitCount, gameState, rabbit)
  memberCount(homeCount, gameState, house)
  memberCount(wolvesCount, gameState, wolf)
  memberCount(banersCount, gameState, ban)
  clearGameZone(gameState)
  createGameBoard(gameState)
  checkDoesKeyPressed(gameState, rabbit) 
  hide(gameState, you_win)
  hide(gameState, game_over)
  console.log(gameState.gameZone, "matrix")
}
function gameZoneSize(gameState, selectValue) {
  const gameZone = document.getElementById("game_zone" + gameState.boardNum)
  const gameZoneSize = selectValue * 60 + 20 + "px"
  gameZone.style.width = gameZoneSize
}
function createInnerDivs(gameState, id) {
  const mainDiv = document.getElementById("game_zone" + gameState.boardNum)

  const innerDiv = document.createElement("div")

  innerDiv.id = id + gameState.boardNum

  mainDiv.append(innerDiv)
}
function createImg(gameState, id, member) {
  const mainDiv = document.getElementById(id + gameState.boardNum)
  const innerImg = document.createElement("img")
  innerImg.setAttribute("src", member)
  
  mainDiv.append(innerImg)
}
function createGameBoard(gameState) {
  const matrix = gameState.gameZone
  matrix.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const id = rowIndex.toString() + columnIndex.toString()
      if (column === freebox) {
        createInnerDivs(gameState, id)
      }
      if (column === wolf) {
        createInnerDivs(gameState, id)
        createImg(gameState, id, img.wolf.src)
      }
      if (column === ban) {
        createInnerDivs(gameState, id)
        createImg(gameState, id, img.ban.src)
      }
      if (column === house) {
        createInnerDivs(gameState, id)
        createImg(gameState, id, img.house.src)
      }
      if (column === rabbit) {
        createInnerDivs(gameState, id)
        createImg(gameState, id, img.rabbit.src)
      }
    })
  })
}
function clearGameZone(gameState) {
  const mainDiv = document.getElementById("game_zone" + gameState.boardNum)
  mainDiv.innerHTML = ""
}
function showMessage(gameState, id) {
  const x = document.getElementById(id + gameState.boardNum)
  x.style.display = "block"
  del(gameState)
}
function hide(gameState, id) {
  const x = document.getElementById(`${id}${gameState.boardNum}`) 
  x.style.display = "none"
}
function del(gameState) {
  const x = document.getElementById("game_zone" + gameState.boardNum)
  x.style.display = "none"
}
function drow(gameState) {
  let x = document.getElementById("game_zone" + gameState.boardNum)
  x.style.display = "flex"
}
