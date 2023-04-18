// Empty list to start out
todos = [];

// Add a todo to the bottom of the list
function addTodoBottom(item) {
  todos.push(item);
}

// Delete a todo
function deleteTodo(item) {
  todos.splice(item, 1); // Remove 1 item at index
}

// Move a todo up
function moveUp(item) {
  if(item > 0) {
    let temp = todos[item];
    todos[item] = todos[item - 1];
    todos[item - 1] = temp;
    renderPage();
  } else {
    return;
  }
}

// Move a todo down
function moveDown(item) {
  if(item < todos.length - 1) {
    let temp = todos[item];
    todos[item] = todos[item + 1];
    todos[item + 1] = temp;
    renderPage();
  } else {
    return;
  }
}

// Render the page
function renderPage() {
  // Render the page
  let html = '';
  let mainDiv = document.querySelector('#todos');
  mainDiv.innerHTML = '';
  for(let i = 0; i < todos.length; i++) {
    html += `
      <div class="todo">
        <div class="todo-li">
          ${todos[i]}
        </div>
        <button class="move-up" data-index="${i}">Move Up</button>
        <button class="move-down" data-index="${i}">Move Down</button>
        <button class="delete" data-index="${i}">Delete</button>
      </div>
    `;
  }
  mainDiv.innerHTML = html;
}

// Handle all events
function handleEvents() {
  // Mark a todo as done
  document.querySelector('main').addEventListener('click', function(event) { 

    // Delete a todo
    let deleteButton = event.target.closest('.delete');
    if(deleteButton) {
      let index = deleteButton.dataset.index;
      deleteTodo(Number(index));
      renderPage();
    }

    // Move a todo up
    let moveUpButton = event.target.closest('.move-up');
    if(moveUpButton) {
      let index = moveUpButton.dataset.index;
      moveUp(Number(index));
    }

    // Move a todo down
    let moveDownButton = event.target.closest('.move-down');
    if(moveDownButton) {
      let index = moveDownButton.dataset.index;
      moveDown(Number(index));
    }
  });

  // Add a todo to the bottom of the list
  let addTodoInput = document.querySelector('#todo-form');
  addTodoInput.addEventListener('submit', function(event) {
    event.preventDefault();
    let todoInput = document.querySelector('#todo-input');
    addTodoBottom(todoInput.value);
    let mainDiv = document.querySelector('#todos');
    mainDiv.innerHTML = '';
    addTodoInput.reset();
    renderPage();
  });
}

addTodoBottom('Buy milk');
addTodoBottom('Buy eggs');
addTodoBottom('Buy bread');
addTodoBottom('Buy cheese');

renderPage();
handleEvents();