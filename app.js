const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

let score = 0;
let scoreText = document.createElement("p")
const scoreTitle = document.createElement("p")

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    const scoreDiv = document.getElementById("score-container")
    scoreDiv.append(scoreTitle)
    scoreDiv.append(scoreText)
    score = 0;
    scoreTitle.innerText = "SCORE"
    scoreText.innerText = score;

    for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

const startBtn = document.createElement("button")
const body = document.querySelector("body")
startBtn.innerText = "Start!"
startBtn.id = "start"
body.append(startBtn)
startBtn.addEventListener('click', function () {
    startBtn.remove()
    createDivsForColors(shuffledColors)
})

let matchedCount = 0;

function handleCardClick(event) {
    if (event.target.classList.contains("flipped")) {
    } else if (event.target.classList.contains("matched")) {
    } else {
    score ++;
    scoreText.innerText = score;
    event.target.style.backgroundColor = event.target.className;
    event.target.classList.toggle("flipped")
    let flipped = document.querySelectorAll(".flipped")
    let allDivs = document.querySelectorAll("#game div")
    if (flipped.length === 2) {
        let matches = 0;
        flipped.forEach(function (div) {
            if (div.classList.contains(`${event.target.style.backgroundColor}`)) {
                matches ++;
            }
        })
        if (matches === 2) {
            flipped.forEach(function (div) {
                div.classList.remove("flipped")
                div.classList.add("matched")
                matchedCount ++;
            })
        } else {
            for (let div of allDivs) {
                div.removeEventListener('click',handleCardClick);
            }
            setTimeout(function () {
                flipped.forEach(function (div) {
                    div.classList.remove("flipped")
                    div.style.backgroundColor = "white"
                    for (let div of allDivs) {
                        div.addEventListener('click', handleCardClick)
                    }
                })
            }, 1000)
        }
    }
if (matchedCount === 10) {
    score = scoreText.innerText;
    //if (a best score exists && score > best score) {
    //} else {
        //store score as best score
    //}
    const restartBtn = document.createElement("button")
    restartBtn.id = "restart"
    body.append(restartBtn)
    restartBtn.innerText = "NICE! Click to Restart!"
    for (let div of allDivs) {
        div.style.filter = "brightness(5%) grayscale(50%) blur(1.5rem)"
    }
    restartBtn.addEventListener('click', function () {
        matchedCount = 0;
        restartBtn.remove()
        gameContainer.innerHTML = ''
        scoreTitle.remove()
        shuffle(COLORS);
        createDivsForColors(shuffledColors);
    })
}
    }
}

// when the DOM loads

//createDivsForColors(shuffledColors);

/* */