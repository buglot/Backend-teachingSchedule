const express = require("express");
const router = express.Router();
const db = require("../db");
const format = require('date-format');
function reportlog(msg,id){
    db.query("select statuslog from historyautodetect where id=?",[id],(err,results)=>{
        if(err){
            console.log("reportlog",err);
        }else{
            if(results[0].statuslog===1){
                const datetime = format.asString('yyyy-MM-dd hh:mm:ss', new Date());
                let table;
                if(id===2){
                    table="log_tablechange";
                }else if(id===3){
                    table="log_login";
                }else{
                    table=undefined;
                }
                const sql=`INSERT INTO ${table} (msg,datetime) VALUES (?, ?)`
                db.query(sql,[msg,datetime],(err,results)=>{
                    if(err){
                        console.log("save report error",err);
                    }
                })
            }
        }
    })
}

//ดึง subject_category
router.get("/setting/subject_category", (req, res) => {
    db.query("select * from subject_category", (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error database", err })
        } else {
            res.status(200).json(results)
        }
    });
});
//ลบ
router.delete("/setting/deleteall", (req, res) => {
    const { id } = req.query;
    const { table } = req.query;
    const {email} = req.query;
    let sql = `DELETE FROM ${table} WHERE (id = ?)`;
    if (table === 'role' && id ==='2') {
        return res.status(404).json({msgerrorDB:"ไม่สามารถลบ admin หรือ id 2 ได้"})
    }
    db.query(sql, [id], (error1, results) => {
        if (error1) {
            console.log("Error delete deleteforesubject_category", id, error1)
            if (error1.errno === 1451) {
                if (table === 'subject_category') {
                    return res.status(404).json({ msgerror: "ลบไม่ได้ต้องลบวิชาที่มีหมวดนี้การลบออกก่อน และ หมวดวิชาทับเวลากันลบออกก่อน", msgerrorsubmit: "ยืนยันที่ลบวิชาที่เกี่ยวข้องออก" })
                } else if (table === 'role') {
                    return res.status(404).json({ msgerror: "กรุณาแก้ไขผู้ใช้ที่มี role นี้ออกก่อนลบ", msgerrorsubmit: "รับทราบ" })
                } else if (table === 'category'){
                    return res.status(404).json({ msgerror: `กรุณาลบวิชาที่ลงทะเบียนเกี่ยวหมวดเรียนนี้ก่อนลบ`, msgerrorsubmit: "รับทราบ" })
                }else if (table === 'day'){
                    return res.status(404).json({ msgerror: `กรุณาลบวิชาที่ลงทะเบียนเกี่ยวหมวดวันที่เรียนนี้ก่อนลบ`, msgerrorsubmit: "รับทราบ" })
                }
            } else {
                return res.status(500).json({ msgerrorDB: "Error database", error1 })
            }
        } else {
            reportlog(`${email} ทำการลบ table ${table} ที่ ${id}`,2)
            res.status(200).json({ msg: "ลบออกแล้ว" })
            
        }
    })
})
//บังคับลบ subject_category
router.delete("/setting/deleteforesubject_category/:id/:email", (req, res) => {
    const { id } = req.params;
    const {email} = req.params;
    db.query("SELECT id, subject_category_id FROM subjects WHERE subject_category_id=?", [id], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Error database", err });
        }

        if (results.length > 0) {
            results.forEach((v, i) => {
                db.query("DELETE FROM subjectsRegister WHERE subjects_id = ?", [v.id], (err) => {
                    if (err) {
                        console.log("Error deleting from subjectsRegister:", v.id);
                    } else {
                        db.query("DELETE FROM subjects WHERE id = ?", [v.id], (err) => {
                            if (err) {
                                console.log("Error deleting from subjects:", v.id);
                            }
                        });
                    }
                });


            });
        }
        db.query("DELETE FROM focus_sub_cat WHERE subject_category_id = ?", [id], (err) => {
            if (err) {
                console.log("Error deleting from focus_sub_cat:", id);
                return res.status(500).json({ msgerrorDB: "ลบจากหมวดวิชาทับเวลากันออกไม่ได้" });
            }

            db.query("DELETE FROM subject_category WHERE id = ?", [id], (err) => {
                if (err) {
                    console.log("Error deleting from subject_category:", id);
                    return res.status(500).json({ msgerrorDB: "ลบออกไม่ได้" });
                }
                reportlog(`${email} ทำบังคับการลบ table subject_category ที่ id ${id}`,2)
                res.status(200).json({ msg: "ลบออกแล้ว" });

            });
        });
    });
});


//ดึง focus_sub_cat
router.get("/setting/focus_sub_cat", (req, res) => {
    db.query("select f.id,s.name from focus_sub_cat f join subject_category s on s.id=f.subject_category_id", (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error database", err })
        } else {
            res.status(200).json(results)
        }
    });
});
//ดึง status
router.get("/setting/status", (req, res) => {
    db.query("select * from status", (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error database", err })
        } else {
            res.status(200).json(results)
        }
    });
});
//ดึง role
router.get("/setting/role", (req, res) => {
    db.query("select * from role", (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error database", err })
        } else {
            res.status(200).json(results)
        }
    });
});

//ดึง category
router.get("/setting/category", (req, res) => {
    db.query("select * from category", (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error database", err })
        } else {
            res.status(200).json(results)
        }
    });
});
//ดึง autoday
router.get("/setting/autoday", (req, res) => {
    db.query("select a.id, day.name from autoday a join day on day.id=a.day_id order by day.id", (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error database", err })
        } else {
            res.status(200).json(results)
        }
    });
});

