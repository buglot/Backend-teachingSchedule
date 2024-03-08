const express = require("express");
const router = express.Router();
const db = require("../db");
//ดึง subject_category
router.get("/setting/subject_category", (req, res) => {
    db.query("select * from subject_category", (err, results) => {
        if (err) {
            res.status(500).json({msg:"Error database",err})
        } else {
            res.status(200).json(results)
        }
    });
});
//ลบ
router.post("/setting/deletesubject_category", (req, res) => {
    const { subject_category_id } = req.body;
    db.query("select subject_category_id from subjects where subject_category_id=?", [subject_category_id], (err, results) => {
        if (err) {
            res.status(500).json({ msgerror: "Error database", err })
        } else {
            if (results.length > 0) {
                res.status(404).json({msgerror:"ลบไม่ได้ต้องลบวิชาที่มีการลบออกก่อน"})
            } else {
                res.status(200).json({msg:"ลบออกหมดแล้ว"})
            }
        }
    });
})
//บังคับลบ subject_category
router.delete("/setting/deleteforesubject_category/:id", (req, res) => {
    const { id } = req.params;
    db.query("select id,subject_category_id from subjects where subject_category_id=?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error database", err })
        } else {
            if (results.length > 0) {
                results.forEach((v, i) => {
                    db.query("DELETE FROM subjects WHERE (id = ?)", [v.id], (error1, results) => {
                        if (err) {
                            console.log("Error delete deleteforesubject_category",v.id)
                        }
                    })
                })
            } else {
                res.sendStatus(200)
            }
        }
    });
})

//ดึง focus_sub_cat
router.get("/setting/focus_sub_cat", (req, res) => {
    db.query("select f.id,s.name from focus_sub_cat f join subject_category s on s.id=f.subject_category_id", (err, results) => {
        if (err) {
            res.status(500).json({msg:"Error database",err})
        } else {
            res.status(200).json(results)
        }
    });
});
//ดึง status
router.get("/setting/status", (req, res) => {
    db.query("select * from status", (err, results) => {
        if (err) {
            res.status(500).json({msg:"Error database",err})
        } else {
            res.status(200).json(results)
        }
    });
});
//ดึง role
router.get("/setting/role", (req, res) => {
    db.query("select * from role", (err, results) => {
        if (err) {
            res.status(500).json({msg:"Error database",err})
        } else {
            res.status(200).json(results)
        }
    });
});

//ดึง category
router.get("/setting/category", (req, res) => {
    db.query("select * from category", (err, results) => {
        if (err) {
            res.status(500).json({msg:"Error database",err})
        } else {
            res.status(200).json(results)
        }
    });
});
//ดึง autoday
router.get("/setting/autoday", (req, res) => {
    db.query("select * from autoday", (err, results) => {
        if (err) {
            res.status(500).json({msg:"Error database",err})
        } else {
            res.status(200).json(results)
        }
    });
});
module.exports = router;