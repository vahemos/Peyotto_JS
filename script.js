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

function randCoordinates(arr) {
  const x = Math.floor(Math.random() * arr.length);
  const y = Math.floor(Math.random() * arr.length);

  if (arr[x][y] === freebox) {
    return [x, y];
  } else {
    return randCoordinates(arr);
  }
}

function setCharacter(gameMember, arr) {
  const [x, y] = randCoordinates(arr);
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
  
  let x = arr.reduce(findeposs, []);
  // console.log(x[0]);
  // console.log(x[0]=4);
  return x
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
  
  let currentPosition = getMemberPosition(matrix, rabbit);
  // console.log(currentPosition)
// console.log(currentPosition[0][0])

  getMemberPosition(matrix, house);
  getMemberPosition(matrix, wolf);
  getMemberPosition(matrix, ban);
  move(currentPosition)
  console.log(matrix);
};


function move(currentPosition){
  
let x = currentPosition[0][0]
let y = currentPosition[0][1]
window.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
      case 37: //left
          x -= 1;
          break;
      case 38: //up
          y -= 1;
          break;
      case 39: //right
          x += 1;
          break;
      case 40: //down 
          y += 1;
          break;
  }
});

}




