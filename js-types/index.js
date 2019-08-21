/**
 * Types in JavaScript without TypeScript
 */

/**
 * Kinds of typing we can perform
 * - Type definitions
 * - Inline types
 * - Method types
 * - Types from third party libraries
 * - Type files
 */

/**
 * Configuration object which determines which levels of logs should
 * be output. If a log level is disabled it won't display, but may
 * still be tracked historically.
 * @typedef {Object<string, any>} FilterLevels
 * @property {boolean} LOG True when log messages should be output
 * @property {boolean} INFO True when info messages should be output
 * @property {boolean} DEBUG True when debug messages should be output
 * @property {boolean} WARN True when warn messages should be output
 * @property {boolean} ERROR True when error message should be output
 */

/**
 * Logger configuration options which can be optionally passed on
 * the creation of the logger.
 * @typedef {Object<string, any>} LoggerOptions
 * 
 * @property {boolean} trackHistory When true, all logs will be tracked
 * by timestamp in the history object.
 * 
 * @property {FilterLevels} filterLevels Nested configuration for controlling
 * what kinds of logs should be displayed
 */
 
/**
 * Historical log entry which tracks the time when the log occurred, the
 * message associated with it, and the payload of data attached.
 * @typedef {Object<string, any>} LogHistoryEntry
 * @property {Date} timestamp
 * @property {string=} message
 * @property {{ [x: string]: any }} [data]
 */

/**
 * @typedef {Object} LogPayload
 * @property {string} message
 * @property {any[]} data
 */

export class Logger {
  constructor(options) {
    /** @type {LoggerOptions} */
    const optionsDefaults = {
      trackHistories: false,
      filterLevels: {
        LOG: true,
        INFO: true,
        DEBUG: false,
        ERROR: true,
        WARN: true,
      }
    }

    /** @type {LoggerOptions} */
    this.loggerOptions = Object.assign({}, optionsDefaults, options)

    /** @type {LogHistoryEntry[]} */
    this.history = []
  }

  /**
   * @param {LogPayload} payload
   */
  _trackHistory(payload) {
    if (this.logOptions.trackHistory) {
      /** @type {LogHistoryEntry} */
      const historyEntry = {
        timestamp: Date.now(),
        message: payload.msg,
        data: payload.data
      }

      /**
       * We can even cast types
       * @type {string}
       */
      const otherProperty = /** @type {any} */(historyEntry).other

      this.history.push(historyEntry)
    }
  }

  /**
   * 
   * @param {string} msg 
   * @param  {...any} data 
   */
  log(msg, ...data) {
    this._trackHistory({ msg, data })

    if (this.logOptions.filterLevel.LOG) {
      console.log(...args)
    }
  }
}

const logger = new Logger()
logger.log()