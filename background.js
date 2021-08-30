chrome.alarms.create('reminderTimer', {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'reminderTimer') {
  }
});

chrome.storage.local.get(['timer', 'isRunning']);
