const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const readfiles = require('read-excel-file/node');
//ตัวอย่าง
const fs = require('fs');
const exceljs = require("exceljs")


router.post('/admin/System', (req, res) => {
  const { systemstatus, S_date, E_date, S_time, E_time } = req.body;
  if (systemstatus || systemstatus === 0) {
    if (S_date && E_date && S_time && E_time) {
      db.query("update timesystem set status=?,S_date=?,E_date=?,S_time=?,E_time=? where id=1", [systemstatus, S_date, E_date, S_time, E_time], (err, results) => {
        if (err) {
          res.status(500).json({ msgerror: "Database Error :" + err })
        } else {
          res.status(200).json({ msg: "System is " + systemstatus + " วันเริ่ม" + S_date + " เวลา" + S_time + " วันสุดท้าย" + E_date + " เวลา" + E_time })

        }
      })
      return;
    } else {
      db.query("update timesystem set status=? where id=1", [systemstatus], (err, results) => {
        if (err) {
          res.status(404).json({ msgerror: "Database Error: " + err });
        } else {
          res.status(200).json({ msg: "System is " + systemstatus ? "เปิด" : "ปิด" });
        }
      });
      return;
    }
  }
  res.status(404).json({ msgerror: "you not set system status" })
})

router.get("/admin/SystemGet", (req, res) => {
  db.query("select * from timeSystem", (err, results) => {
    if (err) {
      res.status(500).json({ msgerror: "Database Error:" + err })
      return;
    } else {
      res.status(200).json(results);
      return;
    }
  })
})

router.get("/education/noneRegisterSubject", (req, res) => {
  db.query("select S.id,S.idsubject,S.name,S.credit,Sc.name as 'category name' from subjects S join subject_category Sc on S.subject_category_id=Sc.id where not exists (SELECT 1 FROM subjectsRegister Sr WHERE Sr.Subjects_id = S.id) and S.isopen=1"
    , (err, results) => {
      if (err) {
        res.status(500).json({ msgerror: "Database Error:" + err })
        return;
      } else {
        res.status(200).json(results);
        return;
      }
    })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    cb(null, 'files'); // Save files to the 'files' directory
  },
  filename: function (req, file, cb) {
    
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName); // Concatenate name, year, and original filename
  }
});

const upload = multer({ storage: storage });

function education_import(data) {
  return new Promise((resolve, reject) => {
    if (data.length === 0) {
      return reject("Error: No data provided.");
    }

    const errors = []; // Array to store encountered errors

    data.forEach((value, index) => {
      const query = "INSERT INTO subjects (`idsubject`, `name`, `credit`, `practice_t`, `lecture_t`, `years`, `subject_category_id`, `term`, `IsOpen`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [value.idsubject, value.name, value.credit, value.practice_t, value.lecture_t, value.years, value.subject_category_id, value.term ? value.term : null, 0];

      db.query(query, values, (err, results) => {
        if (err) {
          errors.push({ index, errorMessage: err.message, value });
        }
      });
    });

    // Wait for all queries to finish and handle errors
    Promise.allSettled(errors.map((error) => new Promise((resolve) => db.query(`ROLLBACK`, resolve))).concat([new Promise((resolve) => setTimeout(resolve, 1000))])) // Wait for any rollback queries and a timeout to ensure completion
      .then(() => {
        if (errors.length === 0) {
          resolve("Data successfully imported");
        } else {
          // Provide detailed error information
          reject({
            message: `${errors.length} errors occurred during import`,
            errors: errors,
          });
        }
      })
      .catch((err) => {
        console.error("Error handling errors:", err);
        reject({ message: "Error handling errors: " + err.message });
      });
  });
}

router.post("/uploadfile", upload.single('file'), (req, res) => {
  const y=req.body.year;
  const uploadedFile = req.file;
  const filePath = uploadedFile.path;
  
  readfiles(path.join(filePath)).then((rows) => {
    const list = []; // Create an empty array to store the dictionaries

    const idsubjectColumnIndex = rows[0].indexOf("รหัสวิชา");
    const nameColumnIndex = rows[0].indexOf("ชื่อวิชา");
    const creditColumnIndex = rows[0].indexOf("หน่วยกิต");
    const subject_categoryColumnIndex = rows[0].indexOf("หมวด");
    
    for (let i = 1; i < rows.length; i++) {
      const data = { // Create a dictionary for each row
        idsubject: rows[i][idsubjectColumnIndex].length === 8?rows[i][idsubjectColumnIndex]:"0"+rows[i][idsubjectColumnIndex],
        name: rows[i][nameColumnIndex],
        credit: rows[i][creditColumnIndex].split("(")[0],
        practice_t: rows[i][creditColumnIndex].split("(")[1].split("-")[1],
        lecture_t: rows[i][creditColumnIndex].split("(")[1].split("-")[0],
        years: y,
        subject_category_id: assignSubjectCategoryId(rows[i][nameColumnIndex]) // Call a function to assign category ID
      };
      list.push(data); // Add the dictionary to the list
    }
    education_import(list).then((data) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('File is deleted.');
        }
      });
      db.query("select distinct years from subjects",(err,results)=>{
        if(err){
          console.log('None file to before.');
        }else{
          console.log(results)
          results.map((v,i)=>{
            fs.unlink("files/"+"course_"+v.years+".xlsx", (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log('File is deleted.');
              }
            });
            const workbook = new exceljs.Workbook();

          });
        }
      });
      res.status(200).json({ msg: "บันทึกไฟล์ สำเร็จ " + data })

    }).catch((err) => { res.status(500).json({ err }) })
  })

});
function assignSubjectCategoryId(name) {
  if (name === "วิชาเฉพาะ") {
    return 1;
  } else if (name === "วิชาเฉพาะเลือก") {
    return 2;
  } else {
    return 3;
  }
}
module.exports = router;