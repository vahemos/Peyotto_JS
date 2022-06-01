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

const freebox = 0;
function getArray() {
  const value = parseInt(document.getElementById("select").value);
  const place = new Array(value).fill(freebox).map(() => new Array(value).fill(freebox));

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

//drow

document.querySelector(".btn ").onclick = () => {
  const matrix = getArray();
  const wolves = Math.ceil(
    (60 * document.querySelector(".select").value) / 100
  );
  const baners = Math.ceil(
    (40 * document.querySelector(".select").value) / 100
  );

  memberCount(1, matrix, rabbit);
  memberCount(1, matrix, house);
  memberCount(wolves, matrix, wolf);
  memberCount(baners, matrix, ban);

  let rabbitCurrentPosition = getMemberPosition(matrix, rabbit);
  getMemberPosition(matrix, house);
  getMemberPosition(matrix, wolf);
  getMemberPosition(matrix, ban);


  console.log(matrix);
  move(rabbitCurrentPosition, matrix);
  
  
};

function move(rabbitCurrentPosition, matrix) {
  let x = rabbitCurrentPosition[0][0];
  let y = rabbitCurrentPosition[0][1];
  window.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 37: //left
        matrix[x][y] = 0;
        matrix[x][y - 1] = "rabbit";
        y -= 1;
        console.log(matrix);
        break;
      case 38: //up
        matrix[x][y] = 0;
        matrix[x - 1][y] = "rabbit";
        x -= 1;
        console.log(matrix);
        break;
      case 39: //right
        matrix[x][y] = 0;
        matrix[x][y + 1] = "rabbit";
        y += 1;
        console.log(matrix);
        break;
      case 40: //down
        matrix[x][y] = 0;
        matrix[x + 1][y] = "rabbit";
        x += 1;
        console.log(matrix);
        break;
    }
  });
}
