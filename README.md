Scheduler
===============

Scheduler é um *bitcode* para agendamento de exeução de rotinas para [Thrust](https://gitlab.com/thrustjs/thrust-seed).

# Instalação

Posicionado em um app [ThrustJS](https://github.com/thrustjs/thrust), no seu terminal:

```bash
thrust install scheduler
```

## Tutorial
```javascript
var scheduler = require('scheduler')
var timerInstance = scheduler.schedule(2000, true, function() {
  print('Rodando Scheduler...')
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
  function schedule(period, startImmediate, action)
```

## Parâmetros de configuração
Não há.
