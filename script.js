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
function getArray() {
  const value = parseInt(document.getElementById("select").value)
  const place = new Array(value)
    .fill(freebox)
    .map(() => new Array(value).fill(freebox))
  return place
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
  const arr = gameState.gameZone
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

      showMessage(game_over) ////////////////////           GAME OVER
      console.log(gameState.isGameover)
    }
    if (arr[x][y] === freebox) {
      massiv.push([x, y])
    }
  })
  return massiv
}
// const gameState = {
//   gameZone: matrix,
//   isGameover: false,
//   gameResult: null,
// }
////////////////////////////////////////////////////////////////////////////////
function rabbitMove(gameState, rabbit, x, y) {
  const arr = gameState.gameZone
  console.log(gameState, "game state")

  const [i, j] = getMemberPosition(arr, rabbit)[0]
  if (arr[x][y] === freebox) {
    arr[x][y] = rabbit
    arr[i][j] = freebox
  } else if (arr[x][y] === wolf) {
    // showMessage(game_over)                         ////     GAME OVER
    //  del()
    console.log("84")
  } else if (arr[x][y] === house) {
    // arr[x][y] === rabbit
    arr[i][j] = freebox
    showMessage(you_win) ////       YOU WIN
    // del()
    console.log("you win 89 ")
  } else if (arr[x][y] === ban) {
    return
  }
}
function checkDoesKeyPressed(gameState, rabbit) {
  const arr = gameState.gameZone
  window.onkeydown = (event) => {
    const [x, y] = getMemberPosition(arr, rabbit)[0]
    let newX = x
    let newY = y
    if (event.key === "ArrowLeft") {
      newY = y - 1
      if (y === 0) {
        newY = arr.length - 1
      }
    } else if (event.key === "ArrowUp") {
      newX = x - 1
      if (x === 0) {
        newX = arr.length - 1
      }
    } else if (event.key === "ArrowRight") {
      newY = y + 1
      if (y === arr.length - 1) {
        newY = 0
      }
    } else if (event.key === "ArrowDown") {
      newX = x + 1
      if (x === arr.length - 1) {
        newX = 0
      }
    }
    rabbitMove(gameState, rabbit, newX, newY)
    freePossitionsAroundWolves(gameState, wolf)
    clearGameZone()
    createGameBoard(arr)
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
      console.log("fsyo")
      return
    } else {
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
document.querySelector(".startbutton").onclick = () => {
  drow()
  const selectValue = parseInt(document.getElementById("select").value)
  gameZoneSize(selectValue)
  const matrix = getArray()
  const gameState = {
    gameZone: matrix,
    isGameover: false,
    gameResult: null,
  }
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
  clearGameZone()
  createGameBoard(gameState.gameZone)
  checkDoesKeyPressed(gameState, rabbit)
  hide(you_win)
  hide(game_over)
  console.log(gameState.gameZone, "matrix")
}
function gameZoneSize(selectValue) {
  const gameZone = document.getElementById("game_zone")
  const gameZoneSize = selectValue * 60 + 20 + "px"
  gameZone.style.width = gameZoneSize
}
function createInnerDivs(id) {
  const mainDiv = document.getElementById("game_zone")
  const innerDiv = document.createElement("div")
  innerDiv.setAttribute("id", id)
  mainDiv.append(innerDiv)
}
function createImg(id, member) {
  const mainDiv = document.getElementById(id)
  const innerImg = document.createElement("img")
  innerImg.setAttribute("src", member)
  mainDiv.append(innerImg)
}
function createGameBoard(matrix) {
  matrix.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const id = rowIndex.toString() + columnIndex.toString()
      if (column === freebox) {
        createInnerDivs(id)
      }
      if (column === wolf) {
        createInnerDivs(id)
        createImg(id, img.wolf.src)
      }
      if (column === ban) {
        createInnerDivs(id)
        createImg(id, img.ban.src)
      }
      if (column === house) {
        createInnerDivs(id)
        createImg(id, img.house.src)
      }
      if (column === rabbit) {
        createInnerDivs(id)
        createImg(id, img.rabbit.src)
      }
    })
  })
}
function clearGameZone() {
  const mainDiv = document.getElementById("game_zone")
  mainDiv.innerHTML = ""
}
function showMessage(id) {
  const x = document.getElementById(id)
  x.style.display = "block"
  del()
}
function hide(id) {
  const x = document.getElementById(id)
  x.style.display = "none"
}
function del() {
  const x = document.getElementById("game_zone")
  x.style.display = "none"
}
function drow() {
  let x = document.getElementById("game_zone")
  x.style.display = "flex"
}
