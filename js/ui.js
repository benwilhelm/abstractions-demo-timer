import { Timer } from './timer.js';

const startButton = document.getElementById('btnStart');
const stopButton = document.getElementById('btnStop');
const resetButton = document.getElementById('btnReset');
const timeDisplay = document.getElementById('timeDisplay');

const timer = new Timer();

timer.onTick((timeElapsed) => {
  const m = Math.floor(timeElapsed / 60);
  const mm = m < 10 ? `0${m}` : m;

  const s = timeElapsed % 60;
  const ss = s < 10 ? `0${s}` : s;

  const displayTime = `${mm}:${ss}`;
  timeDisplay.innerHTML = displayTime;
});

timer.onStateChange((state) => {
  switch (state) {
    case 'running': {
      stopButton.removeAttribute('disabled');
      startButton.setAttribute('disabled', '');
      resetButton.setAttribute('disabled', '');
      break;
    }
    case 'stopped': {
      startButton.removeAttribute('disabled');
      resetButton.removeAttribute('disabled');
      stopButton.setAttribute('disabled', '');
      break;
    }
    default: {
      console.warn(`unknown state ${state}`);
    }
  }
});

startButton.addEventListener('click', () => {
  timer.start();
});

stopButton.addEventListener('click', () => {
  timer.stop();
});

resetButton.addEventListener('click', () => {
  timer.reset();
});
