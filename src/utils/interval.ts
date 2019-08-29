import { requestAnimationFrame, cancelAnimationFrame } from '../helpers/feature';

/**
 * @class Interval
 * @util
 */
class Interval {
  timer: null;
  func: Function;
  delay: number;
  stopped: boolean;
  _then: number | null;
  _callback: () => void;

  static create(func: any, delay: number) {
    return new Interval(func, delay);
  }

  constructor(func: Function, delay: number) {
    /**
     * Animation frame request id.
     *
     * @type {Number}
     */
    this.timer = null;
    /**
     * Function to invoke repeatedly.
     *
     * @type {Function}
     */
    this.func = func;
    /**
     * Number of milliseconds that function should wait before next call.
     */
    this.delay = parseDelay(delay);
    /**
     * Flag which indicates if interval object was stopped.
     *
     * @type {Boolean}
     * @default true
     */
    this.stopped = true;
    /**
     * Interval time (in milliseconds) of the last callback call.
     *
     * @private
     * @type {Number}
     */
    this._then = null;
    /**
     * Bounded function `func`.
     *
     * @private
     * @type {Function}
     */
    this._callback = () => this.__callback();
  }

  /**
   * Start loop.
   *
   * @returns {Interval}
   */
  start() {
    if (this.stopped) {
      this._then = Date.now();
      this.stopped = false;
      this.timer = requestAnimationFrame(this._callback);
    }

    return this;
  }

  /**
   * Stop looping.
   *
   * @returns {Interval}
   */
  stop() {
    if (!this.stopped) {
      this.stopped = true;
      cancelAnimationFrame(this.timer);
      this.timer = null;
    }

    return this;
  }

  /**
   * Loop callback, fired on every animation frame.
   *
   * @private
   */
  __callback() {
    this.timer = requestAnimationFrame(this._callback);

    if (this.delay) {
      const now = Date.now();
      const elapsed = now - this._then!;

      if (elapsed > this.delay) {
        this._then = now - (elapsed % this.delay);
        this.func();
      }
    } else {
      this.func();
    }
  }
}

export default Interval;

/**
 * Convert delay from string format to milliseconds.
 *
 * @param {Number|String} delay
 * @returns {Number}
 */
export function parseDelay(delay: any) {
  let result = delay;

  if (typeof result === 'string' && /fps$/.test(result)) {
    result = 1000 / parseInt(result.replace('fps', '') || '0', 10);
  }

  return result;
}
