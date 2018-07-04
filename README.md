Scheduler
[![Build Status](https://travis-ci.org/thrust-bitcodes/scheduler.svg?branch=master)](https://travis-ci.org/thrust-bitcodes/scheduler) [![GitHub release](https://img.shields.io/github/release/thrust-bitcodes/scheduler.svg)](https://github.com/thrust-bitcodes/scheduler/releases)
===============

Scheduler é um *bitcode* para agendamento de exeução de rotinas para [Thrust](https://github.com/thrustjs/thrust).

# Instalação

Posicionado em um app [ThrustJS](https://github.com/thrustjs/thrust), no seu terminal:

```bash
thrust install scheduler
```

## Tutorial
```javascript
var scheduler = require('scheduler')
var timerInstance = scheduler.schedule(2000, true, function() {
  console.log('Rodando Scheduler...')
})

timerInstance.cancel()

scheduler.schedule(function() {
  console.log('Rodando task...')
}, ['09:30', '17:00']).forEach(function(task) {
  console.log('MS:', task.getDelay(), 'SC:', task.getDelay('SECONDS'))
  task.cancel()
})
```

## API

```javascript
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
  * @returns {Object} Retorna uma instância de Timer para que seja possível, por exemplo, invocar o método cancel()
*/
schedule(period, startImmediate, action)

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
dailySchedule(fn, times)
```

## Parâmetros de configuração
Não há.
