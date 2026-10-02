import { state, sampleTasksData } from './taskData.js';
import { displayMessage, generateTaskId } from './taskUtils.js';
import { createTaskElement, updateTaskCounts } from './taskDisplay.js';

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const loadSamplesBtn = document.getElementById('loadSamplesBtn');
const taskList = document.getElementById('taskList');
const taskMessage = document.getElementById('taskMessage');
const totalCount = document.getElementById('totalCount');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');

function refreshCounts() {
    updateTaskCounts(taskList, totalCount, pendingCount, completedCount);
}

function addTask(taskText) {
    const trimmedText = taskText.trim();
    if (!trimmedText) {
        displayMessage(taskMessage, 'Task cannot be empty');
        return;
    }

    displayMessage(taskMessage, '');
    const taskId = generateTaskId(state);
    const taskItem = createTaskElement(trimmedText, taskId);

    taskList.appendChild(taskItem);
    taskInput.value = '';
    refreshCounts();
}

function toggleTaskComplete(taskItem) {
    taskItem.classList.toggle('completed');
    if (taskItem.classList.contains('completed')) {
        taskItem.dataset.state = 'completed';
    } else {
        taskItem.dataset.state = 'pending';
    }
    refreshCounts();
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
    refreshCounts();
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
        const taskId = generateTaskId(state);
        const taskItem = createTaskElement(sampleText, taskId);
        fragment.appendChild(taskItem);
    });

    taskList.appendChild(fragment);
    displayMessage(taskMessage, '');
    refreshCounts();
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

refreshCounts();