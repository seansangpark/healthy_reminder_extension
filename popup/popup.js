let tasks = [];
let isTimerRunning = false;

const updateTime = () => {
  chrome.storage.local.get(['timer', 'timeOption', 'isRunning'], (res) => {
    const time = document.getElementById('time');
    const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(
      2,
      '0'
    );
    let seconds = '00';
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, '0');
    }
    time.textContent = `${minutes}: ${seconds}`;
    startTimerBtn.textContent = res.isRunning
      ? 'Pause Reminder'
      : 'Start Reminder';
  });
};

updateTime;
setInterval(updateTime, 1000);

const startTimerBtn = document.getElementById('start-timer-btn');
startTimerBtn.addEventListener('click', () => {
  isTimerRunning = true;
  chrome.storage.local.get(['isRunning'], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerBtn.textContent = !res.isRunning
          ? 'Pause Reminder'
          : 'Start Reminder';
      }
    );
  });
});

const resetTimerBtn = document.getElementById('reset-timer-btn');
resetTimerBtn.addEventListener('click', () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = 'Start Reminder';
    }
  );
});

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
  taskRow.classList.add('input-group');
  taskRow.classList.add('mb-3');

  const taskRowRadio = document.createElement('div');
  taskRowRadio.classList.add('input-group-text');

  const radioInput = document.createElement('input');
  radioInput.classList.add('form-check-input');
  radioInput.classList.add('mt-0');
  radioInput.type = 'checkbox';

  taskRowRadio.appendChild(radioInput);

  const text = document.createElement('input');
  text.type = 'text';
  text.placeholder = 'Enter a task...';
  text.value = tasks[taskNum];
  text.classList.add('form-control');

  text.addEventListener('change', () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement('input');
  deleteBtn.classList.add('btn');
  deleteBtn.classList.add('btn-outline-info');
  deleteBtn.type = 'button';
  deleteBtn.value = 'x';
  deleteBtn.addEventListener('click', () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(taskRowRadio);
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
