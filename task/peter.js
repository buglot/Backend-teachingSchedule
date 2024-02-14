const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
//ตัวอย่าง

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files'); // Save files to the 'files' directory
  },
  filename: function (req, file, cb) {
    const fileName = `${req.body.name}_${req.body.year}_${Date.now()}_${file.originalname}`;
    cb(null, fileName); // Concatenate name, year, and original filename
  }
});

const upload = multer({ storage: storage });
router.post("/uploadfile",upload.single('file'),(req,res)=>{
  res.status(200).json({msg:"บันทึกไฟล์ สำเร็จ"})
});

router.post('/admin/System' ,(req,res) =>{
    const {systemstatus,S_date,E_date,S_time,E_time} =  req.body;
    if(systemstatus || systemstatus===0){
      if(S_date && E_date && S_time && E_time){
        db.query("update timesystem set status=?,S_date=?,E_date=?,S_time=?,E_time=? where id=1",[systemstatus,S_date,E_date,S_time,E_time],(err,results)=>{
          if(err){
            res.status(500).json({msgerror:"Database Error :"+err})
            
          }else{
            res.status(200).json({msg:"System is "+systemstatus+" วันเริ่ม"+S_date+" เวลา"+S_time+" วันสุดท้าย"+E_date+ " เวลา"+ E_time})
         
          }
        })
        return;
      }else{
        db.query("update timesystem set status=? where id=1", [systemstatus], (err, results) => {
          if (err) {
            res.status(404).json({ msgerror: "Database Error: " + err });
          } else {
            res.status(200).json({ msg: "System is " + systemstatus?"เปิด":"ปิด"});
          }
        });
        return;
      }
    }
    res.status(404).json({msgerror:"you not set system status"})
})

router.get("/admin/SystemGet",(req,res)=>{
  db.query("select * from timesystem",(err,results)=>{
    if(err){
      res.status(500).json({msgerror:"Database Error:"+err})
      return;
    }else{
      res.status(200).json(results);
      return;
    }
  })
})

router.get("/education/noneRegisterSubject",(req,res)=>{
  db.query("select S.id,S.idsubject,S.name,S.credit,Sc.name as 'category name' from subjects S join subject_category Sc on S.subject_category_id=Sc.id where not exists (SELECT 1 FROM subjectsRegister Sr WHERE Sr.Subjects_id = S.id) and S.isopen=1"
  ,(err,results)=>{
    if(err){
      res.status(500).json({msgerror:"Database Error:"+err})
      return;
    }else{
      res.status(200).json(results);
      return;
    }
  })
})

module.exports = router;