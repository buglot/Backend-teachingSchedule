const db = require('../db');
const cron = require('node-cron');
const format = require('date-format');
function getday() {
    autocheck2();
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
                            const cronExpression = time + ' * * ' + days;
                            return cron.schedule(cronExpression, () => {
                                autocheck2();
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
    return null;
}
const s = getday()
function logReport(msg) {
    const datetime = format.asString('yyyy-MM-dd hh:mm:ss', new Date());
    db.query("select statuslog from historyautodetect", (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (results[0].statuslog === 1) {
                db.query("INSERT INTO log_auto_detect ( `datetime`,`msg`) VALUES (?, ?)", [datetime, msg], (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return;
                    }
                });
            }

        }
    })

}
function updatesql(id, status) {
    db.query("UPDATE subjectsRegister SET `status_id` = ? WHERE (`id` = ?)", [status, id], (err, results) => {
        if (err) {
            logReport("Error Server databases!");
        } else {
        }
    });
}

async function autocheck2() {//version 2
    try {
        const results = await new Promise((resolve, reject) => {
            db.query("select distinct d.id from day d,subjectsRegister sr where d.id=sr.day_id", (err, results) => {
                if (err) {
                    reject("Error Server databases!");
                } else {
                    resolve(results);
                }
            });
        });

        if (results.length > 0) {
            for (const vval of results) {
                const day_results = await new Promise((resolve, reject) => {
                    db.query("select sr.User_id,sr.id,sr.st,sr.et,sr.status_id,sr.day_id,s.name,c.name as subject_category from subjectsRegister sr join subjects s on s.id = sr.Subjects_id join subject_category c on c.id = s.subject_category_id where EXISTS (select * from focus_sub_cat where s.subject_category_id = subject_category_id) and sr.day_id=? and (sr.status_id=1 or sr.status_id=2)", [vval.id], (err, day_results) => {
                        if (err) {
                            reject("Error Server databases!");
                        } else {
                            resolve(day_results);
                        }
                    });
                });

                if (day_results.length > 0) {
                    for (const v of day_results) {
                        if (v.status_id !== 1) {
                            for (const val of day_results) {
                                if (checkOverlap(v, val) && v.id !== val.id) {
                                    await updatesql(v.id, 3);
                                    await logReport(`เปลี่ยนวิชา ${v.id} จาก user_id ${v.User_id} เป็น สถานะ ไม่ผ่าน`)
                                }
                            }
                        }
                    }
                }
            }
            const pendingResults = await new Promise((resolve, reject) => {
                db.query("select * from subjectsRegister sr where status_id=2", (err, results) => {
                    if (err) {
                        reject("Error Server databases!");
                    } else {
                        resolve(results);
                    }
                });
            });

            for (const v of pendingResults) {
                await updatesql(v.id, 1);
                await logReport(`เปลี่ยนวิชา ${v.id} จาก user_id ${v.User_id} เป็น สถานะผ่าน`)
            }
            await new Promise((resolve, reject) => {
                GenSec();
                resolve("ok")
            }) 
            logReport("ได้ทำตรวจสอบแล้ว");
        } else {
            logReport("ไม่มีวิชาให้ตรวจสอบ");
        }
    } catch (error) {
        logReport("error");
    }
}
function checkOverlap(v, val) {
    const currentDate = new Date().toISOString().slice(0, 10); // วันปัจจุบัน
    const vSt = new Date(`${currentDate}T${v.st}`).getTime();
    const vEt = new Date(`${currentDate}T${v.et}`).getTime();
    const valSt = new Date(`${currentDate}T${val.st}`).getTime();
    const valEt = new Date(`${currentDate}T${val.et}`).getTime();
    if (valSt >= vSt && valSt < vEt) {
        return true; // มีการทับซ้อน
    }

    if (valEt > vSt && valEt <= vEt) {
        return true; // มีการทับซ้อน
    }

    // ตรวจสอบว่าช่วงเวลาที่ต้องการตรวจสอบครอบคลุมช่วงเวลาหลักหรือไม่
    if (valSt <= vSt && valEt >= vEt) {
        return true; // มีการทับซ้อน
    }

    return false; // ไม่มีการทับซ้อน
}

function GenSec() {
    db.query("SELECT distinct sr.subjects_id as id FROM subjectsRegister sr", (err, results) => {
        if (err) {
            console.error(err);
            logReport("Failed to add sec numbers.");
            return;
        }

        results.forEach((subject) => {
            db.query("SELECT sr.id,sr.category_id FROM subjectsRegister sr JOIN subjects s ON sr.subjects_id = s.id WHERE sr.subjects_id =? AND sr.status_id = 1", [subject.id], (err2, results2) => {
                if (err2) {
                    console.error(err2);
                    logReport("Failed to add sec numbers.");
                    return;
                }

                let l = 800;
                let p = 830;

                results2.forEach((entry) => {
                    let secNumber;
                    if (entry.category_id === 1) {
                        secNumber = l++;
                    } else if (entry.category_id === 2) {
                        secNumber = p++;
                    } else if (entry.category_id === 3) {
                        secNumber = `${l}/${p++}`;
                        l++;
                    }

                    db.query("UPDATE subjectsRegister SET `sec` = ? WHERE `id` = ?", [secNumber, entry.id], (err3, results3) => {
                        if (err3) {
                            console.error(err3);
                            logReport("Failed to add sec numbers.");
                        }
                    });
                });
            });
        });
    });
}


module.exports = s;