const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
//ตัวอย่าง
//เขียนเลย

router.get('/user',(req,res)=>{
  const sql = 'select user.id,user.email,user.name,user.role_id,role.name as rolename from user,role where user.role_id = role.id;'
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      res.json({ message: results });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  })
});

router.post('/user1',(req,res)=>{
  const email = req.body.email
  const name = req.body.name
  const role_id = req.body.id
  const sql ='INSERT INTO user (email,name,role_id) VALUES (?,?,?)'
  db.query(sql,[email,name,role_id],(err,result)=>{
    if (err) {
      return res.status(400).send("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
    } else {
      return res.status(200).send("ค่าถูกเพิ่มเข้าสู่ฐานข้อมูล");
        
    }
  })
});

//หน้ารายวิชาที่เปิดสอนdsadsadsa

router.get('/opensubject',(req,res)=>{
  const sql = 'select subjectsopen.id,idsubject,subject_category.name as category,subjects.name as subject_name,years,subjects.subject_category_id from subjects,subject_category,subjectsopen where subjectsopen.id = subjects.id and subject_category.id =  subjects_id'
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      res.json({ message: results });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  })
});

//บันทึกไฟล์ลงสักที่ ทำข้อมูลลง database table ไฟล์ เก็บ id เวลา ชื่อไฟล์ ที่อยู่ไฟล์ ชนิต

router.post('/savefiledate',(req,res)=>{
  const date = res.body
  const filename = res.body
  const link = res.body
  const type = res.body
  const years = res.body
  const sql ='INSERT INTO user (date,filename,link,type,years) VALUES (?,?,?,?,?)'
  db.query(sql,[date,filename,link,type,years],(err,result)=>{
    if (err) {
      return res.status(400).send("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
    } else {
      return res.status(200).send("ค่าถูกเพิ่มเข้าสู่ฐานข้อมูล");
        
    }
  })

});

//  ดึงข้อมูลจาก database table ไฟล์ แสดง เวลา  ชื่อไฟล์   ที่อยู่ไฟล์สำหรับกดดาวน์โหลด
// ข้อมูลยังไม่ชัดเจน
router.get('/file',(req,res)=>{
  const sql ='select * from file'
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      res.json({ message: results });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  })
});


module.exports = router;