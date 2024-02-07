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

// READ user from db (database email ชื่อนามสกุล  role)
router.get('/admin/user', (req, res) => {
  //const sql = 'SELECT * FROM user';
  const sql = 'SELECT user.name AS name, user.email AS mail, role.name AS role  FROM user JOIN role ON user.role_id = role.id;'
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// READ single user from db (database email ชื่อนามสกุล  role รายบุคคล)
router.get('/admin/user/single/:id', (req, res) => {
  const idUser = req.params.id;
  if (!idUser || isNaN(idUser)) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }
  const sql = 'SELECT user.name AS name, user.email AS mail, role.name AS role FROM user JOIN role ON user.role_id = role.id WHERE user.id = ?';
  db.query(sql, [parseInt(idUser)], (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
});

// DELETE user (ลบ database ตาม id)
router.delete('/admin/delete_user/:id', (req, res) => {
  const idToDelete = req.params.id;

  if (!idToDelete) {
    return res.status(400).json({ error: 'ID parameter is required' });
  }

  const sql = 'DELETE FROM user WHERE id = ?';

  db.query(sql, [idToDelete], (err, results) => {
      if (err) {
          console.error('Error executing DELETE statement:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: 'Data deleted successfully' });
      } else {
          res.status(404).json({ error: 'Data not found' });
      }
  });
});

// education department
router.get('/edu/subjectReg', (req, res) => {

  const sql = 'SELECT * FROM subjectsregister , subject_category ' ;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// schedule ( ทุกรายวิชาที่ลงทะเบียนแล้ว)
router.get('/teacher/schedule',(req, res)=>{
  
  const sql = `
    SELECT 
      subjectsregister.id AS id,
      //รหัสวิชา 
      user.name AS NAME, 
      subjects.name AS SUBJECT, 
      subjectsregister.st, 
      subjectsregister.et,
      day.name AS DAY , 
      subjectsregister.sec, 
      status.name AS status, 
      subjectsregister.N_people, 
      subjectsregister.branch, 
      category.name 
    FROM 
      subjectsregister 
      JOIN USER ON subjectsregister.user_id = user.id 
      JOIN subjects ON subjectsregister.SubjectsOpen_id = subjects.id
      JOIN day ON subjectsregister.day_id = day.id 
      JOIN status ON subjectsregister.status_id = STATUS.id 
      JOIN category ON subjectsregister.category_id = category.id`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  })
});

// read schedule single user (อาจารย์ คนเดียว ทุกรายวิชาที่ลงทะเบียน)
router.get('/teacher/schedule/single/:id', (req, res) => {
  const idUser = req.params.id;
  if (!idUser || isNaN(idUser)) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }
  const sql = `
  SELECT
  subjectsregister.id AS id,
  subjects.idsubject AS idSubject,
  subjects.name AS SUBJECT,
  subjects.credit ,
  category.name AS category ,
  user.name AS NAME,
  subjectsregister.sec,
  status.name AS STATUS,
  subjectsregister.N_people,
  subjectsregister.branch,
  day.name AS DAY,
  subjectsregister.st,
  subjectsregister.et
FROM
  subjectsregister
JOIN USER ON subjectsregister.user_id = user.id
JOIN subjects ON subjectsregister.SubjectsOpen_id = subjects.id
JOIN DAY ON subjectsregister.day_id = day.id
JOIN STATUS ON subjectsregister.status_id = status.id
JOIN category ON subjectsregister.category_id = category.id
WHERE
  STATUS.id = ? `;

  db.query(sql, [parseInt(idUser)], (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'schedule not found' });
    }
    res.json(results);
  });
});

module.exports = router;