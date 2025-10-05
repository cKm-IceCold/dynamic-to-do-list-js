// ✅ Wait until the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // 🎯 Step 1: Select DOM elements
  const addButton = document.getElementById('add-task-btn'); // "Add Task" button
  const taskInput = document.getElementById('task-input');   // Input field
  const taskList = document.getElementById('task-list');     // Unordered list <ul>

  // ✨ Step 2: Define a function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim(); // Remove extra spaces

    // 🛑 If input is empty, show alert and stop
    if (taskText === "") {
      alert("Please enter a task before adding!");
      return;
    }

    // ✅ Step 3: Create a new <li> for the task
    const li = document.createElement('li');
    li.textContent = taskText; // Add the text entered by the user

    // 🗑️ Step 4: Create a "Remove" button for this task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';

    // Step 5: Add event to remove button
    removeBtn.onclick = function() {
      taskList.removeChild(li); // Removes the current task from the list
    };

    // 📦 Step 6: Append the remove button to the list item
    li.appendChild(removeBtn);

    // 📋 Step 7: Add the list item to the <ul>
    taskList.appendChild(li);

    // 🧹 Step 8: Clear the input box
    taskInput.value = "";
  }

  // ⚡ Step 9: Add click event to "Add Task" button
  addButton.addEventListener('click', addTask);

  // ⌨️ Step 10: Allow adding a task by pressing "Enter"
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask(); // Calls the addTask function when Enter is pressed
    }
  });

});
