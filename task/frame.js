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
  });

  router.post('/user',(req,res)=>{
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
  })
});





module.exports = router;