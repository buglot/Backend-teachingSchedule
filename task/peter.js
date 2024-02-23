const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const readfiles = require('read-excel-file/node');
//ตัวอย่าง
const fs = require('fs');
const exceljs = require("exceljs");
const { TIMEOUT } = require('dns');


router.post('/admin/System', (req, res) => {
  const { systemstatus, S_date, E_date, S_time, E_time } = req.body;
  if (systemstatus || systemstatus === 0) {
    if (S_date && E_date && S_time && E_time) {
      db.query("update timeSystem set status=?,S_date=?,E_date=?,S_time=?,E_time=? where id=1", [systemstatus, S_date, E_date, S_time, E_time], (err, results) => {
        if (err) {
          res.status(500).json({ msgerror: "Database Error :" + err })
        } else {
          res.status(200).json({ msg: "System is " + systemstatus + " วันเริ่ม" + S_date + " เวลา" + S_time + " วันสุดท้าย" + E_date + " เวลา" + E_time })

        }
      })
      return;
    } else {
      db.query("update timeSystem set status=? where id=1", [systemstatus], (err, results) => {
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
    const warn = [];
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
        } else {
          warn.push({ index, Message: "วิชานี้ถูกลงทะเบียนก่อนหน้าแล้ว", value });
        }
      })

    });

    // Wait for all queries to finish and handle errors
    Promise.allSettled(errors.map((error) => new Promise((resolve) => db.query(`ROLLBACK`, resolve))).concat([new Promise((resolve) => setTimeout(resolve, 1000))])) // Wait for any rollback queries and a timeout to ensure completion
      .then(() => {
        if (errors.length === 0) {
          resolve({ data: "Data successfully imported", warn: { data: warn, warnmsg: warn.length === 0 ? null : `${warn.length} วิชาที่มีการลงทะเบียนก่อนหน้าแล้ว` } });
        } else {
          // Provide detailed error information
          reject({
            data: `${errors.length} errors occurred during import`,
            errors: errors,
            warn: { data: warn, warnmsg: warn.length === 0 ? null : `${warn.length} วิชาที่มีการลงทะเบียนก่อนหน้าแล้ว` }
          });
        }
      })
      .catch((err) => {
        console.error("Error handling errors:", err);
        reject({ message: "Error handling errors: " + err.message });
      });
  });
}

router.post("/education/Course/uploadfile", upload.single('file'), (req, res) => {
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
      try {
        const data = { // Create a dictionary for each row
          idsubject: rows[i][idsubjectColumnIndex] ? rows[i][idsubjectColumnIndex].length === 8 ? rows[i][idsubjectColumnIndex] : "0" + rows[i][idsubjectColumnIndex] : null,
          name: rows[i][nameColumnIndex],
          credit: rows[i][creditColumnIndex] ? rows[i][creditColumnIndex].split("(")[0] : null,
          practice_t: rows[i][creditColumnIndex] ? rows[i][creditColumnIndex].split("(")[1].split("-")[1] : null,
          lecture_t: rows[i][creditColumnIndex] ? rows[i][creditColumnIndex].split("(")[1].split("-")[0] : null,
          mt: rows[i][creditColumnIndex] ? rows[i][creditColumnIndex].split("(")[1].split("-")[2].replace(")", "") : null,
          years: y,
          subject_category_id: assignSubjectCategoryId(rows[i][subject_categoryColumnIndex]) // Call a function to assign category ID
        };
        list.push(data);
      } catch (error) {
        try {
          const data = { // Create a dictionary for each row
            idsubject: rows[i][idsubjectColumnIndex] ? rows[i][idsubjectColumnIndex].length === 8 ? rows[i][idsubjectColumnIndex] : "0" + rows[i][idsubjectColumnIndex] : null,
            name: rows[i][nameColumnIndex],
            credit: rows[i][creditColumnIndex].split("-") ? 0 : rows[i][creditColumnIndex],
            practice_t: 0,
            lecture_t: 0,
            mt: 0,
            years: y,
            subject_category_id: assignSubjectCategoryId(rows[i][subject_categoryColumnIndex]) // Call a function to assign category ID
          };
          list.push(data);
        } catch (error) {
          const data = { // Create a dictionary for each row
            idsubject: rows[i][idsubjectColumnIndex] ? rows[i][idsubjectColumnIndex].length === 8 ? rows[i][idsubjectColumnIndex] : "0" + rows[i][idsubjectColumnIndex] : null,
            name: rows[i][nameColumnIndex],
            credit: rows[i][creditColumnIndex],
            practice_t: 0,
            lecture_t: 0,
            mt: 0,
            years: y,
            subject_category_id: assignSubjectCategoryId(rows[i][subject_categoryColumnIndex]) // Call a function to assign category ID
          };
          list.push(data);
        }

      }

      // Add the dictionary to the list
    }
    education_import(list).then((data) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('File is deleted.', filePath);
        }
      });
      upDatefile();
      checkfile();
      res.status(200).json({ msg: "บันทึกไฟล์ สำเร็จ " + data.data, warning: data.warn })

    }).catch((err) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('File is deleted.', filePath);
        }
      });
      res.status(500).json({ msgerror: err.data, error: err.errors, warning: err.warn })
    })
  })

});
function assignSubjectCategoryId(name) {
  if (name === "วิชาเลือก") {
    return 2;
  } else if (name === "วิชาบังคับ") {
    return 1;
  } else if (name === "วิชาแกน") {
    return 3;
  } else {
    return null;
  }
}
function checkfile() {
  db.query("select * from file f where not exists (select distinct years from subjects where f.years = years)", (err, results) => {
    console.log(results)
    if (results.length !== 0) {
      results.map((v, i) => {
        console.log(v)
        db.query("DELETE FROM file WHERE (id = ?)", [v.id], (err, results) => {
          fs.unlink("public/files/" + "course_" + v.years + ".xlsx", (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('File is deleted.', "public/files/" + "course_" + v.years + ".xlsx");
            }
          })
        })
      })

    }
  })
}
function upDatefile() {
  db.query("select distinct years from subjects", (err, results) => {
    if (err) {
      console.log('None file to before.');
    } else {
      results.map((v, i) => {
        fs.unlink("public/files/" + "course_" + v.years + ".xlsx", (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('File is deleted.', "public/files/" + "course_" + v.years + ".xlsx");
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
              worksheet.getCell(i + 2, 4).value = results[i].subject_category_id === 1 ? "วิชาบังคับ" : results[i].subject_category_id === 2 ? "วิชาเลือก" : "วิชาแกน";
            }
            workbook.xlsx.writeFile("public/files/" + "course_" + v.years + ".xlsx").then((data) => console.log("save " + "public/files/" + "course_" + v.years + ".xlsx"));
            const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            db.query("select * from file where filename=?", ["course_" + v.years + ".xlsx"], (err, results) => {
              if (results.length === 0) {
                db.query("INSERT INTO file (`date`, `filename`, `link`, `years`) VALUES (?, ?, ?, ?)", [currentDate, "course_" + v.years + ".xlsx", "/download/" + "course_" + v.years + ".xlsx", v.years], (err, results) => {
                  if (err) {
                    console.log(err)
                  }
                })
              } else {
                db.query("UPDATE file SET date = ? WHERE (years = ?)", [currentDate, v.years], (err, results) => {
                  if (err) {
                    console.log(err)
                  }
                })
              }
            })
          }
        })
      });
    }
  });
}
router.post("/education/Course/add", (req, res) => {
  const { year, name, idsubject, credit, subject_category_id } = req.body;
  const data = { // Create a dictionary for each row
    idsubject: idsubject.length === 8 ? idsubject : "0" + idsubject,
    name: name,
    credit: credit,
    practice_t: 0,
    lecture_t: 0,
    mt: 0,
    years: year,
    subject_category_id: subject_category_id// Call a function to assign category ID
  };
  education_import(data).then((data) => {
    upDatefile();
    checkfile();
  })
})

