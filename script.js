const img = {
  rabbit: { name: "rabbit", src: "./img/rabbit.png", id: 1 },
  wolf: { name: "wolf", src: "./img/gamewolf.png", id: 2 },
  ban: { name: "ban", src: "./img/ban.png", id: 3 },
  house: { name: "house", src: "./img/home.png", id: 4 },
};

const rabbit = img.rabbit.name;
const house = img.house.name;
const wolf = img.wolf.name;
const ban = img.ban.name;

const freebox = "0";
function getArray() {
  const value = parseInt(document.getElementById("select").value);
  const place = new Array(value)
    .fill(freebox)
    .map(() => new Array(value).fill(freebox));

  return place;
}

function freeCoordinates(arr) {
  const x = Math.floor(Math.random() * arr.length);
  const y = Math.floor(Math.random() * arr.length);

  if (arr[x][y] === freebox) {
    return [x, y];
  } else {
    return freeCoordinates(arr);
  }
}

function setCharacter(gameMember, arr) {
  const [x, y] = freeCoordinates(arr);
  arr[x][y] = gameMember;
}

function memberCount(count, arr, gameMember) {
  for (let i = 0; i < count; i++) {
    setCharacter(gameMember, arr);
  }
}

function getMemberPosition(arr, gameMember) {
  const findeposs = function (accum, row, x) {
    row.forEach((item, y) => {
      if (item === gameMember) {
        accum.push([x, y]);
      }
    });
    return accum;
  };

  return arr.reduce(findeposs, []);
}

function checkDoesKeyPressed(arr, herro) {
  // freePossitionsAroundWolves(arr, wolf);
  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 37) {
      arrowLeft(arr, herro);
      // freePossitionsAroundWolves(arr, wolf);
    } //left
    else if (event.keyCode === 38) {
      arrowUp(arr, herro);
      // freePossitionsAroundWolves(arr, wolf);
    } //up
    else if (event.keyCode === 39) {
      arrowRight(arr, herro);
      // freePossitionsAroundWolves(arr, wolf);
    } //right
    else if (event.keyCode === 40) {
      arrowDown(arr, herro);
      // freePossitionsAroundWolves(arr, wolf);
    } //down
  });
}

//move left

function arrowLeft(arr, herro) {
  const [x, y] = getMemberPosition(arr, herro)[0];
  let yAfterWalk = y - 1;
  if (y === 0) {
    yAfterWalk = 4;
  }
  if (arr[x][yAfterWalk] === freebox) {
    arr[x][yAfterWalk] = herro;
    arr[x][y] = freebox;
    console.log(arr);
  } else if (arr[x][yAfterWalk] === wolf) {
    console.log("game over");
  } else if (arr[x][yAfterWalk] === house) {
    console.log("you won");
  }
}

//move Up

function arrowUp(arr, herro) {
  const [x, y] = getMemberPosition(arr, herro)[0];
  let xAfterWalk = x - 1;
  if (x === 0) {
    xAfterWalk = 4;
  }
  if (arr[xAfterWalk][y] === freebox) {
    arr[xAfterWalk][y] = herro;
    arr[x][y] = freebox;
    console.log(arr);
  } else if (arr[xAfterWalk][y] === wolf) {
    console.log("game over");
  } else if (arr[xAfterWalk][y] === house) {
    console.log("you won");
  }
}

//move right

function arrowRight(arr, herro) {
  const [x, y] = getMemberPosition(arr, herro)[0];
  let yAfterWalk = y + 1;
  if (y === 4) {
    yAfterWalk = 0;
  }
  if (arr[x][yAfterWalk] === freebox) {
    arr[x][yAfterWalk] = herro;
    arr[x][y] = freebox;
    console.log(arr);
  } else if (arr[x][yAfterWalk] === wolf) {
    console.log("game over");
  } else if (arr[x][yAfterWalk] === house) {
    console.log("you won");
  }
}

//move down

function arrowDown(arr, herro) {
  const [x, y] = getMemberPosition(arr, herro)[0];
  let xAfterWalk = x + 1;
  if (x === 4) {
    xAfterWalk = 0;
  }
  if (arr[xAfterWalk][y] === freebox) {
    arr[xAfterWalk][y] = herro;
    arr[x][y] = freebox;
    console.log(arr);
  } else if (arr[xAfterWalk][y] === wolf) {
    console.log("game over");
  } else if (arr[xAfterWalk][y] === house) {
    console.log("you won");
  }
}

function freePossitionsAroundWolves(arr, member) {
  let massiv = [];
  let wolvesCorrentPossition = getMemberPosition(arr, member);

  wolvesCorrentPossition.forEach((wolfPossition) => {
    const [x, y] = wolfPossition;

    if (arr[x][y - 1] === freebox) {
      massiv.push([x, y - 1]);
    }
    if (arr[x][y + 1] === freebox) {
      massiv.push([x, y + 1]);
    }
    if (x !== 0) {
      if (arr[x - 1][y] === freebox) {
        massiv.push([x - 1, y]);
      }
    }
    if (x !== 4) {
      if (arr[x + 1][y] === freebox) {
        massiv.push([x + 1, y]);
      }
    }
    
  });return massiv;
  console.log(massiv, "wolves free possition massiv");
}



//drow

document.querySelector(".btn ").onclick = () => {
  
  const matrix = getArray();
  
  const napoCount = 1;
  const homeCount = 1;
  const wolvesCount = Math.ceil((60 * document.querySelector(".select").value) / 100);
  const banersCount = Math.ceil((40 * document.querySelector(".select").value) / 100);

  memberCount(napoCount, matrix, rabbit);
  memberCount(homeCount, matrix, house);
  memberCount(wolvesCount, matrix, wolf);
  memberCount(banersCount, matrix, ban);

  let rabbitPoss = getMemberPosition(matrix, rabbit);
  getMemberPosition(matrix, house);
  getMemberPosition(matrix, wolf);

  getMemberPosition(matrix, ban);

  checkDoesKeyPressed(matrix, rabbit);

  let wolvesCanGo =freePossitionsAroundWolves(matrix, wolf)
  distance(wolvesCanGo,rabbitPoss)

  console.log(matrix);
};




function distance(wolvesCanGo,rabbitPoss){

  console.log (wolvesCanGo,"gilan")
  console.log (rabbitPoss,"nap")


}