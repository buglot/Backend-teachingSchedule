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
  const sql = `
  select subjects.id,idsubject,
  subject_category.name as subject_category,
  subjects.name,subjects.credit,
  years,subjects.subject_category_id 
  from subjects,subject_category 
  where subjects.IsOpen= 1 and subject_category.id = subjects.subject_category_id`
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ msgerr: "Error Server Databases! Please calling admin to fix" });
    } else {
      if (results.length > 0)
        res.status(200).json({ results });
      else
        res.status(200).json({ msg: "ไม่มีวิชาที่เปิดสอน" });
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
  const {day_id} = req.body;
  const {st} = req.body;
  const {et} = req.body;
  const {status_id} = req.body; 
  const sql = 'UPDATE subjectsRegister SET (day_id,st,et,status_id) VALUES (?,?,?,?) where id=?'
  db.query(sql, [day_id,st, et, status_id, id], (err, result) => { 
    if (err) {
      return res.status(500).send("Error updating subject register");
    } else {
      return res.status(200).send("Subject register updated successfully"); 
    }
  })
});

//ตรวจสอบจาก database table วิชาที่ลงทะเบียน คัดกรอง สถานะผ่าน และ เวลาของคนที่แก้ไข


router.get('/statusRegisteredpro1/:userid',(req,res)=>{
const {userid} = req.params;

  const sql = `SELECT st,et,day_id,day.name AS day_name,status_id,status.name AS status_name,category_id,subjects.name from subjects,subjectsRegister,day,status,user where subjects.id  = subjectsRegister.Subjects_id and user.id = ${userid} and subjectsRegister.User_id = user.id and day.id = day_id and status_id = status.id`
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      // ส่งข้อมูลผ่านไปที่ไคลเอนต์ก่อนหน้าการเรียกใช้งาน res.json() ใหม่
      res.json({ message: results });
      
      // แก้ SQL query ด้านล่าง
      db.query('SELECT subjectsRegister.st, subjectsRegister.et, subjectsRegister.day_id, day.name AS day_name, user.name AS user_name, status.name AS status_name, subjectsRegister.category_id, subjects.name FROM subjectsRegister INNER JOIN day ON subjectsRegister.day_id = day.id INNER JOIN status ON subjectsRegister.status_id = status.id INNER JOIN user ON subjectsRegister.User_id = user.id INNER JOIN subjects ON subjects.id = subjectsRegister.Subjects_id WHERE subjectsRegister.status_id = 3 AND (subjectsRegister.category_id = 1 OR subjectsRegister.category_id = 2);', (err, re) => {
        if (err) {
          console.error('Error executing SELECT statement:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        // ส่งข้อมูลผ่านไปที่ไคลเอนต์
        res.json({ message: results, m: re });
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  })
});



//ตรวจสอบจาก database table วิชาที่ลงทะเบียน คัดกรอง สถานะผ่าน และ เวลาของคนที่แก้ไข ฉบับของจริง
router.get('/statusRegistered/:userid', (req, res) => {
  const { userid } = req.params;
  const sql = `
    SELECT GROUP_CONCAT(subjectsRegister.st) AS st_values,
    subjects.name AS SUBJECT,
    subjectsRegister.et,
    subjectsRegister.day_id,
    day.name AS day,
    user.name AS NAME,
    status.name AS status_name,
    subjectsRegister.category_id 
    FROM subjects,subjectsRegister INNER JOIN day ON subjectsRegister.day_id = day.id 
    INNER JOIN status ON subjectsRegister.status_id = status.id 
    INNER JOIN user ON subjectsRegister.User_id = user.id 
    WHERE subjects.id = Subjects_id AND 
    subjectsRegister.status_id = 3 AND 
    subjectsRegister.category_id = 1 OR 
    subjectsRegister.category_id = 3 AND 
    (subjectsRegister.st,subjectsRegister.et,subjectsRegister.day_id) 
    IN (SELECT st,et,day_id FROM subjectsRegister WHERE User_id = ${userid}) 
    GROUP BY subjectsRegister.et, 
    subjectsRegister.day_id,
    day.name,user.name,
    status.name,
    subjectsRegister.category_id`;
               
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      res.json({ message: results });
    } else {
      res.status(401).json({ error: 'No data found for the provided user ID' });
    }
  });
});

router.get('/statusRegister/:userid',(req,res)=>{
  const { userid } = req.params;
  const sql = `SELECT subjects.name AS SUBJECT,
  subjectsRegister.id,
  subjectsRegister.st,
  subjectsRegister.et,
  subjectsRegister.day_id,
  day.name AS day,
  user.name AS NAME,
  status.name AS status_name,
  status.id AS status_id,
  subjectsRegister.category_id 
  from subjects,subjectsRegister,day,user,status
  WHERE subjects.id = Subjects_id and day_id = day.id and User_id = user.id and status_id = status.id and User_id = ${userid}`
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      res.json({ message: results });
    } else {
      res.status(401).json({ error: 'No data found for the provided user ID' });
    }
  })
});

//รับ ชื่อแล้วค้นหาคำ โดย เอาชื่อ มา
router.get('/searchregister/:search',(req,res)=>{
  const { search } = req.params;
  const sql = 'SELECT distinct S.idsubject, S.name FROM subjects S WHERE S.idsubject LIKE ? OR S.name LIKE ? and isOpen=1';
  const sql1 = 'SELECT id, name AS username FROM user WHERE name LIKE ?';
  db.query(sql, [`%${search}%`, `%${search}%`], (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  
    const data = results;
  
    db.query(sql1, [`%${search}%`], (err, result) => {
      if (err) {
        console.error('Error executing SELECT statement:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (result.length > 0) {
        data.push(result[0]);
      }
  
      if (data.length === 0) {
        res.status(401).json({ error: 'No data found for the provided search term' });
      } else {
        res.status(200).json({ message: data });
      }
    });
  });
});


router.get('/eu/allRegister',(req,res)=>{
  const sql = `SELECT subjectsRegister.id ,User_id ,credit,st ,et ,day_id ,sec ,status_id ,N_people ,branch ,category_id ,Subjects_id,subjects.name as SUBJECTNAME,category.name as CATEGORYNAME,day.name as DAYNAME,status.name as STATUSNAME,user.name as USERNAME,idsubject,years FROM user,status,day,subjectsRegister,subjects,category where subjectsRegister.subjects_id = subjects.id and subjectsRegister.category_id = category.id and subjectsRegister.day_id=day.id and subjectsRegister.status_id = status.id and subjectsRegister.User_id = user.id;`
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

router.post('/eu/ubdatestatusregister',(req,res)=>{
  const {id} = req.body; 
  const {status_id} = req.body;
  const sql = 'UPDATE subjectsRegister SET (status_id) VALUES (?) where id=?'
  db.query(sql, [st, et, status_id, id], (err, result) => { 
    if (err) {
      return res.status(500).send("Error updating subject register");
    } else {
      return res.status(200).send("Subject register updated successfully"); 
    }
  })
});

router.get('/all/status',(req,res)=>{
  const sql = 'select id,name from status'
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

//doneeeeeeeeeeeeeeeeeeeeeeeeee
//szzzzzzzzzz

module.exports = router;