document.addEventListener('DOMContentLoaded', function () {
    // Collect planner elements from the page
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');
    const remainingTasks = document.getElementById('remainingTasks');
    const progressFill = document.getElementById('progressFill');
    const dateText = document.getElementById('dateText');

    const tasks = [
        { id: 1, text: 'Review COS106 lecture notes', done: false },
        { id: 2, text: 'Submit web project draft', done: true }
    ];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task) {
            const item = document.createElement('div');
            item.className = 'task-item' + (task.done ? ' done' : '');
            item.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button data-action="toggle" data-id="${task.id}">✓</button>
                    <button data-action="delete" data-id="${task.id}">✕</button>
                </div>
            `;
            taskList.appendChild(item);
        });
        updateSummary();
    }

    function updateSummary() {
        const total = tasks.length;
        const done = tasks.filter(function (task) { return task.done; }).length;
        const remaining = total - done;
        totalTasks.textContent = total;
        completedTasks.textContent = done;
        remainingTasks.textContent = remaining;
        const percent = total === 0 ? 0 : Math.round((done / total) * 100);
        progressFill.style.width = percent + '%';
        progressFill.setAttribute('aria-valuenow', String(percent));
    }

    function addTask() {
        const value = taskInput.value.trim();
        if (!value) {
            alert('Please enter a task before adding it.');
            return;
        }
        tasks.push({ id: Date.now(), text: value, done: false });
        taskInput.value = '';
        renderTasks();
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', function (event) {
        const button = event.target.closest('button');
        if (!button) return;
        const id = Number(button.getAttribute('data-id'));
        const action = button.getAttribute('data-action');

        if (action === 'toggle') {
            const task = tasks.find(function (item) { return item.id === id; });
            if (task) {
                task.done = !task.done;
            }
        }

        if (action === 'delete') {
            const index = tasks.findIndex(function (item) { return item.id === id; });
            if (index !== -1) {
                tasks.splice(index, 1);
            }
        }

        renderTasks();
    });

    const today = new Date();
    dateText.textContent = today.toDateString();
    renderTasks();
});
