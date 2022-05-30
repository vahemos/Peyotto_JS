document.querySelector(".btn ").onclick = () => {
  getArray();
  ganerateRabitPlace();
};

const img = {
  rabbit: { name: "rabbit", src: "./img/rabbit.png", id: 1 },
  wolf: { name: "wolf", src: "./img/gamewolf.png", id: 2 },
  ban: { name: "ban", src: "./img/ban.png", id: 3 },
  house: { name: "house", src: "./img/home.png", id: 4 },
};

function getArray() {
  const arrayItem = 666;
  const value = parseInt(document.getElementById("select").value);

  const place = new Array(value).fill(arrayItem).map(() => new Array(value).fill(arrayItem));

  return place;
}

function ganerateRabitPlace() {
  const arr = getArray();
  const randIndex = Math.floor(Math.random() * arr.length);
  arr[randIndex][randIndex] = img.rabbit.name;
  console.log(arr);
}