//rename
router.post("/setting/rename", (req, res) => {
    const { newname, table, id,email } = req.body;
    const sql = `UPDATE ${table} SET name = ? WHERE (id = ?)`
    db.query(sql, [newname, id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ msgerror: "Error database", err })
        } else {
            reportlog(`${email}  เปลี่ยนชื่อที่ id=${id} เป็น ${newname} ใน table ${table}`,2)
            res.status(200).json({ msg: "แก้ไขชื่อแล้ว" })
        }
    });
});

// add insert
router.post("/setting/insert", (req, res) => {
    const { name, table, id,email } = req.body;
    const sql = `INSERT INTO ${table} (id, name) VALUES (?, ?)`
    db.query(sql, [id, name], (err, results) => {
        if (err) {
            console.log(err);
            if (err.errno === 1062) {
                res.status(500).json({ msgerror: "id ซ้ำ เพิ่มไม่ได้", err })
            } else {
                res.status(500).json({ msgerror: "Error database", err })
            }
        } else {
            reportlog(`${email} เพิ่มใน "${name}" ใน table ${table}ที่ id=${id}`,2)
            res.status(200).json({ msg: "เพื่มเข้าระบบสำเร็จแล้ว" })
        }
    });
});
router.get("/setting/subject_categorywithout", (req, res) => {
    db.query("select * from subject_category s where not Exists (select * from focus_sub_cat where subject_category_id=s.id) order by id", (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error database", err })
        } else {
            if (results.length > 0) {
                res.status(200).json(results)
           } else {
               res.status(500).json({msg:"ไม่มีข้อมูลให้เพิ่ม ข้อมูลหมดแล้ว"})
           }
        }
    });
});
router.get("/setting/day", (req, res) => {
    db.query("select * from day order by id", (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error database", err })
        } else {
            res.status(200).json(results)
        }
    });
});
router.get("/setting/daywithout", (req, res) => {
    db.query("select * from day d where not Exists (select * from autoday where day_id=d.id) order by d.id", (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error database", err })
        } else {
            if (results.length > 0) {
                 res.status(200).json(results)
            } else {
                res.status(500).json({msg:"ไม่มีข้อมูลให้เพิ่มหมดแล้ว"})
            }
           
        }
    });
});
router.post("/setting/insertid", (req, res) => {
    const {table, id,col,email } = req.body;
    const sql = `INSERT INTO ${table} (${col}) VALUES (?)`
    db.query(sql, [id], (err, resuts) => {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: "Error database" ,err})
        } else {
            reportlog(`${email} เพิ่มใน table ${table} มีค่า id=${id}`,2)
            res.status(200).json({msg:"เพื่มเข้าระบบสำเร็จแล้ว"})
        }
    })
})

router.get("/setting/timeauto",(req,res)=>{
    db.query("Select Timer from historyautodetect where id=1",(err,results)=>{
        if(err){
            res.status(500).json({msg:"Error server data! calling admin to fix",err})
        }else{
            res.status(200).json(results[0])
        }
    })
})

router.post("/setting/timeautoChange",(req,res)=>{
    const {timer,email}  =req.body;
    db.query("update historyautodetect set Timer = ? where id=1",[timer],(err,results)=>{
        if(err){
            res.status(500).json({msg:"Error Server database! calling admin to fix",err})
        }else{
            reportlog(`${email} แก้เวลาตรวจสอบ เป็น ${timer}`,2)
            res.status(200).json({msg:"ได้ทำการอัปเดทเวลาที่จะตรวจสอบเรียบร้อยแล้ว"})
        }
    })
})
router.get("/setting/logopen/:id/",(req,res)=>{
    const {id} = req.params;
    db.query("Select statuslog from historyautodetect where id=?",[id],(err,results)=>{
        if(err){
            res.status(500).json({msg:"Error server data! calling admin to fix",err})
        }else{
            res.status(200).json(results[0])
        }
    })
})
router.post("/setting/setlogopen",(req,res)=>{
    const {id,value,email} = req.body;
    if(id===2){
        reportlog(`${email} ${value===true?"เปิดบันทึก":"ยกเลิกบันทึก"} log setting table database`,2)
    }
    db.query("update historyautodetect set statuslog=? where id=?",[value,id],(err,results)=>{
        if(err){
            res.status(500).json({msg:"Error server data! calling admin to fix",err})
        }else{
            if(id!==2){
                reportlog(`${email} ${value===true?"เปิดบันทึก":"ยกเลิกบันทึก"} log id=${id}`,2)
            }
            res.status(200).json({msg:`ระบบได้${value===true?"เปิดบันทึก":"ยกเลิกบันทึก"}`})
        }
    })
})

router.get("/setting/tablesettingdb", (req, res) => {
    const { sd, ed,table } = req.query;
    sql =`select * from ${table} where datetime>=? and datetime <=?`
    db.query(sql,[sd,ed+" 23:59:59"], (err, results) => {
        if(err){
            res.status(500).json({msg:"Error server data! calling admin to fix",err})
        } else {
            if (results.length > 0) {
                res.status(200).json(results)
            } else {
                res.status(404).json({msg:"ไม่มีข้อมูล"})
            }
            
        }
    })
})
module.exports = router;