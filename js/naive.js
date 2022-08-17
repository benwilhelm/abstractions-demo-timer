let timeElapsed = 0;
let interval = null;

const startButton = document.getElementById('btnStart');
const stopButton = document.getElementById('btnStop');
const resetButton = document.getElementById('btnReset');
const timeDisplay = document.getElementById('timeDisplay');

startButton.addEventListener('click', () => {
  if (interval) {
    return false;
  }

  interval = setInterval(() => {
    timeElapsed++;

    const m = Math.floor(timeElapsed / 60);
    const mm = m < 10 ? `0${m}` : m;

    const s = timeElapsed % 60;
    const ss = s < 10 ? `0${s}` : s;

    const displayTime = `${mm}:${ss}`;

    timeDisplay.innerHTML = displayTime;
  }, 1000);
  stopButton.removeAttribute('disabled');
  startButton.setAttribute('disabled', '');
  resetButton.setAttribute('disabled', '');
});

stopButton.addEventListener('click', () => {
  if (!interval) {
    return false;
  }
  clearInterval(interval);
  interval = null;
  startButton.removeAttribute('disabled');
  resetButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', '');
});

resetButton.addEventListener('click', () => {
  if (interval) {
    return false;
  }

  timeElapsed = 0;
  timeDisplay.innerHTML = '00:00';
});
