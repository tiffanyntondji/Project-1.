// Array to store tasks
const tasks = [];

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Event listener for form submission
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Extract form input values
  const title = document.getElementById('taskTitle').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const status = document.querySelector('input[name="taskStatus"]:checked').value;

  // Validate input
  if (!title) {
    alert('Please enter a task title.');
    return;
  }

  // Create a new task object
  const task = { title, priority, status };

  // Add task to the tasks array
  tasks.push(task);

  // Update the DOM with the new task
  addTaskToDOM(task, tasks.length - 1);

  // Reset the form fields
  taskForm.reset();
});

// Function to add a task to the DOM
function addTaskToDOM(task, index) {
  // Create a new list item
  const li = document.createElement('li');
  li.className = `list-group-item d-flex justify-content-between align-items-center priority-${task.priority}`;
  li.dataset.index = index; // Store the task index as a data attribute

  // Add task details to the list item
  li.innerHTML = `
    <span class="${task.status === 'completed' ? 'completed' : ''}">
      ${task.title} - <em>${task.priority} priority</em> - ${task.status}
    </span>
    <div class="task-buttons">
      <button class="btn btn-success btn-sm" onclick="markAsComplete(${index})">Mark as Complete</button>
      <button class="btn btn-danger btn-sm" onclick="removeTask(${index})">Remove</button>
    </div>
  `;

  // Append the new task to the task list
  taskList.appendChild(li);
}

// Function to mark a task as complete
function markAsComplete(index) {
  // Update the task's status in the tasks array
  const task = tasks[index];
  task.status = 'completed';

  // Update the task's display in the DOM
  const li = taskList.querySelector(`li[data-index="${index}"]`);
  const span = li.querySelector('span');
  span.classList.add('completed');
  span.textContent = `${task.title} - ${task.priority} priority - completed`;

  // Disable the "Mark as Complete" button
  const completeButton = li.querySelector('.btn-success');
  completeButton.disabled = true;
}

// Function to remove a task
function removeTask(index) {
  // Remove the task from the tasks array
  tasks.splice(index, 1);

  // Remove the task from the DOM
  const li = taskList.querySelector(`li[data-index="${index}"]`);
  li.remove();

  // Re-index remaining tasks in the DOM
  Array.from(taskList.children).forEach((child, newIndex) => {
    child.dataset.index = newIndex;
  });
  console.log('The form was submitted!');
}
