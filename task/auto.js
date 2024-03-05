const db = require('../db');
const cron = require('node-cron');

function getday() {
    db.query("SELECT U.id, A.name, U.day_id FROM autoday U JOIN day A ON U.day_id = A.id", (err, results) => {
        if (err) {
            console.error('Error fetching day:', err);
        } else {
            if (results.length > 0) {
                const days = results.map((v, i) => v.day_id).join(',');
                const cronExpression = '0 11 15 * * ' + days;
                db.query("select Timer from  historyautodetect where id = 1", (err, results) => {
                    if (err) {
                        console.error('Error fetching day:', err);
                    } else {
                        if (results.length > 0) { 
                            const time = results[0].Timer.split(":").reverse().join(" ");
                            console.log(time);
                            const cronExpression = time + ' * * ' + days;
                            console.log(cronExpression);
                            return cron.schedule(cronExpression, () => {
                                autocheck();
                            });
                        } else {
                            console.log("cant be auto update auto")
                        }
                    }
                })
            } else {
                console.log("cant be auto update auto")
            }
        }
    });
}
const s= getday()
function autocheck() {
    console.log(123);
}
module.exports = s;