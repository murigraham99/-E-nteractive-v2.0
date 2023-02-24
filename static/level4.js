//const draggableItems = document.querySelectorAll('.draggable-item1, .draggable-item2, .draggable-item3, .draggable-item4, .draggable-item5, .draggable-item6, .draggable-item7, .draggable-item8');
const gridItems = document.querySelectorAll('.grid-item1, .grid-item2, .grid-item3, .grid-item4');
let count = -1;

const draggableItems = [  { tag: 'glass', img: '/static/images/bin.png' },  { tag: 'glass', img: '/static/images/bin.png' },  { tag: 'plastic', img: '/static/images/plastic1.png' },  { tag: 'plastic', img: '/static/images/plastic2.png' },  { tag: 'paper', img: '/static/images/paper1.png' },  { tag: 'paper', img: '/static/images/paper2.png' },  { tag: 'metal', img: '/static/images/metal1.png' },  { tag: 'metal', img: '/static/images/metal2.png' }];

// Fisher-Yates shuffle algorithm to randomize the order of the draggableItems array
for (let i = draggableItems.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [draggableItems[i], draggableItems[j]] = [draggableItems[j], draggableItems[i]];
}

const draggableContainer = document.querySelector('.draggable-container');

for (let i = 0; i < draggableItems.length; i++) {
  const draggableItem = document.createElement('div');
  draggableItem.classList.add(`draggable-item${i + 1}`);
  draggableItem.dataset.tag = draggableItems[i].tag;
  const img = document.createElement('img');
  img.src = draggableItems[i].img;
  draggableItem.appendChild(img);
  draggableContainer.appendChild(draggableItem);
}


document.body.style.backgroundImage = 'url(/static/images/backgrounds/Level4_bg1.png)';

function setBackground() {
  const images = ['/static/images/backgrounds/Level4_bg2.png', '/static/images/backgrounds/Level4_bg3.png', '/static/images/backgrounds/Level4_bg4.png', '/static/images/backgrounds/Level4_bg5.png', '/static/images/backgrounds/Level4_bg6.png', '/static/images/backgrounds/Level4_bg7.png', '/static/images/backgrounds/Level4_bg8.png', '/static/images/backgrounds/Level4_bg9.png' ] ;
  const imageIndex = count % images.length;
  const imageUrl = `url(${images[imageIndex]})`;
  document.body.style.backgroundImage = imageUrl;
}

draggableContainer.childNodes.forEach(draggableItem => {
  draggableItem.addEventListener('dragstart', () => {
    draggableItem.classList.add('dragging');
  });

  draggableItem.addEventListener('dragend', () => {
    draggableItem.classList.remove('dragging');
  });

  draggableItem.addEventListener('dragover', e => {
    e.preventDefault();
  });

  draggableItem.addEventListener('drop', e => {
    e.preventDefault();
    const draggedItem = document.querySelector('.dragging');
    const gridItem = e.target.closest('.grid-item');
    const gridItemTag = gridItem.getAttribute('data-tag');
    const draggedItemTag = draggedItem.getAttribute('data-tag');

    if (gridItemTag === draggedItemTag) {
      gridItem.appendChild(draggedItem);
      count++;
      setBackground();
      console.log(count);
      draggedItem.remove(); // Remove the dragged item from its parent node
    } else {
      alert('The item cannot be dropped here.');
    }
  });
});

gridItems.forEach(gridItem => {
  gridItem.addEventListener('dragenter', e => {
    e.preventDefault();
    gridItem.classList.add('dragging-over');
  });

  gridItem.addEventListener('dragover', e => {
    e.preventDefault();
    gridItem.classList.add('dragging-over');
  });

  gridItem.addEventListener('dragleave', () => {
    gridItem.classList.remove('dragging-over');
  });

  gridItem.addEventListener('drop', e => {
    e.preventDefault();
    const draggedItem = document.querySelector('.dragging');
    const gridItemTag = gridItem.getAttribute('data-tag');
    const draggedItemTag = draggedItem.getAttribute('data-tag');
    if (gridItemTag === draggedItemTag) {
      gridItem.appendChild(draggedItem);
      count++;
      setBackground();
      console.log(count);
      draggedItem.remove(); // Remove the dragged item from its parent node
    } else {
      alert('The item cannot be dropped here.');
    }
  });
});
