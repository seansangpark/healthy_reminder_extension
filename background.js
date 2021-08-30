// chrome.alarms.create('reminderTimer', {
//   periodInMinutes: 1 / 60,
// })

// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === 'reminderTimer') {
//     chrome.storage.local.get(['timer', 'isRunning', 'timeOption', 'task'], (res) => {
//       if (res.isRunning) {
//         let timer = res.timer + 1;
//         let isRunning = true;
//         if (timer === 60 * res.timeOption) {
//           this.registration.showNotification ('Healthy Reminder', {
//             body: `Time to ${task}!`,
//             icon: 'icon.png',
//           });
//           timer = 0;
//           isRunning = false;
//         }
//         chrome.storage.local.set({
//           timer,
//           isRunning,
//         });
//       }
//     })
//   }
// })

// chrome.storage.local.get(['timer', 'isRunning', 'timeOption'])
