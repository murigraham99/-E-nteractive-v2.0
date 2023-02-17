// Get the draggable element
const draggableElem = document.getElementById("draggable-elem");

// Add event listeners for mouse down, up, and move events
draggableElem.addEventListener("mousedown", mouseDown);
draggableElem.addEventListener("mouseup", mouseUp);

// Add touch event listeners for touch start, move, and end events
draggableElem.addEventListener("touchstart", touchStart);
draggableElem.addEventListener("touchmove", touchMove);
draggableElem.addEventListener("touchend", touchEnd);

// Create a new element when the button is clicked
const createElemBtn = document.getElementById("create-elem-btn");
createElemBtn.addEventListener("click", createNewElem);

const container = document.getElementById("container");
container.style.display = "block";

const draggableElems = document.querySelectorAll(".draggable-elem");

draggableElems.forEach(elem => {
  elem.addEventListener("mousemove", onMouseMove);
});



function mouseDown(event) {
  // Calculate the offset between the mouse and the draggable element
  offsetX = event.clientX - draggableElem.offsetLeft;
  offsetY = event.clientY - draggableElem.offsetTop;

  // Add an event listener for the mouse move event
  document.addEventListener("mousemove", mouseMove);
}

function mouseMove(event) {
  // Update the position of the draggable element
  draggableElem.style.left = event.clientX - offsetX + "px";
  draggableElem.style.top = event.clientY - offsetY + "px";
}

function mouseUp(event) {
  // Remove the event listener for the mouse move event
  document.removeEventListener("mousemove", mouseMove);

  // Check if the draggable element is close to another element
  let closestElem = null;
  let minDistance = Infinity;
  const draggableRect = draggableElem.getBoundingClientRect();

  draggableElems.forEach((elem) => {
    if (elem !== draggableElem) {
      const elemRect = elem.getBoundingClientRect();

      const distLeft = Math.abs(draggableRect.left - elemRect.left);
      const distRight = Math.abs(draggableRect.right - elemRect.right);
      const distTop = Math.abs(draggableRect.top - elemRect.top);
      const distBottom = Math.abs(draggableRect.bottom - elemRect.bottom);

      if (distLeft < 500) {
        if (distLeft < minDistance) {
          closestElem = elem;
          minDistance = distLeft;
        }
        elem.classList.add("highlight-left");
      } else {
        elem.classList.remove("highlight-left");
      }

      if (distRight < 500) {
        if (distRight < minDistance) {
          closestElem = elem;
          minDistance = distRight;
        }
        elem.classList.add("highlight-right");
      } else {
        elem.classList.remove("highlight-right");
      }

      if (distTop < 500) {
        if (distTop < minDistance) {
          closestElem = elem;
          minDistance = distTop;
        }
        elem.classList.add("highlight-top");
      } else {
        elem.classList.remove("highlight-top");
      }

      if (distBottom < 500) {
        if (distBottom < minDistance) {
          closestElem = elem;
          minDistance = distBottom;
        }
        elem.classList.add("highlight-bottom");
      } else {
        elem.classList.remove("highlight-bottom");
      }
    }
  });

  // Snap the draggable element to the closest element
  if (closestElem) {
    const closestRect = closestElem.getBoundingClientRect();

    if (minDistance === Math.abs(draggableRect.left - closestRect.left)) {
      draggableElem.style.left = closestRect.left - draggableRect.width + "px";
    } else if (minDistance === Math.abs(draggableRect.right - closestRect.right)) {
      draggableElem.style.left = closestRect.right + "px";
    } else if (minDistance === Math.abs(draggableRect.top - closestRect.top)) {
      draggableElem.style.top = closestRect.top - draggableRect.height + "px";
    } else {
      draggableElem.style.top = closestRect.bottom + "px";
    }
  }
}


function touchStart(event) {
  // Calculate the offset between the touch and the draggable element
  const touch = event.touches[0];
  touchX = touch.clientX - draggableElem.offsetLeft;
  touchY = touch.clientY - draggableElem.offsetTop;
}

function touchMove(event) {
  // Update the position of the draggable element
  const touch = event.touches[0];
  draggableElem.style.left = touch.clientX - touchX + "px";
  draggableElem.style.top = touch.clientY - touchY + "px";
}

function touchEnd(event) {
  // Do nothing
}
//Creating the new drag element
function createNewElem() {
  const newElem = document.createElement("div");
  newElem.classList.add("new-elem");
  newElem.innerHTML = "<p>New Element</p>";
  document.getElementById("container").appendChild(newElem);

  // make the new element draggable
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  newElem.onmousedown = dragMouseDown;
  newElem.addEventListener("touchstart", touchStart);
  newElem.addEventListener("touchmove", touchMove);
  newElem.addEventListener("touchend", touchEnd);

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    newElem.style.top = (newElem.offsetTop - pos2) + "px";
    newElem.style.left = (newElem.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function touchStart(e) {
    const touch = e.touches[0];
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    const target = e.target;
    if (target.classList.contains("drag-handle")) {
      target.parentElement.style.zIndex = 1;
    }
    target.addEventListener("touchend", touchEnd, false);
    document.addEventListener("touchmove", touchMove, false);
  }

  function touchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    pos1 = pos3 - touch.clientX;
    pos2 = pos4 - touch.clientY;
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    newElem.style.top = (newElem.offsetTop - pos2) + "px";
    newElem.style.left = (newElem.offsetLeft - pos1) + "px";
  }

  function touchEnd(e) {
    const target = e.target;
    if (target.classList.contains("drag-handle")) {
      target.parentElement.style.zIndex = 0;
    }
    target.removeEventListener("touchend", touchEnd, false);
    document.removeEventListener("touchmove", touchMove, false);
  }
}

