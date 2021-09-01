const timeOption = document.getElementById('time-option');
timeOption.addEventListener('change', (event) => {
  const val = event.target.value;
  if (val < 0.01 || val > 60) {
    timeOption.value = 30;
  }
});

const saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', () => {
  chrome.storage.local.set({
    timer: 0,
    timeOption: timeOption.value,
    isRunning: false,
  });
});

chrome.storage.local.get(['timeOption'], (res) => {
  timeOption.value = res.timeOption;
});
