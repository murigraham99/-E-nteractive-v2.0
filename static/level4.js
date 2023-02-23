const draggableItems = document.querySelectorAll('.draggable-item1, .draggable-item2, .draggable-item3, .draggable-item4, .draggable-item5, .draggable-item6, .draggable-item7, .draggable-item8');
const gridItems = document.querySelectorAll('.grid-item1, .grid-item2, .grid-item3, .grid-item4');
let count = 0;

draggableItems.forEach(draggableItem => {
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
      console.log(count);
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
      console.log(count);
    } else {
      alert('The item cannot be dropped here.');
    }
  });
});