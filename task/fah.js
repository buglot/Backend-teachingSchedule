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

// subjectReg (ผลการลงทะเบียน ที่ผ่านแล้ว)
//ดึงข้อมูลจาก database table วิชาที่ลงทะเบียน [{},{}]
router.get('/edu/subjectReg', (req, res) => {

  const sql = `
SELECT
  subjectsregister.id AS id,
  subjects.idsubject AS idSubject,
  subjects.name AS SUBJECT,
  subjects.credit ,
  category.name AS category ,
  subjectsregister.sec,
  user.name AS NAME,
  subjectsregister.N_people,
  subjectsregister.branch,
  day.name AS DAY,
  subjectsregister.st,
  subjectsregister.et
FROM
  subjectsregister
JOIN USER ON subjectsregister.user_id = user.id
JOIN subjects ON subjectsregister.Subjects_id = subjects.id
JOIN DAY ON subjectsregister.day_id = day.id
JOIN STATUS ON subjectsregister.status_id = status.id
JOIN category ON subjectsregister.category_id = category.id
WHERE
  STATUS.id = 1` ;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// //ดึงข้อมูลจาก database table ไฟล์ แสดง เวลา ชื่อไฟล์ ที่อยู่ไฟล์สำหรับกดดาวน์โหลด
// router.get('/api/file/:filename', (req, res) => {
//   const fileName = req.params.filename; // รับชื่อไฟล์จากพารามิเตอร์ใน URL
//   const filesDir = path.join(__dirname, 'files'); // เส้นทางไปยังโฟลเดอร์ที่เก็บไฟล์
  
//   fs.readdir(filesDir, (err, files) => { // สแกนโฟลเดอร์เพื่อหาชื่อไฟล์ทั้งหมด
//     if (err) {
//       console.error(err);
//       res.status(500).send('เกิดข้อผิดพลาดในการอ่านไดเรกทอรี');
//       return;
//     }

//     const foundFile = files.find(file => file === fileName); // ตรวจสอบว่ามีไฟล์ที่ตรงกับชื่อที่รับเข้ามาหรือไม่
//     if (!foundFile) {
//       res.status(404).send('ไม่พบไฟล์ที่ระบุ');
//       return;
//     }

//     const filePath = path.join(filesDir, foundFile); // สร้างเส้นทางไฟล์ที่จะอ่าน
//     fs.readFile(filePath, 'utf8', (err, data) => { // อ่านเนื้อหาของไฟล์
//       if (err) {
//         console.error(err);
//         res.status(500).send('เกิดข้อผิดพลาดในการอ่านไฟล์');
//         return;
//       }
//       res.send(data); // ส่งเนื้อหาของไฟล์กลับไปยัง client
//     });
//   });
// });

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
  subjectsregister.N_people,
  subjectsregister.branch,
  day.name AS DAY , 
  subjectsregister.st, 
  subjectsregister.et,
  status.name AS status
FROM 
  subjectsregister 
  JOIN USER ON subjectsregister.user_id = user.id 
  JOIN subjects ON subjectsregister.Subjects_id = subjects.id
  JOIN day ON subjectsregister.day_id = day.id 
  JOIN category ON subjectsregister.category_id = category.id
  JOIN status ON subjectsregister.status_id = status.id`;

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
    subjectsregister.N_people,
    subjectsregister.branch,
    day.name AS DAY , 
    subjectsregister.st, 
    subjectsregister.et,
    status.name AS status
  FROM 
    subjectsregister 
  JOIN USER ON subjectsregister.user_id = user.id 
  JOIN subjects ON subjectsregister.Subjects_id = subjects.id
  JOIN day ON subjectsregister.day_id = day.id 
  JOIN category ON subjectsregister.category_id = category.id
  JOIN status ON subjectsregister.status_id = status.id
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
    subjectsregister.id AS id,
    subjects.name AS SUBJECT,
    day.name AS DAY,
    subjectsregister.st,
    subjectsregister.et,
    status.name AS status
  FROM
    subjectsregister
  JOIN USER ON subjectsregister.User_id = user.id
  JOIN subjects ON subjectsregister.Subjects_id = subjects.id
  JOIN DAY ON subjectsregister.day_id = day.id
  JOIN STATUS ON subjectsregister.status_id =STATUS.id
  JOIN category ON subjectsregister.category_id = category.id
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

module.exports = router;