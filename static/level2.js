let currentElement = "";
let list = document.getElementById("list");
let initialX = 0,
    initialY = 0;
let isGameTwoWon = false;

//Setting up the cover
document.body.style.backgroundImage = 'url(/static/images/backgrounds/Level2_bg.jpeg)';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundSize = '100vw 100vh';

window.onload = async () => {
  customElement = "";
  list.innerHTML = "";
  //This creates 7 elements
  await creator(7);

  let listItems = document.querySelectorAll(".list-item");
  listItems.forEach((element) => {
    element.draggable = true;
    element.addEventListener("dragstart", dragStart, false);
    element.addEventListener("dragover", dragOver, false);
    element.addEventListener("drop", drop, false);
    element.addEventListener("touchstart", dragStart, false);
    element.addEventListener("touchmove", drop, false);
  });
};

const isTouchDevice = () => {
  try {
    //We try to create TouchEvent (it would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

//Create List Items
const creator = (count) => {
  const itemValues = Array.from({
    length: count
  }, (_, index) => index + 1);
  const shuffledValues = shuffle(itemValues);

  for (let i = 0; i < count; i++) {
    const value = shuffledValues[i];
    list.innerHTML += `<li class="list-item" id="item${value}" data-value="${value}"></li>`;
  }
};

// This function shuffles an array in place using the Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Returns element index with given value
const getPosition = (value) => {
  let elementIndex;
  let listItems = document.querySelectorAll(".list-item");
  listItems.forEach((element, index) => {
    let elementValue = element.getAttribute("data-value");
    if (value == elementValue) {
      elementIndex = index;
    }
  });
  return elementIndex;
};

//Drag and drop functions
function dragStart(e) {
  initialX = isTouchDevice() ? e.touches[0].clientX : e.clientX;
  initialY = isTouchDevice() ? e.touches[0].clientY : e.clientY;
  //Set current Element
  currentElement = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

const drop = (e) => {
  e.preventDefault();
  let newX = isTouchDevice() ? e.touches[0].clientX : e.clientX;
  let newY = isTouchDevice() ? e.touches[0].clientY : e.clientY;

  //Set targetElement(where we drop the picked element).It is based on mouse position
  let targetElement = document.elementFromPoint(newX, newY);
  let currentValue = currentElement.getAttribute("data-value");
  let targetValue = targetElement.getAttribute("data-value");
  //get index of current target based on value
  let [currentPosition, targetPosition] = [
    getPosition(currentValue),
    getPosition(targetValue),
  ];
  initialX = newX;
  initialY = newY;

  try {
    //'afterend' inserts the element after the target element and 'beforebegin' inserts before the target element
    if (currentPosition < targetPosition) {
      targetElement.insertAdjacentElement("afterend", currentElement);
    } else {
      targetElement.insertAdjacentElement("beforebegin", currentElement);
    }
  } catch (err) {}

  checkWin();
};

// Check if the items are sorted in ascending order from 1 to 7
function checkWin() {
  let listItems = document.querySelectorAll(".list-item");
  let previousValue = 0;

  for (let i = 0; i < listItems.length; i++) {
    let currentValue = Number(listItems[i].getAttribute("data-value"));
    if (currentValue < previousValue) {
      console.log("You have not won yet");
      return false;
    }
    previousValue = currentValue;
  }

  isGameTwoWon = true;
  return true;
}

// Add event listener to the check button
const checkButton = document.getElementById("check-button");

if (checkButton) {
  checkButton.addEventListener("click", () => {
    if (checkWin()) {
      // Show pop up when game is won
      list.classList.add("game-finished");
      const checkButton = document.getElementById("check-button");
      checkButton.disabled = true;
      const popUp = document.createElement("div");
      popUp.className = "pop-up";
      const message = document.createElement("p");
      message.textContent = "You won!";
      const button = document.createElement("button");
      button.id = "new-button";
      button.className = "button-arounder";
      button.addEventListener("mouseover", playAudioHub);
      button.addEventListener("mouseout", pauseAudioHub);
      button.textContent = "Go to the hub";
      button.onclick = () => {
        window.location.href = "http://127.0.0.1:4000/start";
      };
      popUp.appendChild(message);
      popUp.appendChild(button);
      document.body.appendChild(popUp);
    } else {
      pauseAudio()
      const audioLose = new Audio('/static/audio/incorrect.mp3');
      audioLose.volume = 0.2;
      audioLose.play();
      console.log("You have not won yet");
    }
  });
} else {
  console.error("Element with ID 'check-button' not found");
}
