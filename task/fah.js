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



// admin

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
// ดึง database email ชื่อนามสกุล  role โดยคัดจาก คนที่นั้นมีสิทธ์ มีการตำแหน่ง
router.get('/admin/user/single/:email', (req, res) => {
  const email = req.params.email;

  const sql = 'SELECT role.id, user.name AS name, user.email AS mail, role.name AS role FROM user JOIN role ON user.role_id = role.id WHERE user.email = ?';
  db.query(sql, [email], (err, results) => {
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
// ลบ database ตาม id
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

// ลบวิชาที่เปิดสอน แก้ isopen 0
router.put('/edu/delete_subjectsIsopen/:id', (req, res) => {
  const idSubject = req.params.id;

  if (!idSubject) {
    return res.status(400).json({ error: 'Subjects parameter is required' });
  }

  const sql = 'UPDATE subjects SET IsOpen = 0 WHERE id = ?';

  db.query(sql, [idSubject], (err, results) => {
      if (err) {
          console.error('Error executing UPDATE statement:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: 'Data update successfully' });
      } else {
          res.status(404).json({ error: 'Id not found' });
      }
  });
});


// subjectReg (ผลการลงทะเบียน ที่ผ่านแล้ว)
//ดึงข้อมูลจาก database table วิชาที่ลงทะเบียน [{},{}]
router.get('/edu/subjectReg', (req, res) => {

  const sql = `
SELECT
  subjectsRegister.id AS id,
  subjects.idsubject AS idSubject,
  subjects.name AS SUBJECT,
  subjects.credit ,
  category.name AS category ,
  subjectsRegister.sec,
  user.name AS NAME,
  subjectsRegister.N_people,
  subjectsRegister.branch,
  day.name AS day,
  subjectsRegister.st,
  subjectsRegister.et
FROM
subjectsRegister
JOIN user ON subjectsRegister.user_id = user.id
JOIN subjects ON subjectsRegister.Subjects_id = subjects.id
JOIN day ON subjectsRegister.day_id = day.id
JOIN status ON subjectsRegister.status_id = status.id
JOIN category ON subjectsRegister.category_id = category.id
WHERE
  status.id = 1` ;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});


// teacher 

// schedule page(ทุกรายวิชาที่ลงทะเบียน)
router.get('/teacher/schedule',(req, res)=>{
  const sql = `
  SELECT 
  subjects.idsubject AS idSubject, 
  subjects.name AS SUBJECT, 
  subjects.credit ,
  category.name AS Moo,
  user.name AS NAME,
  subjectsRegister.N_people,
  subjectsRegister.branch,
  day.name AS day , 
  subjectsRegister.st, 
  subjectsRegister.et,
  status.name AS status
FROM 
subjectsRegister 
  JOIN user ON subjectsRegister.user_id = user.id 
  JOIN subjects ON subjectsRegister.Subjects_id = subjects.id
  JOIN day ON subjectsRegister.day_id = day.id 
  JOIN category ON subjectsRegister.category_id = category.id
  JOIN status ON subjectsRegister.status_id = status.id`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  })
});

//schedule page(ทุกรายวิชาที่ลงทะเบียน แบบตารางสอนของ my schedule)
// ดึงข้อมูลจากdatabase table วิชาที่ลงทะเบียน คัดกรองด้วย iduser 
router.get('/teacher/schedule_single/:id', (req, res) => {
  const idUser = req.params.id;
  if (!idUser || isNaN(idUser)) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }
  const sql = `
  SELECT 
    subjects.idsubject AS idSubject, 
    subjects.name AS SUBJECT, 
    subjects.credit ,
    category.name AS Moo,
    user.name AS NAME,
    subjectsRegister.N_people,
    subjectsRegister.branch,
    day.name AS day , 
    subjectsRegister.st, 
    subjectsRegister.et,
    status.name AS status
  FROM 
  subjectsRegister 
  JOIN user ON subjectsRegister.user_id = user.id 
  JOIN subjects ON subjectsRegister.Subjects_id = subjects.id
  JOIN day ON subjectsRegister.day_id = day.id 
  JOIN category ON subjectsRegister.category_id = category.id
  JOIN status ON subjectsRegister.status_id = status.id
  WHERE
    user.id = ?`;

  db.query(sql, [parseInt(idUser)], (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      //db.query()
      return res.status(404).json({ error: 'schedule not found' });
    }
    res.json(results);
  });
});



//  teacher_subjectsregister (ลงทะเบียนรายวิชา)
// ดึงข้อมูลจากdatabase table วิชาที่ลงทะเบียน คัดกรองด้วย email อันเดียวกับตารางสอน 
router.get('/teacher/subjectsregister/:id', (req, res) => {
  const idUser = req.params.id;
  if (!idUser || isNaN(idUser)) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }
  const sql = `
  SELECT
    subjectsRegister.id AS id,
    subjects.name AS SUBJECT,
    day.name AS day,
    subjectsRegister.st,
    subjectsRegister.et,
    status.name AS status
  FROM
  subjectsRegister
  JOIN user ON subjectsRegister.User_id = user.id
  JOIN subjects ON subjectsRegister.Subjects_id = subjects.id
  JOIN day ON subjectsRegister.day_id = day.id
  JOIN status ON subjectsRegister.status_id =status.id
  JOIN category ON subjectsRegister.category_id = category.id
  WHERE
    user.id = ?`;

  db.query(sql, [parseInt(idUser)], (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {

      //db.query()
      return res.status(404).json({ error: 'subjectsregister not found' });
    }
    res.json(results);
  });
});

//ลบ วิชาที่ลงทะเบียน
router.delete('/teacher/delete_subjectsregister/:id', (req, res) => {
  const idSubject = req.params.id;

  if (!idSubject) {
    return res.status(400).json({ error: 'Subjects parameter is required' });
  }

  const sql = 'DELETE FROM subjectsRegister WHERE id = ? ;';

  db.query(sql, [idSubject], (err, results) => {
      if (err) {
          console.error('Error executing DELETE statement:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: 'Data deleted successfully' });
      } else {
          res.status(404).json({ error: 'Id not found' });
      }
  });
});

module.exports = router;