const btn = document.getElementById('create-elem-btn');
const container = document.getElementById('container');
const draggableElem = document.getElementById('draggable-elem');
const groupCountElem = document.getElementById('group-count');
const groupPanel = document.getElementById('group-panel');

// Generate a random target group count between 3 and 10
const targetGroupCount = Math.floor(Math.random() * 7) + 3;

groupPanel.textContent = `Target group count: ${targetGroupCount}`;

// Flag to keep track of whether a pop-up has already been created for the current group
let popUpCreated = false;

btn.addEventListener('click', function() {
  const newElem = document.createElement('div');
  newElem.classList.add('draggable');

  // Generate random initial position values
  const initX = Math.floor(Math.random() * (container.offsetWidth - newElem.offsetWidth));
  const initY = Math.floor(Math.random() * (container.offsetHeight - newElem.offsetHeight));

  // Set initial position of the new element
  newElem.style.left = initX + 'px';
  newElem.style.top = initY + 'px';

  container.appendChild(newElem);

  // Keep track of the current group the element is in
  let currentGroup = [newElem];


  newElem.addEventListener('mousedown', function(e) {
    const x = e.clientX - newElem.offsetLeft;
    const y = e.clientY - newElem.offsetTop;

    function mousemoveHandler(e) {
      newElem.style.left = (e.clientX - x) + 'px';
      newElem.style.top = (e.clientY - y) + 'px';

      // Check if this element intersects with any other elements
      const intersectingElems = Array.from(document.getElementsByClassName('draggable')).filter(elem => {
        if (elem === newElem) {
          return false;
        }
        const rect1 = newElem.getBoundingClientRect();
        const rect2 = elem.getBoundingClientRect();
        return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
      });

      // If this element intersects with other elements, snap them together
      if (intersectingElems.length > 0) {
        currentGroup = [...currentGroup, ...intersectingElems.filter(elem => !currentGroup.includes(elem))];
        currentGroup.forEach(elem => {
          elem.style.borderColor = 'red';
          elem.style.borderWidth = '5px';
          elem.style.borderStyle = 'dashed';
          console.log(targetGroupCount)
        });
      } else {
        currentGroup.forEach(elem => {
          elem.style.borderColor = '';
          elem.style.borderWidth = '';
          elem.style.borderStyle = '';
        });
        currentGroup = [newElem];
      }

      // Update the group count
      groupCountElem.textContent = `Current group count: ${currentGroup.length}`;

      // Check if the current group count equals the target group count
      if (currentGroup.length === targetGroupCount && !popUpCreated) {
        popUpCreated = true;
        const list = document.querySelector(".list");
        list.classList.add("game-finished");
        const popUp = document.createElement("div");
        popUp.className = "pop-up";
        const message = document.createElement("p");
        message.textContent = "You won!";
        const button = document.createElement("button");
        button.id = "new-button";
        button.className = "button-arounder";
        button.textContent = "Go to the hub";
        button.onclick = () => {
        window.location.href = "http://127.0.0.1:4000/start";
    };
    popUp.appendChild(message);
    popUp.appendChild(button);
    document.body.appendChild(popUp);
    }
    }

    function mouseupHandler() {
      document.removeEventListener('mousemove', mousemoveHandler);
      document.removeEventListener('mouseup', mouseupHandler);
    }

    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
  });
});
