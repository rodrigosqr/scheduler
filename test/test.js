let majesty = require('majesty')
var coverage = require('coverage');

let LocalTime = Java.type('java.time.LocalTime')

const MIN_COVERAGE = 100;

function exec(describe, it, beforeEach, afterEach, expect, should, assert) {

    describe("Testes do scheduler", function () {
        let scheduler = require('../index.js');

        describe("API [schedule]", function () {
            let timerInstance;

            it('Deve ser possível agendar uma task com immediate', function () {
                scheduler.schedule(2000, true, function () {
                    console.log('Rodando Scheduler com immediate...');
                });

                expect(timerInstance).to.be.defined;
            })

            it('Deve ser possível agendar uma task sem immediate', function () {
                timerInstance = scheduler.schedule(2000, false, function () {
                    console.log('Rodando Scheduler sem immediate...');
                });

                expect(timerInstance).to.be.defined;
            })

            it('Deve ser possível cancelar uma task', function () {
                timerInstance.cancel();
            })
        })

        describe("API [dailySchedule]", function () {
            let tasks;
            let now = LocalTime.now().withSecond(0).withNano(0);

            it('Deve ser possível agendar tasks', function () {
                let timeBeforeNow = now.plusHours(-1);
                let timeAfterNow = now.plusHours(2);

                tasks = scheduler.dailySchedule(function () {
                    console.log('Rodando task.');
                }, [timeAfterNow.toString(), timeBeforeNow.toString()]);

                expect(tasks.length).to.equals(2);
            })

            it('Deve retornar corretamente o delay até a próxima execução', function () {
                expect(tasks[0].getDelay('HOURS')).to.equals(1);
                expect(tasks[0].getDelay()).to.be.gt(1);
            })

            it('Tasks agendadas para horários passados devem ser executadas apenas no dia seguinte', function () {
                expect(tasks[1].getDelay('HOURS')).to.equals(22);
            })

            it('Deve conseguir cancelar uma task', function () {
                expect(tasks[0].cancel()).to.equals(true);
                expect(tasks[1].cancel(true)).to.equals(true);
            })
        })
    })
}


coverage.init();

let failuresCount = majesty.run(exec).failure.length

let coverageAverage = coverage.report();

if (failuresCount == 0) {
    if (coverageAverage < MIN_COVERAGE) {
        console.log('Cobertura menor que o permitido: ', coverageAverage, '[min: ' + MIN_COVERAGE + ']')
        
        exit(1);
    }
} 

exit(failuresCount);