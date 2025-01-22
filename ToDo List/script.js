// Selectors
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
window.addEventListener('load', loadTasks);

// Event listeners
addBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskActions);

// Functions
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = { text: taskText, completed: false };
    saveTaskToLocalStorage(task);
    renderTask(task);
    taskInput.value = '';
}

function renderTask(task) {
    const li = document.createElement('li');
    li.classList.add('task-item');

    const span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = task.text;
    if (task.completed) {
        span.classList.add('completed');
    }
    li.appendChild(span);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('task-buttons');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    buttonsDiv.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(buttonsDiv);
    taskList.appendChild(li);
}

function handleTaskActions(e) {
    const target = e.target;
    const taskItem = target.closest('.task-item');
    const taskText = taskItem.querySelector('.task-text');

    if (target.classList.contains('delete-btn')) {
        removeTaskFromLocalStorage(taskText.textContent);
        taskItem.remove();
    } else if (target.classList.contains('edit-btn')) {
        const newText = prompt('Edit your task:', taskText.textContent);
        if (newText) {
            updateTaskInLocalStorage(taskText.textContent, newText);
            taskText.textContent = newText;
        }
    } else if (target.classList.contains('task-text')) {
        taskText.classList.toggle('completed');
        toggleTaskCompletionInLocalStorage(taskText.textContent);
    }
}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(renderTask);
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(oldText, newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.text === oldText);
    if (task) {
        task.text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function toggleTaskCompletionInLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.text === taskText);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
