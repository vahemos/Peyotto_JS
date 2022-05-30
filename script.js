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



  function getArray() {
  const arrayItem = null;
  const value = parseInt(document.getElementById("select").value);
  const place = new Array(value).fill(arrayItem).map(() => new Array(value).fill(arrayItem));

  return place;
}


function randCoordinates(arr,gameMember){
  const randX= Math.floor(Math.random() * arr.length);
  const randY = Math.floor(Math.random() * arr.length);
  if(arr[randX][randY] === null){
    arr[randX][randY]= gameMember;
   }else{
    randCoordinates(arr, gameMember)
   }
}

document.querySelector(".btn ").onclick = ()=> {
  
  let x = getArray();
  randCoordinates(x,house)
  randCoordinates(x,rabbit)
  randCoordinates(x,wolf)
  randCoordinates(x,ban)
  console.log(x);
}