// script.js
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks array from localStorage (or start empty)
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  // Helper: save the tasks array to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Helper: create an <li> element for a task and wire up its remove button
  function createTaskElement(taskText) {
    const li = document.createElement('li');

    // Put task text in the <li>
    li.textContent = taskText;

    // Create remove button and add required class via classList.add
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // When remove is clicked: remove item from DOM and from tasks array, then save
    removeBtn.addEventListener('click', function () {
      taskList.removeChild(li);
      const index = tasks.indexOf(taskText); // remove first matching entry
      if (index > -1) {
        tasks.splice(index, 1);
        saveTasks();
      }
    });

    // Append remove button to li and return it
    li.appendChild(removeBtn);
    return li;
  }

  // Add task function: can be called with a text param (used by loadTasks)
  // If save === true, it will also update localStorage (default)
  function addTask(taskTextParam, save = true) {
    // If no param provided, read from input field
    const taskText = (typeof taskTextParam === 'string')
      ? taskTextParam.trim()
      : taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task before adding!');
      return;
    }

    // Create DOM element and append
    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';

    // Save to tasks array and localStorage if requested
    if (save) {
      tasks.push(taskText);
      saveTasks();
    }
  }

  // Load tasks from localStorage into the DOM (called on page load)
  function loadTasks() {
    // tasks is already the parsed array from localStorage
    tasks.forEach(function (t) {
      const li = createTaskElement(t);
      taskList.appendChild(li);
    });
  }

  // Event listeners
  addButton.addEventListener('click', function () {
    addTask();
  });

  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Initialize: load saved tasks into the page
  loadTasks();
});
