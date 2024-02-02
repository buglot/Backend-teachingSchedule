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

router.post('/admin/System' ,(req,res) =>{
    const {systemstatus,S_date,E_date,S_time,E_time} =  req.body;
    if(systemstatus){
      if(S_date && E_date && S_time && E_time){
        db.query("update timesystem set status=?,S_date=?,E_date=?,S_time=?,E_time=? where id=1",[systemstatus,S_date,E_date,S_time,E_time],(err,results)=>{
          if(err){
            res.status(404).json({msgerror:"Database Error :"+err})
            return;
          }else{
            res.status(200).json({msg:"System is "+systemstatus+" วันเริ่ม"+S_date+" เวลา"+S_time+" วันสุดท้าย"+E_date+ " เวลา"+ E_time})
            return;
          }
        })
      }else{
        db.query("update timesystem set status=? where id=1", [systemstatus], (err, results) => {
          if (err) {
            res.status(404).json({ msgerror: "Database Error: " + err });
          } else {
            res.status(200).json({ msg: "System is " + systemstatus });
          }
        });
        return;
      }
    }
    res.status(404).json({msgerror:"you not set system status"})
})



module.exports = router;