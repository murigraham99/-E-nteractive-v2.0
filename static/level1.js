const btn = document.getElementById('create-elem-btn');
const container = document.getElementById('container');
const draggableElem = document.getElementById('draggable-elem');

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

  newElem.addEventListener('mousedown', function(e) {
    const x = e.clientX - newElem.offsetLeft;
    const y = e.clientY - newElem.offsetTop;

    function mousemoveHandler(e) {
      newElem.style.left = (e.clientX - x) + 'px';
      newElem.style.top = (e.clientY - y) + 'px';
    }

    function mouseupHandler() {
      document.removeEventListener('mousemove', mousemoveHandler);
      document.removeEventListener('mouseup', mouseupHandler);
    }

    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
  });
});
