const express = require('express');
const router = express.Router();
const db = require('../db');
//ตัวอย่าง
router.get('/login', (req, res) => {
    const sql = 'SELECT * FROM table1';
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
    });
  });

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
  const sql = 'select subjects.id,idsubject,subject_category.name as category,subjects.name as subject_name,years,subjects.subject_category_id from subjects,subject_category where subjects.IsOpen= 1'
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

// เปลี่ยนแปลงค่า database table วิชาที่ลงทะเบียน  เปลี่ยนแปลง เวลา และ สถานนะ รอประมวลผล
router.post('/ubdatesubjectsRegister',(req,res)=>{
  const {id} = req.body; 
  const st = req.body;
  const et = req.body;
  const status_id = req.body; 
  const sql = 'UPDATE subjectsRegister SET (st,et,status_id) VALUES (?,?,?) where id=?'
  db.query(sql, [st, et, status_id, id], (err, result) => { 
    if (err) {
      return res.status(500).send("Error updating subject register");
    } else {
      return res.status(200).send("Subject register updated successfully"); 
    }
  })
});

//ตรวจสอบจาก database table วิชาที่ลงทะเบียน คัดกรอง สถานะผ่าน และ เวลาของคนที่แก้ไข

router.get('/statusRegistered',(req,res)=>{
  const sql = 'SELECT st,et,day_id,day.name,status_id,status.name,category_id from subjectsRegister,day,status,user where subjectsRegister.User_id = user.id and day.id = day_id and status_id = status.id'
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      db.query('SELECT st,et,day_id,day.name,status_id,status.id,category_id from  subjectsRegister,day,status,user where status_id = 3 and category_id = 1 and subjectsRegister.User_id' ,(err,re)=>{
        //สำหรับเช็ควิชาที่ไม่ผ่าน
        res.json({ message: results,m:re });
      })
      
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  })
});



module.exports = router;