// Get references to relevant DOM elements
const btn = document.getElementById('create-elem-btn');
const container = document.getElementById('container');
const draggableElem = document.getElementById('draggable-elem');
const groupCountElem = document.getElementById('group-count');
const groupPanel = document.getElementById('group-panel');

// Generate a random target group count between 3 and 10
const targetGroupCount = Math.floor(Math.random() * 7) + 4;

// Set the text content of the group panel to display the target group count
groupPanel.textContent = `Target group count: ${targetGroupCount}`;

// Flag to keep track of whether a pop-up has already been created for the current group
let popUpCreated = false;

// Add click event listener to the button
btn.addEventListener('click', function() {
  // Create a new draggable element and set its initial position
  const newElem = document.createElement('div');
  newElem.classList.add('draggable');
  const initX = Math.floor(Math.random() * (container.offsetWidth - newElem.offsetWidth));
  const initY = Math.floor(Math.random() * (container.offsetHeight - newElem.offsetHeight));
  newElem.style.left = initX + 'px';
  newElem.style.top = initY + 'px';

  // Append the new element to the container
  container.appendChild(newElem);

  // Keep track of the current group the element is in
  let currentGroup = [newElem];

  // Add mousedown event listener to the new element
  newElem.addEventListener('mousedown', function(e) {
    const x = e.clientX - newElem.offsetLeft;
    const y = e.clientY - newElem.offsetTop;

    // Add mousemove event listener to the document
    function mousemoveHandler(e) {
      // Move the element to follow the mouse cursor
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
        });
      } else {
        // If this element does not intersect with any other elements, reset the group
        currentGroup.forEach(elem => {
          elem.style.borderColor = '';
          elem.style.borderWidth = '';
          elem.style.borderStyle = '';
        });
        currentGroup = [newElem];
      }

      // Update the group count element to display the current group count
      groupCountElem.textContent = `Current group count: ${currentGroup.length}`;

      // Check if the current group count equals the target group count and a pop-up has not been created
      if (currentGroup.length === targetGroupCount && popUpCreated === false) {
        // Add an overlay to prevent user interaction with draggable elements
        popUpCreated = true;
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        document.body.appendChild(overlay);

        // Create pop-up
        const popUp = document.createElement("div");
        popUp.className = "pop-up";
        const message = document.createElement("p");
        message.textContent = "You won!";
        const button = document.createElement("button");
        button.id = "audiohub";
        button.className = "button-arounder";
        button.textContent = "Go to the hub";

        // create an audio element and set  its source
        const audio = new Audio('static/audio/hub.mp3');

        // add event listeners to play and pause the audio on hover
        button.addEventListener('mouseover', () => {
          audio.play();
        });
        button.addEventListener('mouseout', () => {
          audio.pause();
        });

        button.onclick = () => {
          window.location.href = "http://127.0.0.1:4000/start";
        };
        popUp.appendChild(message);
        popUp.appendChild(button);
        document.body.appendChild(popUp);

        function playAudioHub() {
          var audio = document.getElementById("audiohub");
          audio.volume = 0.2
          audio.play();
        }

        function pauseAudioHub() {
          var audio = document.getElementById("audiohub");
          audio.pause();
          audio.currentTime = 0;
        }
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