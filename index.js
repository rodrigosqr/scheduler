/*
 * @Author: Cleverson Puche
 * @Date: 2017-08-16 09:14:44
 */

/**
 * @description
 * Bitcode para agendamento de execução de rotinas
 */
exports = {
  /**
    * Agenda uma ação para ser executada de tempos em tempos
    * @param {Int} period - Período de exeução (em milisegundos)
    * @param {Boolean} startImmediate - Indica se a exeução deve começar imediatamente
    * @param {Function} action - Função a ser executada
   * @example
   * var scheduler = require('scheduler')
   * var timerInstance = scheduler.schedule(2000, true, function() {
   *  print('Rodando Scheduler...')
   * })
   * @returns {Object} Retorna uma instancia de Timer para que seja possível, por exemplo, invocar o método cancel()
  */
  schedule: function (period, startImmediate, action) {
    var Timer = Java.type('java.util.Timer')
    var TimerTask = Java.type('java.util.TimerTask')
    var timer = new Timer()

    timer.schedule(new TimerTask() {
      run: function () {
        if (action && action.constructor.name.toLowerCase() === 'function') {
          action()
        }
      }
    }, startImmediate ? 0 : period, period)

    return timer
  }
}
