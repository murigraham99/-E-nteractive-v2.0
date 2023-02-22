const draggableItems = document.querySelectorAll('.draggable-item');
const gridItems = document.querySelectorAll('.grid-item');
let count = 0; // Initialize a count variable to 0

draggableItems.forEach(draggableItem => {
	draggableItem.addEventListener('dragstart', () => {
		draggableItem.classList.add('dragging');
	});

	draggableItem.addEventListener('dragend', () => {
		draggableItem.classList.remove('dragging');
	});
});

gridItems.forEach(gridItem => {
	gridItem.addEventListener('dragover', e => {
		e.preventDefault();
	});

	gridItem.addEventListener('drop', e => {
		const draggedItem = document.querySelector('.dragging');
		const gridItemTag = gridItem.getAttribute('data-tag'); // Get the tag attribute of the grid item
		const draggedItemTag = draggedItem.getAttribute('data-tag'); // Get the tag attribute of the dragged item

		if (gridItemTag === draggedItemTag) {
			gridItem.appendChild(draggedItem);
			count++; // Increment the count variable by 1
			print(count);
		} else {
			alert('The item cannot be dropped here.'); // Display an error message
		}
	});
});
