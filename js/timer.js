export class Timer {
  #timeElapsed = 0;
  #interval = null;

  #tickHandlers = [];
  #emitTick() {
    this.#tickHandlers.forEach((handler) => handler(this.#timeElapsed));
  }

  #stateChangeHandlers = [];
  #emitState() {
    this.#stateChangeHandlers.forEach((handler) => handler(this.currentState));
  }

  get currentState() {
    return this.#interval ? 'running' : 'stopped';
  }

  start() {
    if (this.currentState === 'running') {
      return false;
    }

    this.#interval = setInterval(() => {
      this.#timeElapsed++;
      this.#emitTick();
    }, 1000);
    this.#emitState();
    return true;
  }

  stop() {
    if (!this.currentState === 'stopped') {
      return false;
    }
    clearInterval(this.#interval);
    this.#interval = null;
    this.#emitState();
    return true;
  }

  reset() {
    if (this.currentState === 'running') {
      return false;
    }
    this.#timeElapsed = 0;
    this.#emitTick();
    this.#emitState();
    return true;
  }

  onTick(cb) {
    this.#tickHandlers.push(cb);
  }

  onStateChange(cb) {
    this.#stateChangeHandlers.push(cb);
  }
}
