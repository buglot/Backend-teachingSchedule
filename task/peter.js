const express = require('express');
const router = express.Router();
const db = require('../db');
//ตัวอย่าง
const reportLog=({req,codestatus,descpition,url})=>{
  console.log(req,"Status :",codestatus,descpition,url)
}

router.post('/admin/System' ,(req,res) =>{
    const {systemstatus,S_date,E_date,S_time,E_time} =  req.body;
    if(systemstatus || systemstatus===0){
      if(S_date && E_date && S_time && E_time){
        db.query("update timesystem set status=?,S_date=?,E_date=?,S_time=?,E_time=? where id=1",[systemstatus,S_date,E_date,S_time,E_time],(err,results)=>{
          if(err){
            res.status(500).json({msgerror:"Database Error :"+err})
            reportLog("post",404,"Error","/api/admin/System")
            return;
          }else{
            res.status(200).json({msg:"System is "+systemstatus+" วันเริ่ม"+S_date+" เวลา"+S_time+" วันสุดท้าย"+E_date+ " เวลา"+ E_time})
            reportLog("post",200,"OK","/api/admin/System")
            return;
          }
        })
      }else{
        db.query("update timesystem set status=? where id=1", [systemstatus], (err, results) => {
          if (err) {
            res.status(404).json({ msgerror: "Database Error: " + err });
            reportLog("post",404,"Error","/api/admin/System")
          } else {
            res.status(200).json({ msg: "System is " + systemstatus?"เปิด":"ปิด"});
            reportLog("post",200,"OK","/api/admin/System")
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
      reportLog("get",500,"Error","/api/admin/SystemGet")
      return;
    }else{
      res.status(200).json(results);
      reportLog("get",200,"OK","/api/admin/SystemGet")
      return;
    }
  })
})

router.get("/education/noneRegisterSubject",(req,res)=>{
  db.query("SELECT DISTINCT So.id, S.idsubject, S.name, S.credit, S.years, Sc.name AS category FROM subjectsopen So JOIN subjects S ON So.Subjects_id = S.id JOIN subject_category Sc ON S.subject_category_id = Sc.id WHERE NOT EXISTS (SELECT 1 FROM subjectsregister Sr WHERE Sr.SubjectsOpen_id = So.id)"
  ,(err,results)=>{
    if(err){
      res.status(500).json({msgerror:"Database Error:"+err})
      reportLog("get",500,"Error","/api/admin/SystemGet")
      return;
    }else{
      res.status(200).json(results);
      reportLog("get",200,"OK","/api/admin/SystemGet")
      return;
    }
  })
})

module.exports = router;