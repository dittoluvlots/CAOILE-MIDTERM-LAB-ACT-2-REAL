export function createTaskElement(taskText, taskId) {
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

export function updateTaskCounts(taskList, totalCountElem, pendingCountElem, completedCountElem) {
    const tasks = Array.from(taskList.querySelectorAll('.task-item'));
    const total = tasks.length;
    
    const completedTasks = tasks.filter(({ dataset: { state } }) => state === 'completed');
    const completed = completedTasks.length;
    const pending = total - completed;

    totalCountElem.textContent = total;
    pendingCountElem.textContent = pending;
    completedCountElem.textContent = completed;
}