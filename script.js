let pendingTasks = [];
let completedTasks = [];

// Function to add a task
function addTask() { 
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        dateAdded: new Date().toLocaleString(),
        isCompleted: false
    };

    pendingTasks.push(task);
    taskInput.value = '';

    renderTasks();
}

// Function to render tasks
function renderTasks() {
    const pendingTasksUl = document.getElementById('pending-tasks');
    const completedTasksUl = document.getElementById('completed-tasks');

    pendingTasksUl.innerHTML = '';
    completedTasksUl.innerHTML = '';

    pendingTasks.forEach(task => {
        const li = createTaskElement(task);
        pendingTasksUl.appendChild(li);
    });

    completedTasks.forEach(task => {
        const li = createTaskElement(task);
        completedTasksUl.appendChild(li);
    });
}

// Function to create a task list item
function createTaskElement(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${task.isCompleted ? 'completed' : ''}">${task.text}</span>
        <div class="actions">
            <button class="complete" onclick="markComplete(${task.id})">${task.isCompleted ? 'Undo' : 'Complete'}</button>
            <button class="edit" onclick="editTask(${task.id})">Edit</button>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;

    return li;
}

// Function to mark a task as complete
function markComplete(id) {
    const task = pendingTasks.find(t => t.id === id) || completedTasks.find(t => t.id === id);

    task.isCompleted = !task.isCompleted;
    if (task.isCompleted) {
        completedTasks.push(task);
        pendingTasks = pendingTasks.filter(t => t.id !== id);
    } else {
        pendingTasks.push(task);
        completedTasks = completedTasks.filter(t => t.id !== id);
    }

    renderTasks();
}

// Function to edit a task
function editTask(id) {
    const task = pendingTasks.find(t => t.id === id);
    const newText = prompt('Edit your task:', task.text);
    if (newText !== null) {
        task.text = newText;
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(id) {
    pendingTasks = pendingTasks.filter(t => t.id !== id);
    completedTasks = completedTasks.filter(t => t.id !== id);
    renderTasks();
}
