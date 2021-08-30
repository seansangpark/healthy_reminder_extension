let tasks = [];

const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', () => addTask());

chrome.storage.sync.get(['tasks'], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

// save tasks to chrome API
const saveTasks = () => {
  chrome.storage.sync.set({
    tasks,
  });
};

const renderTask = (taskNum) => {
  const taskRow = document.createElement('div');

  const text = document.createElement('input');
  text.type = 'text';
  text.placeholder = 'Enter a task...';
  text.value = tasks[taskNum];
  text.addEventListener('change', () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement('input');
  deleteBtn.type = 'button';
  deleteBtn.value = 'Delete';
  deleteBtn.addEventListener('click', () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById('task-container');
  taskContainer.appendChild(taskRow);
};

const addTask = () => {
  const taskNum = tasks.length;
  tasks.push('');
  renderTask(taskNum);
  saveTasks();
};

const deleteTask = (taskNum) => {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
};

const renderTasks = () => {
  const taskContainer = document.getElementById('task-container');
  taskContainer.textContent = '';
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
};
