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
createElemBtn.style.flexShrink = 0;

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
function onMouseMove(event) {
  const currentElem = event.target;
  const currentRect = currentElem.getBoundingClientRect();

  draggableElems.forEach(elem => {
    if (elem !== currentElem) {
      const rect = elem.getBoundingClientRect();
      const overlap = !(rect.right < currentRect.left ||
                        rect.left > currentRect.right ||
                        rect.bottom < currentRect.top ||
                        rect.top > currentRect.bottom);

      if (overlap) {
        const isAbove = currentRect.top <= rect.bottom && currentRect.top <= rect.top;
        const isBelow = currentRect.bottom >= rect.top && currentRect.bottom >= rect.bottom;
        const isLeft = currentRect.left <= rect.right && currentRect.left <= rect.left;
        const isRight = currentRect.right >= rect.left && currentRect.right >= rect.right;

        if (isAbove && isLeft) {
          currentElem.style.left = `${rect.left - currentRect.width}px`;
          currentElem.style.top = `${rect.top - currentRect.height}px`;
        } else if (isAbove && isRight) {
          currentElem.style.left = `${rect.right}px`;
          currentElem.style.top = `${rect.top - currentRect.height}px`;
        } else if (isBelow && isLeft) {
          currentElem.style.left = `${rect.left - currentRect.width}px`;
          currentElem.style.top = `${rect.bottom}px`;
        } else if (isBelow && isRight) {
          currentElem.style.left = `${rect.right}px`;
          currentElem.style.top = `${rect.bottom}px`;
        }
      }
    }
  });
}

