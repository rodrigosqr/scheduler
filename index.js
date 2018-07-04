/*
 * @Author: Cleverson Puche
 * @Date: 2017-08-16 09:14:44
 */

let Timer = Java.type('java.util.Timer')
let TimerTask = Java.type('java.util.TimerTask')

let Executors = Java.type('java.util.concurrent.Executors')
let LocalDateTime = Java.type('java.time.LocalDateTime')
let LocalTime = Java.type('java.time.LocalTime')
let ChronoUnit = Java.type('java.time.temporal.ChronoUnit')
let TimeUnit = Java.type('java.util.concurrent.TimeUnit')

let _dailyScheduler

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
function schedule(period, startImmediate, action) {
  var timer = new Timer()

  let taskClass = Java.extend(TimerTask, {
    run: function () {
      /* coverage ignore else */
      if (action && action.constructor.name.toLowerCase() === 'function') {
        action()
      }
    }
  })

  timer.schedule(new taskClass(), startImmediate ? 0 : period, period)

  return timer
}

/**
  * Agenda uma ação para ser executada em horários específicos todos os dias.
  * 
  * Será retornado um array com as tasks criadas.
  * As tasks possuem os métodos:
  * - cancel(Boolean force) - Ao passar true a task será interrompida caso esteja sendo executada no momento
  * - getDelay(String timeUnit) - String com a unidade de tempo que o delay deve ser calculado (DAYS|HOURS|MICROSECONDS|MILLISECONDS|MINUTES|NANOSECONDS|SECONDS)
  * 
  * @param {Function} action - Função a ser executada
  * @param {Array} times - Array com os horários em que a ação deve ser executada
 * @example
 * let tasks = scheduler.schedule(function() {
 *  print('Rodando task...')
 * }, ['09:30', '17:00'])
 * @returns {Object} Retorna um array com as tasks criadas para cada horário
 * 
*/
function dailySchedule(fn, times) {
  /* coverage ignore else */
  if (!_dailyScheduler) {
    _dailyScheduler = Executors.newScheduledThreadPool(2)
  }

  let nowTime = LocalTime.now().withSecond(0).withNano(0)
  let now = LocalDateTime.now().withSecond(0).withNano(0);

  return times.map(function (time) {
    let timeArr = time.split(':')
    return LocalTime.of(timeArr[0], timeArr[1])
  }).map(function (time) {
    let firstExecution = now.withHour(time.getHour()).withMinute(time.getMinute())

    /* coverage ignore else */
    if (time.compareTo(nowTime) <= 0) {
      firstExecution = firstExecution.plusDays(1)
    }

    let initDelay = LocalDateTime.now().until(firstExecution, ChronoUnit.SECONDS)
    return _dailyScheduler.scheduleAtFixedRate(fn, initDelay, TimeUnit.DAYS.toSeconds(1), TimeUnit.SECONDS)
  }).map(function (task) {
    return {
      cancel: function cancelTask(force) {
        return task.cancel(arguments.length == 0 ? false : force)
      },
      getDelay: function (unit) {
        return task.getDelay(TimeUnit[unit || 'MILLISECONDS'])
      }
    }
  })
}


/**
 * @description
 * Bitcode para agendamento de execução de rotinas
 */
exports = {
  schedule: schedule,
  dailySchedule: dailySchedule
}