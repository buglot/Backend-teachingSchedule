const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/setting/subject_category", (req, res) => {
    db.query("select * from subject_category", (err, results) => {
        if (err) {
            res.status(500).json({msg:"Error database",err})
        } else {
            res.status(200).json(results)
        }
    });
});

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

module.exports = router;