document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Save all tasks currently displayed in the list to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            // The textContent includes the task text plus 'Remove' button text,
            // so we remove the button text from the li textContent:
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove task from Local Storage array
    function removeTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const filteredTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    }

    // Add a new task to the list and optionally save it to Local Storage
    function addTask(taskText, save = true) {
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        // Use a text node to keep task text separate from button text
        const textNode = document.createTextNode(taskText);
        li.appendChild(textNode);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn'; // use className instead of classList.add
        removeButton.onclick = () => {
            taskList.removeChild(li);
            removeTask(taskText);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        taskInput.value = '';

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Event listeners for adding tasks
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});