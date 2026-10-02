let taskIdCounter = 1;

const sampleTasksData = [
    'Review DOM selectors',
    'Practice createElement',
    'Study event delegation'
];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const loadSamplesBtn = document.getElementById('loadSamplesBtn');
const taskList = document.getElementById('taskList');
const taskMessage = document.getElementById('taskMessage');
const totalCount = document.getElementById('totalCount');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');

function displayMessage(messageElement, text) {
    messageElement.textContent = text;
}

function generateTaskId() {
    const id = `task-${taskIdCounter}`;
    taskIdCounter += 1;
    return id;
}

function createTaskElement(taskText, taskId) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.taskId = taskId;
    li.dataset.state = 'pending';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText; 

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = 'Complete';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);

    return li;
}

function updateTaskCounts() {
    const tasks = Array.from(taskList.querySelectorAll('.task-item'));
    const total = tasks.length;
    
    const completedTasks = tasks.filter(({ dataset: { state } }) => state === 'completed');
    const completed = completedTasks.length;
    const pending = total - completed;

    totalCount.textContent = total;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}

function addTask(taskText) {
    const trimmedText = taskText.trim();
    if (!trimmedText) {
        displayMessage(taskMessage, 'Task cannot be empty');
        return;
    }

    displayMessage(taskMessage, '');
    const taskId = generateTaskId();
    const taskItem = createTaskElement(trimmedText, taskId);

    taskList.appendChild(taskItem);
    taskInput.value = '';
    updateTaskCounts();
}

function toggleTaskComplete(taskItem) {
    taskItem.classList.toggle('completed');
    if (taskItem.classList.contains('completed')) {
        taskItem.dataset.state = 'completed';
    } else {
        taskItem.dataset.state = 'pending';
    }
    updateTaskCounts();
}

function beginTaskEdit(taskItem) {
    const span = taskItem.querySelector('.task-text');
    const editBtn = taskItem.querySelector('.edit-btn');

    if (!span) return;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = span.textContent;

    span.replaceWith(input);
    input.focus();
    editBtn.textContent = 'Save';
}

function saveTaskEdit(taskItem) {
    const input = taskItem.querySelector('.edit-input');
    const editBtn = taskItem.querySelector('.edit-btn');

    if (!input) return;

    const trimmedText = input.value.trim();
    if (!trimmedText) {
        displayMessage(taskMessage, 'Task cannot be empty');
        return;
    }

    displayMessage(taskMessage, '');
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = trimmedText; 

    input.replaceWith(span);
    editBtn.textContent = 'Edit';
}

function removeTask(taskItem) {
    taskItem.remove();
    updateTaskCounts();
}

function handleTaskListClick(event) {
    const target = event.target;
    const taskItem = target.closest('.task-item');

    if (!taskItem) return;

    if (target.matches('.complete-btn')) {
        toggleTaskComplete(taskItem);
    } else if (target.matches('.edit-btn')) {
        if (target.textContent === 'Edit') {
            beginTaskEdit(taskItem);
        } else if (target.textContent === 'Save') {
            saveTaskEdit(taskItem);
        }
    } else if (target.matches('.remove-btn')) {
        removeTask(taskItem);
    }
}

function loadSampleTasks() {
    const fragment = document.createDocumentFragment();

    sampleTasksData.forEach(sampleText => {
        const taskId = generateTaskId();
        const taskItem = createTaskElement(sampleText, taskId);
        fragment.appendChild(taskItem);
    });

    taskList.appendChild(fragment);
    displayMessage(taskMessage, '');
    updateTaskCounts();
}

addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(taskInput.value);
    }
});

loadSamplesBtn.addEventListener('click', () => {
    loadSampleTasks();
});

taskList.addEventListener('click', handleTaskListClick);

updateTaskCounts();