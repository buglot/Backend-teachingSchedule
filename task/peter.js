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
      db.query("SELECT * FROM subjects where idsubject =? and years=?", [value.idsubject, value.years], (err, results) => {
        if (results.length === 0) {
          const query = "INSERT INTO subjects (`idsubject`, `name`, `credit`, `practice_t`, `lecture_t`,`m_t`, `years`, `subject_category_id`, `term`, `IsOpen`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          const values = [value.idsubject, value.name, value.credit, value.practice_t, value.lecture_t, value.mt, value.years, value.subject_category_id, value.term ? value.term : null, 0];

          db.query(query, values, (err, results) => {
            if (err) {
              errors.push({ index, errorMessage: err.message, value });
            }
          });
        }else{
          errors.push({ index, errorMessage: "วิชานี้ถูกลงทะเบีบนแล้ว", value });
        }
      })

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
  const y = req.body.year;
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
        idsubject: rows[i][idsubjectColumnIndex].length === 8 ? rows[i][idsubjectColumnIndex] : "0" + rows[i][idsubjectColumnIndex],
        name: rows[i][nameColumnIndex],
        credit: rows[i][creditColumnIndex].split("(")[0],
        practice_t: rows[i][creditColumnIndex].split("(")[1].split("-")[1],
        lecture_t: rows[i][creditColumnIndex].split("(")[1].split("-")[0],
        mt: rows[i][creditColumnIndex].split("(")[1].split("-")[2].replace(")", ""),
        years: y,
        subject_category_id: assignSubjectCategoryId(rows[i][subject_categoryColumnIndex]) // Call a function to assign category ID
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
      db.query("select distinct years from subjects", (err, results) => {
        if (err) {
          console.log('None file to before.');
        } else {
          results.map((v, i) => {
            fs.unlink("files/" + "course_" + v.years + ".xlsx", (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log('File is deleted.');
              }
            });
            db.query("select idsubject,name,credit,practice_t,lecture_t,m_t,subject_category_id from subjects where years=?", [v.years], (err, results) => {
              if (err) {
                console.error("Cant get database");
              } else {
                const workbook = new exceljs.Workbook();
                const worksheet = workbook.addWorksheet('Sheet1');
                fields = ["รหัสวิชา", "ชื่อวิชา", "หน่วยกิต", "หมวด"]
                fields.forEach((field, index) => {
                  worksheet.getCell(1, index + 1).value = field;
                });
                for (let i = 0; i < results.length; i++) {

                  worksheet.getCell(i + 2, 1).value = results[i].idsubject;
                  worksheet.getCell(i + 2, 2).value = results[i].name;
                  worksheet.getCell(i + 2, 3).value = `${results[i].credit}(${results[i].lecture_t}-${results[i].practice_t ? results[i].practice_t : 0}-${results[i].m_t})`;
                  worksheet.getCell(i + 2, 4).value = results[i].subject_category_id === 1 ? "วิชาเฉพาะ" : results[i].subject_category_id === 2 ? "วิชาเฉพาะเลือก" : "วิชาเสรี";
                }
                workbook.xlsx.writeFile("files/" + "course_" + v.years + ".xlsx").then((data) => console.log("save " + "files/" + "course_" + v.years + ".xlsx"));
              }
            })
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