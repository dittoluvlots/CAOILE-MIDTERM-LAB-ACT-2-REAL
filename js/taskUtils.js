export function displayMessage(messageElement, text) {
    const messageNode = messageElement;
    messageNode.textContent = text;
}

export function generateTaskId(stateObj) {
    const id = `task-${stateObj.taskIdCounter}`;
    stateObj.taskIdCounter += 1;
    return id;
}