router.post("/education/subjectOpen", (req, res) => {
  const { subjects } = req.body;
  if (!subjects) {
    res.status(500).json({ msgerror: `Error ${subjects} json subject` });
    return;
  }

  if (subjects.length === 0) {
    res.status(500).json({ msgerror: "คุณไม่ได้เลือกวิชาที่จะไปเปิดสอน" });
    return;
  }
  let warn = []
  const updatePromises = subjects.map(subject => {
    return new Promise((resolve, reject) => {
      db.query("UPDATE subjects SET IsOpen = '1' WHERE id = ?", [subject.id], (err, results) => {
        if (results.changedRows === 0) {
          warn.push(subject.id)
        }


        resolve(results);
      });
    });
  });

  Promise.all(updatePromises)
    .then((results) => {
      res.status(200).json({ msg: "เปิดวิชาสำเร็จ", warning: warn });
    })
    .catch(err => {
      res.status(500).json({ msgerror: "ไม่สามารถอัปเดต databases" });
    });


})

router.post("/teacher/registersubject", (req, res) => {
  const { subjects } = req.body;
  const { user_id, st, et, day_id, n_people, branch, category_id, subjects_id } = req.body;
  db.query('select * from timeSystem', (err, result) => {
    if (err) {
      reject('database error ' + err);
    } else {
      if (!result[0].status) {
        return res.status(500).json({ msgerror: "ไม่ได้เปิดระบบให้ลงทะเบียน" });
      }else{
        const time = new Date()
        if (result[0].S_date){
          const data = new Date(result[0].S_date)
          data.setTime(result[0].S_time *1000);
          console.log(result[0].S_date)
        }
      }
    }
  });
  if (!subjects) {
    res.status(500).json({ msgerror: "error subjects null" })
    return;
  }
  const InsertDatabase = subjects.map((v, i) => {
    return new Promise((resolve, reject) => {
      db.query('select * from timeSystem', (err, result) => {
        if (err) {
          reject('database error ' + err);
        } else {

          // db.query("INSERT INTO subjectsRegister (User_id, st, et, day_id, status_id, N_people, branch, category_id, Subjects_id) VALUES (?,?,?,?,?,?,?,?,?)",[v.user_id,v.st,v.et,v.day_id,v.n_people,v.branch,v.category_id,v.subjects_id],(err,results)=>{
          resolve(result[0])
          // })
        }
      });

    })

  })
  Promise.all(InsertDatabase).then((data) => res.status(200).send(data)).catch(() => res.status(500).send("error"))
});

router.get("/subject_category",(req,res)=>{
  db.query("Select * from subject_category",(err,results)=>{
    if(err){
      return res.status(500).json({"msgerr":err})
    }else{
      return res.status(200).json(results)
    }
  });
})
module.exports = router;