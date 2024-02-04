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
router.get('/api/data_user', (req, res) => {
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
router.get('/api/data_user/single', (req, res) => {
  const userEmail = req.query.email; // หรือ req.params.email 

  if (!userEmail) {
    return res.status(400).json({ error: 'Email parameter is required' });
  }

  const sql = 'SELECT user.name AS name, user.email AS mail, role.name AS role FROM user JOIN role ON user.role_id = role.id WHERE user.email = ?';

  db.query(sql, [userEmail], (err, results) => {
    if (err) {
      console.error('Error executing SELECT statement:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// DELETE user (ลบ database ตาม id)
router.delete('/api/delete_user/:id', (req, res) => {
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

module.exports = router;