const express = require("express");
const router = express.Router();
const db = require("../db");

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
router.delete("/setting/deletesubject_category/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM subject_category WHERE (id = ?)", [id], (error1, results) => {
        if (error1) {
            console.log("Error delete deleteforesubject_category", id, error1)
            if (error1.errno === 1451) {
                return res.status(404).json({ msgerror: "ลบไม่ได้ต้องลบวิชาที่มีหมวดนี้การลบออกก่อน และ หมวดวิชาทับเวลากันลบออกก่อน", msgerrorsubmit: "ยืนยันที่ลบวิชาที่เกี่ยวข้องออก" })
            } else {
                return res.status(500).json({ msgerrorDB: "Error database", err })
            }
        } else {
            res.status(200).json({ msg: "ลบออกแล้ว" })
        }
    })
})
//บังคับลบ subject_category
router.delete("/setting/deleteforesubject_category/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT id, subject_category_id FROM subjects WHERE subject_category_id=?", [id], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Error database", err });
        }
        
        if (results.length > 0) {
            results.forEach((v, i) => {
                db.query("DELETE FROM subjectsRegister WHERE subjects_id = ?", [v.id], (err) => {
                    if (err) {
                        console.log("Error deleting from subjectsRegister:", v.id);
                    }else{
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
    const { newname, table, id } = req.body;
    const sql = `UPDATE ${table} SET name = ? WHERE (id = ?)`
    db.query(sql, [newname, id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ msgerror: "Error database", err })
        } else {
            res.status(200).json({ msg: "แก้ไขชื่อแล้ว" })
        }
    });
});

module.exports = router;