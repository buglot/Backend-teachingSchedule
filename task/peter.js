const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");
const readfiles = require("read-excel-file/node");
//ตัวอย่าง
const fs = require("fs");
const exceljs = require("exceljs");
const { rejects } = require("assert");

router.post("/admin/System", (req, res) => {
  const { systemstatus, S_date, E_date, S_time, E_time } = req.body;
  if (systemstatus || systemstatus === 0) {
    if (S_date && E_date && S_time && E_time) {
      db.query(
        "update timeSystem set status=?,S_date=?,E_date=?,S_time=?,E_time=?,type=1 where id=1",
        [systemstatus, S_date, E_date, S_time, E_time],
        (err, results) => {
          if (err) {
            res.status(500).json({ msgerror: "Database Error :" + err });
          } else {
            res.status(200).json({
              msg:
                "System is " +
                systemstatus +
                " วันเริ่ม" +
                S_date +
                " เวลา" +
                S_time +
                " วันสุดท้าย" +
                E_date +
                " เวลา" +
                E_time,
            });
          }
        }
      );
      return;
    } else {
      db.query(
        "update timeSystem set status=?,type=0 where id=1",
        [systemstatus],
        (err, results) => {
          if (err) {
            res.status(404).json({ msgerror: "Database Error: " + err });
          } else {
            res
              .status(200)
              .json({ msg: "System is " + systemstatus ? "เปิด" : "ปิด" });
          }
        }
      );
      return;
    }
  }
  res.status(404).json({ msgerror: "you not set system status" });
});

router.get("/admin/SystemGet", (req, res) => {
  db.query("select * from timeSystem", (err, results) => {
    if (err) {
      res.status(500).json({ msgerror: "Database Error:" + err });
      return;
    } else {
      res.status(200).json(results);
      return;
    }
  });
});

router.get("/education/noneRegisterSubject", (req, res) => {
  db.query(
    "select S.id,S.idsubject,S.name,S.credit,Sc.name as 'category_name' from subjects S join subject_category Sc on S.subject_category_id=Sc.id where not exists (SELECT 1 FROM subjectsRegister Sr WHERE Sr.Subjects_id = S.id) and S.isopen=1",
    (err, results) => {
      if (err) {
        res.status(500).json({ msgerror: "Database Error:" + err });
        return;
      } else {
        res.status(200).json(results);
        return;
      }
    }
  );
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files"); // Save files to the 'files' directory
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName); // Concatenate name, year, and original filename
  },
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
      if (value.idsubject.length !== 8) {
        errors.push({ index, value, errorMessage: "รหัสวิชาต้องมี 8 ตัว " });
      } else {
        db.query(
          "SELECT * FROM subjects where idsubject =? and years=?",
          [value.idsubject, value.years],
          (err, results) => {
            if (results.length === 0) {
              const query =
                "INSERT INTO subjects (`idsubject`, `name`, `credit`, `practice_t`, `lecture_t`,`m_t`, `years`, `subject_category_id`, `term`, `IsOpen`,`exsub`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
              const values = [
                value.idsubject,
                value.name,
                value.credit,
                value.practice_t,
                value.lecture_t,
                value.mt,
                value.years,
                value.subject_category_id,
                value.term ? value.term : null,
                0,
                value.exsub,
              ];

              db.query(query, values, (err, results) => {
                if (err) {
                  errors.push({ index, errorMessage: err.message, value });
                }
              });
            } else {
              warn.push({
                index,
                Message: "วิชานี้ถูกลงทะเบียนก่อนหน้าแล้ว",
                value,
              });
            }
          }
        );
      }
    });

    // Wait for all queries to finish and handle errors
    Promise.allSettled(
      errors
        .map((error) => new Promise((resolve) => db.query(`ROLLBACK`, resolve)))
        .concat([new Promise((resolve) => setTimeout(resolve, 1000))])
    ) // Wait for any rollback queries and a timeout to ensure completion
      .then(() => {
        if (errors.length === 0) {
          resolve({
            data: "Data successfully imported",
            warn: {
              data: warn,
              warnmsg:
                warn.length === 0
                  ? null
                  : `${warn.length} วิชาที่มีการลงทะเบียนก่อนหน้าแล้ว`,
            },
          });
        } else {
          // Provide detailed error information
          reject({
            data: `${errors.length} errors occurred during import`,
            errors: errors,
            warn: {
              data: warn,
              warnmsg:
                warn.length === 0
                  ? null
                  : `${warn.length} วิชาที่มีการลงทะเบียนก่อนหน้าแล้ว`,
            },
          });
        }
      })
      .catch((err) => {
        console.error("Error handling errors:", err);
        reject({ message: "Error handling errors: " + err.message });
      });
  });
}

router.post(
  "/education/Course/uploadfile",
  upload.single("file"),
  (req, res) => {
    const y = req.body.year;
    const uploadedFile = req.file;
    const filePath = uploadedFile.path;
    readfiles(path.join(filePath))
      .then(async (rows) => {
        const list = [];
        const idsubjectColumnIndex = rows[0].indexOf("รหัสวิชา");
        const nameColumnIndex = rows[0].indexOf("ชื่อวิชา");
        const creditColumnIndex = rows[0].indexOf("หน่วยกิต");
        const subject_categoryColumnIndex = rows[0].indexOf("หมวด");
        for (let i = 1; i < rows.length; i++) {
          try {
            const categoryId = await assignSubjectCategoryId(
              rows[i][subject_categoryColumnIndex]
            );
            const data = {
              idsubject: rows[i][idsubjectColumnIndex]
                ? rows[i][idsubjectColumnIndex].length === 8
                  ? rows[i][idsubjectColumnIndex]
                  : rows[i][idsubjectColumnIndex].charAt(0) === "0"
                  ? rows[i][idsubjectColumnIndex]
                  : "0" + rows[i][idsubjectColumnIndex]
                : null,
              name: rows[i][nameColumnIndex],
              credit: rows[i][creditColumnIndex]
                ? rows[i][creditColumnIndex].split("(")[0]
                : null,
              practice_t: rows[i][creditColumnIndex]
                ? rows[i][creditColumnIndex].split("(")[1].split("-")[1]
                : null,
              lecture_t: rows[i][creditColumnIndex]
                ? rows[i][creditColumnIndex].split("(")[1].split("-")[0]
                : null,
              mt: rows[i][creditColumnIndex]
                ? rows[i][creditColumnIndex]
                    .split("(")[1]
                    .split("-")[2]
                    .replace(")", "")
                : null,
              years: y,
              exsub: 0,
              subject_category_id: categoryId, // Call a function to assign category ID
            };
            list.push(data);
          } catch (error) {
            const categoryId = await assignSubjectCategoryId(
              rows[i][subject_categoryColumnIndex]
            );
            const data = {
              // Create a dictionary for each row
              idsubject: rows[i][idsubjectColumnIndex]
                ? rows[i][idsubjectColumnIndex].length === 8
                  ? rows[i][idsubjectColumnIndex]
                  : rows[i][idsubjectColumnIndex].charAt(0) === "0"
                  ? rows[i][idsubjectColumnIndex]
                  : "0" + rows[i][idsubjectColumnIndex]
                : null,
              name: rows[i][nameColumnIndex],
              credit: rows[i][creditColumnIndex],
              practice_t: 0,
              lecture_t: 0,
              mt: 0,
              years: y,
              exsub: 1,
              subject_category_id: categoryId,
            };
            list.push(data);
          }

          // Add the dictionary to the list
        }
        education_import(list)
          .then((data) => {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log("File is deleted.", filePath);
              }
            });
            upDatefile();
            checkfile();
            res.status(200).json({
              msg: "บันทึกไฟล์ สำเร็จ " + data.data,
              warning: data.warn,
            });
          })
          .catch((err) => {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log("File is deleted.", filePath);
              }
            });
            upDatefile();
            checkfile();
            res.status(500).json({
              msgerror: err.data,
              error: err.errors,
              warning: err.warn,
            });
          });
      })
      .catch((error) => {
        //res.status(404).json({ msgerror: "ไม่สามารถอัปโหลด กรุณาตรวจสอบชนิดไฟล์ด้วยครับ .xlsx" })
        if (error.message.includes("ID subject length must be 8 characters.")) {
          res.status(404).json({
            msgerror: "ไม่สามารถอัปโหลด รหัสวิชามีความยาวไม่ถูกต้อง",
          });
        } else {
          res.status(404).json({
            msgerror: "ไม่สามารถอัปโหลด กรุณาตรวจสอบชนิดไฟล์ด้วยครับ .xlsx",
          });
        }
      });
  }
);
async function assignSubjectCategoryId(name) {
  return new Promise((resolve, reject) => {
    db.query(
      "select id from subject_category where name = ?",
      [name],
      (err, results2) => {
        if (err) {
          reject(err);
        } else {
          if (results2.length > 0) {
            resolve(results2[0].id);
          } else {
            resolve(null);
          }
        }
      }
    );
  });
}

function checkfile() {
  db.query(
    "select * from file f where not exists (select distinct years from subjects where f.years = years)",
    (err, results) => {
      console.log(results);
      if (results.length !== 0) {
        results.map((v, i) => {
          console.log(v);
          db.query(
            "DELETE FROM file WHERE (id = ?)",
            [v.id],
            (err, results) => {
              fs.unlink(
                "public/savefiles/" + "course_" + v.years + ".xlsx",
                (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log(
                      "File is deleted.",
                      "public/savefiles/" + "course_" + v.years + ".xlsx"
                    );
                  }
                }
              );
            }
          );
        });
      }
    }
  );
}
function upDatefile() {
  db.query("select distinct years from subjects", (err, results) => {
    if (err) {
      console.log("None file to before.");
    } else {
      results.map((v, i) => {
        fs.unlink(
          "public/savefiles/" + "course_" + v.years + ".xlsx",
          (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(
                "File is deleted.",
                "public/savefiles/" + "course_" + v.years + ".xlsx"
              );
            }
          }
        );
        db.query(
          "select idsubject,name,credit,practice_t,lecture_t,m_t,subject_category_id from subjects where years=?",
          [v.years],
          (err, results) => {
            if (err) {
              console.error("Cant get database");
            } else {
              const workbook = new exceljs.Workbook();
              const worksheet = workbook.addWorksheet("Sheet1");
              fields = ["รหัสวิชา", "ชื่อวิชา", "หน่วยกิต", "หมวด"];
              fields.forEach((field, index) => {
                worksheet.getCell(1, index + 1).value = field;
              });
              for (let i = 0; i < results.length; i++) {
                worksheet.getCell(i + 2, 1).value = results[i].idsubject;
                worksheet.getCell(i + 2, 2).value = results[i].name;
                worksheet.getCell(i + 2, 3).value = `${results[i].credit}(${
                  results[i].lecture_t
                }-${results[i].practice_t ? results[i].practice_t : 0}-${
                  results[i].m_t
                })`;
                db.query(
                  "select name from subject_category where id = ?",
                  [results[i].subject_category_id],
                  (err, result1) => {
                    if (err) {
                      worksheet.getCell(i + 2, 4).value =
                        "error database report admin to fix";
                    } else {
                      if (result1.length > 0) {
                        worksheet.getCell(i + 2, 4).value = result1[0].name;
                      } else {
                        worksheet.getCell(i + 2, 4).value =
                          "report admin to fix";
                      }
                    }
                  }
                );
              }
              workbook.xlsx
                .writeFile("public/savefiles/" + "course_" + v.years + ".xlsx")
                .then((data) =>
                  console.log(
                    "save " +
                      "public/savefiles/" +
                      "course_" +
                      v.years +
                      ".xlsx"
                  )
                );
              const currentDate = new Date()
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, "");
              db.query(
                "select * from file where filename=?",
                ["course_" + v.years + ".xlsx"],
                (err, results) => {
                  if (results.length === 0) {
                    db.query(
                      "INSERT INTO file (`date`, `filename`, `link`, `years`) VALUES (?, ?, ?, ?)",
                      [
                        currentDate,
                        "course_" + v.years + ".xlsx",
                        "/download/" + "course_" + v.years + ".xlsx",
                        v.years,
                      ],
                      (err, results) => {
                        if (err) {
                          console.log(err);
                        }
                      }
                    );
                  } else {
                    db.query(
                      "UPDATE file SET date = ? WHERE (years = ?)",
                      [currentDate, v.years],
                      (err, results) => {
                        if (err) {
                          console.log(err);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      });
    }
  });
}
router.post("/education/Course/add", (req, res) => {
  const { year, name, idsubject, credit, subject_category_id } = req.body;
  const data = {
    idsubject: idsubject.length === 8 ? idsubject : "0" + idsubject,
    name: name,
    credit: credit,
    practice_t: 0,
    lecture_t: 0,
    mt: 0,
    years: year,
    subject_category_id: subject_category_id, // Call a function to assign category ID
  };
  education_import(data).then((data) => {
    upDatefile();
    checkfile();
  });
});

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
  let warn = [];
  const updatePromises = subjects.map((subject) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE subjects SET IsOpen = '1' WHERE id = ?",
        [subject.id],
        (err, results) => {
          if (results.changedRows === 0) {
            warn.push(subject.id);
          }
          resolve(results);
        }
      );
    });
  });

  Promise.all(updatePromises)
    .then((results) => {
      res.status(200).json({ msg: "เปิดวิชาสำเร็จ", warning: warn });
    })
    .catch((err) => {
      res.status(500).json({ msgerror: "ไม่สามารถอัปเดต databases" });
    });
});

router.post("/teacher/registersubject", (req, res) => {
  const { subjects, m, status } = req.body;
  db.query("select * from timeSystem", (err, result) => {
    if (err) {
      return res.status(500).json({ msgerror: "database error " + err });
    } else {
      if (!result[0].status) {
        return res.status(500).json({ msgerror: "ไม่ได้เปิดระบบให้ลงทะเบียน" });
      } else {
        const time = new Date();
        if (result[0].type === 1) {
          const data = new Date(result[0].S_date);
          const [hours, minutes] = result[0].S_time.split(":").map(Number);
          data.setHours(hours);
          data.setMinutes(minutes);
          const data1 = new Date(result[0].E_date);
          const [hours1, minutes1] = result[0].E_time.split(":").map(Number);
          data1.setHours(hours1);
          data1.setMinutes(minutes1);
          if (!(data <= time && data1 >= time)) {
            return res.status(500).json({
              msgerror: `ไม่ได้เปิดระบบให้ลงทะเบียน ระบบเปิด ${data.toLocaleString(
                "th-th",
                {
                  year: "numeric",
                  day: "2-digit",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )} ถึง ${data1.toLocaleString("th-th", {
                year: "numeric",
                day: "2-digit",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}`,
            });
          }
        }
      }
    }
    if (!subjects) {
      return res.status(500).json({ msgerror: "error subjects null" });
    }
    const InsertDatabase = new Promise((resolve, reject) => {
      const errors = [];
      const successindex = [];
      subjects.map((v, i) => {
        db.query(
          "SELECT * FROM teachingschedule.subjectsRegister  WHERE ((st < ? AND et > ?) OR (st < ? AND et > ?) OR (st > ? AND et < ?)) AND User_id = ? and day_id=?;",
          [v.et, v.st, v.st, v.et, v.st, v.et, v.uid, v.day_id],
          (err, results5) => {
            if (err) {
              errors.push(`หมวดที่ ${i + 1} ลงทะเบียนไม่สำเร็จ` + err.message);
            } else {
              if (results5.length === 0) {
                db.query(
                  "INSERT INTO subjectsRegister (User_id, st, et, day_id, status_id, N_people, branch, category_id, Subjects_id, realcredit) VALUES (?,?,?,?,?,?,?,?,?,?)",
                  [
                    v.uid,
                    v.st,
                    v.et,
                    v.day_id,
                    status ? status : 2,
                    v.N_people,
                    JSON.stringify(v.branch),
                    v.category_id,
                    v.Subjects_id,
                    v.realcredit,
                  ],
                  (err, results) => {
                    if (err) {
                      errors.push(
                        `หมวดที่ ${i + 1} ลงทะเบียนไม่สำเร็จ` + err.message
                      );
                    } else {
                      successindex.push(i);
                    }
                  }
                );
              } else {
                if (!m) {
                  errors.push(
                    `หมวดที่ ${i + 1} ลงไม่ได้เพราะเวลานี้ทับกับเวลาที่คุณลง`
                  );
                } else {
                  errors.push(
                    `หมวดที่ ${i + 1} ลงไม่ได้เพราะเวลานี้ทับกับเวลาที่ลงแล้ว`
                  );
                }
              }
            }
          }
        );
      });
      Promise.allSettled(
        errors
          .map(
            (error) => new Promise((resolve) => db.query(`ROLLBACK`, resolve))
          )
          .concat([new Promise((resolve) => setTimeout(resolve, 1000))])
      ).then(() => {
        if (errors.length === 0) {
          resolve({ success: successindex });
        } else {
          reject({ error: errors, success: successindex });
        }
      });
    });
    InsertDatabase.then((data) => res.status(200).json(data)).catch((err) =>
      res.status(500).json(err)
    );
  });
});

router.get("/subject_category", (req, res) => {
  db.query("Select * from subject_category", (err, results) => {
    if (err) {
      return res.status(500).json({ msgerr: err });
    } else {
      return res.status(200).json(results);
    }
  });
});

router.get("/education/downloadlist", (req, res) => {
  db.query("select years,link,filename from file", (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ msgerror: "error server databases please report admin" });
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(200).json({ msg: "ไม่มีไฟล์ถูกอัปโหลดไว้" });
      }
    }
  });
});

router.get("/education/getallsubjects", (req, res) => {
  db.query(
    "select subjects.id,idsubject,subjects.name,credit,practice_t,lecture_t,years,IsOpen,subject_category.name as subject_category from subjects join subject_category on subjects.subject_category_id = subject_category.id where Isopen = 0 order by years DESC",
    (err, results) => {
      if (err) {
        res
          .status(500)
          .json({ msgerror: "Error Server database! Please report admin" });
      } else {
        if (results.length > 0) {
          res.status(200).json({ results });
        } else {
          res.status(200).json({ msg: "ไม่มีวิชาที่อัปโหลดไว้" });
        }
      }
    }
  );
});

router.get("/subjest", (req, res) => {
  db.query(
    "Select subjects.id,idsubject,subjects.name,credit,years,subject_category.name as subject_category from subjects join subject_category on subjects.subject_category_id = subject_category.id where Isopen = 1",
    (err, results) => {
      if (err) {
        res.status(500).json({
          msgerr: "Error Server Databases! Please calling admin to fix",
        });
      } else {
        if (results.length > 0) res.status(200).json(results);
        else res.status(200).json({ msg: "ไม่มีวิชาที่เปิดสอน" });
      }
    }
  );
});

router.get("/teacher/subjects", (req, res) => {
  db.query(
    "select status,S_date,E_date,S_time,E_time,type from timeSystem where id =1",
    (err, results) => {
      if (err) {
        res.status(500).json({
          msgerror: "Error Server Database! Please calling admin to fix",
        });
      } else {
        if (results[0].status === 0) {
          res.status(404).json({
            msgerrortime: "ระบบการลงทะเบียนรายวิชาได้ปิดอยู่ในขณะนึ้",
          });
        } else {
          const time = new Date();
          if (
            results[0].type === 1 &&
            results[0].S_date &&
            results[0].E_date &&
            results[0].S_time &&
            results[0].E_time
          ) {
            const data = new Date(results[0].S_date);
            const [hours, minutes] = results[0].S_time.split(":").map(Number);
            data.setHours(hours);
            data.setMinutes(minutes);
            const data1 = new Date(results[0].E_date);
            const [hours1, minutes1] = results[0].E_time.split(":").map(Number);
            data1.setHours(hours1);
            data1.setMinutes(minutes1);
            if (!(data <= time)) {
              db.query(
                "Select subjects.id,idsubject,subjects.name,credit,years,subject_category.name as subject_category from subjects join subject_category on subjects.subject_category_id = subject_category.id where Isopen = 1",
                (err, results) => {
                  if (err) {
                    res.status(500).json({
                      msgerr:
                        "Error Server Databases! Please calling admin to fix",
                    });
                  } else {
                    if (results.length > 0) {
                      res.status(200).json({
                        results,
                        msgtime: `ไม่ได้เปิดระบบให้ลงทะเบียน ระบบเปิด ${data.toLocaleString(
                          "th-th",
                          {
                            year: "numeric",
                            day: "2-digit",
                            month: "long",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )} ถึง ${data1.toLocaleString("th-th", {
                          year: "numeric",
                          day: "2-digit",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`,
                      });
                    } else {
                      res.status(200).json({
                        msg: "ไม่มีวิชาที่เปิดสอน",
                        msgtime: `ไม่ได้เปิดระบบให้ลงทะเบียน ระบบเปิด ${data.toLocaleString(
                          "th-th",
                          {
                            year: "numeric",
                            day: "2-digit",
                            month: "long",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )} ถึง ${data1.toLocaleString("th-th", {
                          year: "numeric",
                          day: "2-digit",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`,
                      });
                    }
                  }
                }
              );
              return;
            } else if (!(data1 >= time)) {
              return res.status(404).json({
                msgerrortime: `ระบบการลงทะเบียนรายวิชาได้ปิดอยู่ในขณะนึ้ เปิดล่าสุด ${data.toLocaleString(
                  "th-th",
                  {
                    year: "numeric",
                    day: "2-digit",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )} ถึง ${data1.toLocaleString("th-th", {
                  year: "numeric",
                  day: "2-digit",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}`,
              });
            }
          }
          db.query(
            "Select subjects.id,idsubject,subjects.name,credit,years,subject_category.name as subject_category from subjects join subject_category on subjects.subject_category_id = subject_category.id where Isopen = 1",
            (err, results) => {
              if (err) {
                res.status(500).json({
                  msgerr: "Error Server Databases! Please calling admin to fix",
                });
              } else {
                if (results.length > 0) {
                  res.status(200).json({ results });
                } else {
                  res.status(200).json({ msg: "ไม่มีวิชาที่เปิดสอน" });
                }
              }
            }
          );
        }
      }
    }
  );
});

router.get("/teacher/subject/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "select status,S_date,E_date,S_time,E_time,type from timeSystem where id =1",
    (err, results) => {
      if (err) {
        res.status(500).json({
          msgerror: "Error Server Database! Please calling admin to fix",
        });
      } else {
        if (results[0].status === 0) {
          res.status(404).json({ msgerrortime: "ระบบไม่ได้เปิด" });
        } else {
          const time = new Date();
          if (
            results.type === 1 &&
            results[0].S_date &&
            results[0].E_date &&
            results[0].S_time &&
            results[0].E_time
          ) {
            const data = new Date(results[0].S_date);
            const [hours, minutes] = results[0].S_time.split(":").map(Number);
            data.setHours(hours);
            data.setMinutes(minutes);
            const data1 = new Date(results[0].E_date);
            const [hours1, minutes1] = results[0].E_time.split(":").map(Number);
            data1.setHours(hours1);
            data1.setMinutes(minutes1);
            if (!(data <= time && data1 >= time)) {
              res
                .status(404)
                .json({ msgerrortime: "ระบบไม่ได้เปิดในลงทะเบียน" });
              return;
            }
          }
          db.query(
            "select S.name,S.idsubject,S.credit,S.practice_t,S.lecture_t,S.years,Sr.name as subject_category,S.m_t  ,S.exsub from subjects S join subject_category Sr on Sr.id=S.subject_category_id  where IsOpen=1 and S.id=?",
            [id],
            (err, results) => {
              if (err) {
                console.log(err);
                res.status(500).json({
                  msgerror:
                    "Error Server Database! Please calling admin to fix",
                });
              } else {
                if (results.length > 0) {
                  res.status(200).json(results);
                } else {
                  res
                    .status(450)
                    .json({ msgerror: `${results}วิชานี้ไม่ได้ให้ลงทะเบียน` });
                }
              }
            }
          );
        }
      }
    }
  );
});

router.get("/admin/user/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "select U.name,U.email,U.role_id,R.name as role from user U join role R on U.role_id = R.id where U.id=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          msgerror: "Error Server Databases! Please calling admin to fix.",
        });
      } else {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ msgerror: "ไม่พบ user นี้" });
        }
      }
    }
  );
});

router.post("/admin/userupdate", (req, res) => {
  const { id, name, email, role_id } = req.body;
  if (id && name && email && role_id && name !== "" && email !== "") {
    db.query(
      "UPDATE user SET `email` = ?, `name` = ?, `role_id` = ? WHERE (`id` = ?)",
      [email, name, role_id, id],
      (err, results) => {
        if (err) {
          res.status(500).json({
            msgerror: "Error server Database ! Please calling admin.",
          });
        } else {
          res.status(200).json({ msg: "แก้ไขสำเร็จ" });
        }
      }
    );
  } else {
    res.status(500).json({ msgerror: "กรอกข้อมูลไม่ครบและไม่ถูกต้อง" });
  }
});

router.get("/admin/role", (req, res) => {
  db.query("select * from role", (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ msgerror: "Error server Database ! Please calling admin." });
    } else {
      res.status(200).json({ msg: "แก้ไขสำเร็จ" });
    }
  });
});

router.get("/years", (req, res) => {
  db.query("select distinct years from subjects", (err, results) => {
    if (err) {
      res.status(500).json({
        msgerror: "Error Server database ! Please calling admin to fix",
      });
    } else {
      res.status(200).json({ data: results });
    }
  });
});

router.get("/Searchsubject/:key", (req, res) => {
  const { key } = req.params;
  db.query(
    "select * from subjects where name like ? or idsubject like ? ",
    [`%${key}%`, `%${key}%`],
    (err, results) => {
      if (err) {
        res.status(500).json({
          msgerror: "Error Server database ! Please calling admin to fix",
        });
      } else {
        if (results.length > 0) {
          res.status(200).json({ data: results });
        } else {
          res.status(404).json({ error: "ไม่พบเจอ " + key });
        }
      }
    }
  );
});
router.get("/Searchsubjectopen/:key", (req, res) => {
  const { key } = req.params;
  db.query(
    "select * from subjects where (name like ? or idsubject like ?) and IsOpen=1 ",
    [`%${key}%`, `%${key}%`],
    (err, results) => {
      if (err) {
        res.status(500).json({
          msgerror: "Error Server database ! Please calling admin to fix",
        });
      } else {
        if (results.length > 0) {
          res.status(200).json({ data: results });
        } else {
          res.status(404).json({ error: "ไม่พบเจอ " + key });
        }
      }
    }
  );
});
router.get("/searchingbar", (req, res) => {
  const { type, search, years, category_id } = req.query;
  switch (type) {
    case "1":
      searchSubjects(res, search, years, category_id); //isopen time
      break;
    case "2":
      searchSubjectsNoIsOpen(res, search, years, category_id);
      break;
    case "3":
      searchSubjects3(res, search, years, category_id); //isopen nottime
      break;
    default:
      res.status(200).json({ msg: "ค้นหาไม่เจอ" });
  }
});
function searchSubjects3(res, search, years, category_id) {
  let query =
    "SELECT S.id, idsubject, S.name, credit, years, subject_category.name AS subject_category FROM subjects S JOIN subject_category ON S.subject_category_id = subject_category.id WHERE Isopen = 1";
  const queryParams = [];
  if (search) {
    query += " AND (S.name LIKE ? OR S.idsubject LIKE ?)";
    queryParams.push(`%${search}%`, `%${search}%`);
  }
  if (years) {
    query += " AND S.years = ?";
    queryParams.push(years);
  }
  if (category_id) {
    query += " AND subject_category.id = ?";
    queryParams.push(category_id);
  }
  db.query(query, queryParams, (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ msgerror: "Error Server database! Please call admin to fix" });
    } else {
      if (results.length > 0) {
        res.status(200).json({ results });
      } else {
        res.status(200).json({ msg: "ค้นหาไม่เจอ" });
      }
    }
  });
}
function searchSubjects(res, search, years, category_id) {
  let query =
    "SELECT S.id, idsubject, S.name, credit, years, subject_category.name AS subject_category FROM subjects S JOIN subject_category ON S.subject_category_id = subject_category.id WHERE Isopen = 1";
  const queryParams = [];
  if (search) {
    query += " AND (S.name LIKE ? OR S.idsubject LIKE ?)";
    queryParams.push(`%${search}%`, `%${search}%`);
  }
  if (years) {
    query += " AND S.years = ?";
    queryParams.push(years);
  }

  if (category_id) {
    query += " AND subject_category.id = ?";
    queryParams.push(category_id);
  }
  db.query(
    "select status,S_date,E_date,S_time,E_time,type from timeSystem where id =1",
    (err, results) => {
      const time = new Date();
      if (results[0].status === 1) {
        if (
          results[0].type === 1 &&
          results[0].S_date &&
          results[0].E_date &&
          results[0].S_time &&
          results[0].E_time
        ) {
          const data = new Date(results[0].S_date);
          const [hours, minutes] = results[0].S_time.split(":").map(Number);
          data.setHours(hours);
          data.setMinutes(minutes);
          const data1 = new Date(results[0].E_date);
          const [hours1, minutes1] = results[0].E_time.split(":").map(Number);
          data1.setHours(hours1);
          data1.setMinutes(minutes1);
          if (!(data <= time)) {
            db.query(query, queryParams, (err, results) => {
              if (err) {
                res.status(500).json({
                  msgerr: "Error Server Databases! Please calling admin to fix",
                });
              } else {
                if (results.length > 0) {
                  res.status(200).json({
                    results,
                    msgtime: `ไม่ได้เปิดระบบให้ลงทะเบียน ระบบเปิด ${data.toLocaleString(
                      "th-th",
                      {
                        year: "numeric",
                        day: "2-digit",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )} ถึง ${data1.toLocaleString("th-th", {
                      year: "numeric",
                      day: "2-digit",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`,
                  });
                } else {
                  res.status(200).json({
                    msg: "ไม่มีวิชาที่เปิดสอน",
                    msgtime: `ไม่ได้เปิดระบบให้ลงทะเบียน ระบบเปิด ${data.toLocaleString(
                      "th-th",
                      {
                        year: "numeric",
                        day: "2-digit",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )} ถึง ${data1.toLocaleString("th-th", {
                      year: "numeric",
                      day: "2-digit",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`,
                  });
                }
              }
            });
            return;
          } else if (!(data1 >= time)) {
            return res.status(404).json({
              msgerrortime: `ระบบการลงทะเบียนรายวิชาได้ปิดอยู่ในขณะนึ้ เปิดล่าสุด ${data.toLocaleString(
                "th-th",
                {
                  year: "numeric",
                  day: "2-digit",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )} ถึง ${data1.toLocaleString("th-th", {
                year: "numeric",
                day: "2-digit",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}`,
            });
          }
        } else {
          db.query(query, queryParams, (err, results) => {
            if (err) {
              res.status(500).json({
                msgerr: "Error Server Databases! Please calling admin to fix",
              });
            } else {
              if (results.length > 0) {
                res.status(200).json({ results });
              } else {
                res.status(200).json({ msg: "ไม่มีวิชาที่เปิดสอน" });
              }
            }
          });
        }
      } else {
        res.status(200).json({ msg: "ค้นหาไม่ได้" });
      }
    }
  );
}
function searchSubjectsNoIsOpen(res, search, years, category_id) {
  let query =
    "SELECT S.id, idsubject, S.name, credit, years, subject_category.name AS subject_category FROM subjects S JOIN subject_category ON S.subject_category_id = subject_category.id";
  const queryParams = [];
  if (search) {
    query += " WHERE (S.name LIKE ? OR S.idsubject LIKE ?)";
    queryParams.push(`%${search}%`, `%${search}%`);
  }

  if (years) {
    query += (queryParams.length > 0 ? " AND" : " WHERE") + " S.years = ?";
    queryParams.push(years);
  }

  if (category_id) {
    query +=
      (queryParams.length > 0 ? " AND" : " WHERE") + " subject_category.id = ?";
    queryParams.push(category_id);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ msgerror: "Error Server database! Please call admin to fix" });
    } else {
      if (results.length > 0) {
        res.status(200).json({ results });
      } else {
        res.status(200).json({ msg: "ค้นหาไม่เจอ" });
      }
    }
  });
}

router.get("/teacher/schedule_edit", (req, res) => {
  const { user_id, idreg } = req.query;
  db.query(
    "select Sr.N_people ,Sr.branch,S.lecture_t,S.practice_t,S.name,S.idsubject,S.credit,Sr.st,Sr.et,C.name as category,Sc.name as subc from subjectsRegister Sr join subjects S on Sr.Subjects_id = S.id join category C on C.id =category_id join subject_category Sc on Sc.id = S.subject_category_id where Sr.User_id = ? and Sr.id = ?",
    [user_id, idreg],
    (err, ru) => {
      if (err) {
        res.status(500).json({
          msgerror: "Error Server database! Please call admin to fix",
        });
      } else {
        if (ru.length > 0) {
          res.status(200).json(ru[0]);
        } else {
          res.status(404).json({ msg: "ไม่พบข้อมูล" });
        }
      }
    }
  );
});

router.get("/category", (req, res) => {
  db.query("select * from category", (err, results) => {
    if (err) {
      res.status(500).json({ msgerror: "Error database" });
    } else {
      res.status(200).json(results);
    }
  });
});
router.get("/countstatus1", (req, res) => {
  db.query(
    "select s.name,count(status_id) as counts,(select count(Isopen) from subjects where Isopen =1) as allopen from subjectsRegister Sr join status s on s.id = Sr.status_id group by status_id",
    (err, results) => {
      if (err) {
        res.status(500).json({ msgerror: "Error database", err });
      } else {
        if (results.length > 0) {
          res.status(200).json(results);
        } else {
          db.query(
            "select count(Isopen) as allopen from subjects where Isopen =1",
            (err, results) => {
              if (err) {
                res.status(500).json({ msgerror: "Error database", err });
              } else {
                if (results.length > 0) {
                  res
                    .status(200)
                    .json({ allopen: results[0].allopen, counts: 0 });
                } else {
                  res.status(200).json({ allopen: 0, counts: 0 });
                }
              }
            }
          );
        }
      }
    }
  );
});
router.get("/subjecthasregiscount", (req, res) => {
  db.query(
    "select count(id) as allopen,(select  count(distinct Sr.subjects_id) from subjectsRegister Sr) as subjectcont  from subjects where isopen=1",
    (err, results) => {
      if (err) {
        res.status(500).json({ msgerror: "Error database", err });
      } else {
        if (results.length > 0) {
          res.status(200).json(results);
        } else {
          res.status(200).json({ allopen: 0, counts: 0 });
        }
      }
    }
  );
});

router.get("/searchingnameteacher/:search", (req, res) => {
  const { search } = req.params;
  db.query(
    "SELECT * FROM user where (email like ?  or name like ?) and role_id = 1",
    [`%${search}%`, `%${search}%`],
    (err, results) => {
      if (err) {
        res.status(500).json({ msg: "error databases", err });
      } else {
        if (results.length > 0) {
          res.status(200).json({ data: results });
        } else {
          res.status(404).json({ error: "ไม่พบเจอ " + search });
        }
      }
    }
  );
});

router.get("/teacher/f/:id", (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT DISTINCT u.name,sr.st,sr.et,s.name as subject_name " +
    "FROM subjectsRegister AS sr" +
    " JOIN subjectsRegister AS sr2 ON sr.User_id = sr2.User_id" +
    " JOIN subjects s on s.id=sr.Subjects_id " +
    " JOIN user u on u.id=sr.user_id" +
    " WHERE sr.status_id = 3 " +
    " AND sr.id != ? " +
    " AND sr.st < (SELECT et FROM subjectsRegister WHERE id = ?) " +
    " AND sr.et > (SELECT st FROM subjectsRegister WHERE id = ?)";
  db.query(sql, [id, id, id], (err, results) => {
    if (err) {
      res.status(500).json({ msg: "error databases", err });
    } else {
      if (results.length > 0) {
        res.status(200).json({ data: results });
      } else {
        res.status(404).json({ msg: "ไม่พบ" });
      }
    }
  });
});

router.get("/menuslider/:role_id", (req, res) => {
  const { role_id } = req.params;
  db.query(
    "SELECT a.linkpath as path,a.icon,a.pathname as label FROM allowlink_has_role join allowlink a on a.id=allowlink_id where role_id=? and a.icon is not null and pathname is not null",
    [role_id],
    (err, results) => {
      if (err) {
        res.status(500).json({ msgerror: "Error database", err });
      } else {
        res.status(200).json(results);
      }
    }
  );
});
router.get("/allowlink/:role_id", (req, res) => {
  const { role_id } = req.params;
  db.query(
    "SELECT a.linkpath as path,a.icon,a.pathname as label FROM allowlink_has_role join allowlink a on a.id=allowlink_id where role_id=? and a.icon is not null and pathname is not null",
    [role_id],
    (err, results) => {
      if (err) {
        res.status(500).json({ msgerror: "Error database", err });
      } else {
        res.status(200).json(results);
      }
    }
  );
});
function GenSec() {
  db.query(
    "SELECT distinct sr.subjects_id as id FROM subjectsRegister sr",
    (err, results) => {
      if (err) {
        console.error(err);
        logReport("Failed to add sec numbers.");
        return;
      }

      results.forEach((subject) => {
        db.query(
          "SELECT sr.id,sr.category_id FROM subjectsRegister sr JOIN subjects s ON sr.subjects_id = s.id WHERE sr.subjects_id =? AND sr.status_id = 1",
          [subject.id],
          (err2, results2) => {
            if (err2) {
              console.error(err2);
              logReport("Failed to add sec numbers.");
              return;
            }

            let l = 800;
            let p = 830;

            results2.forEach((entry) => {
              let secNumber;
              if (entry.category_id === 1) {
                secNumber = l++;
              } else if (entry.category_id === 2) {
                secNumber = p++;
              } else if (entry.category_id === 3) {
                secNumber = `${l}/${p++}`;
                l++;
              }

              db.query(
                "UPDATE subjectsRegister SET `sec` = ? WHERE `id` = ?",
                [secNumber, entry.id],
                (err3, results3) => {
                  if (err3) {
                    console.error(err3);
                    logReport("Failed to add sec numbers.");
                  }
                }
              );
            });
          }
        );
      });
    }
  );
}
router.get("/export/file", async (req, res) => {
  try {
    GenSec();
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("ตารางสอน");
    worksheet.mergeCells("A1:A2");
    worksheet.getCell("A1").value = "รหัสวิชา";
    worksheet.mergeCells("B1:B2");
    worksheet.getCell("B1").value = "รหัสวิชา-พ.ศ.หลักสูตร";
    worksheet.mergeCells("C1:C2");
    worksheet.getCell("C1").value = "ชื่อวิชา";
    worksheet.mergeCells("D1:N1");
    worksheet.getCell("I1").value = "บรรยาย";
    worksheet.getCell("I1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    const lectureColumns = [
      "หน่วยกิต",
      "หน่วย",
      "จำนวน ชม.",
      "หมู่",
      "วัน",
      "เริ่ม",
      "-",
      "สิ้นสุด",
      "ห้อง",
      "สาขา",
      "จำนวน",
    ];
    lectureColumns.forEach((value, index) => {
      const cell = worksheet.getCell(`${String.fromCharCode(68 + index)}2`);
      cell.value = value;
    });
    worksheet.mergeCells("O1:X1");
    const cell = worksheet.getCell("O1");
    cell.value = "ปฎิบัติ";
    cell.alignment = { horizontal: "center", vertical: "middle" };
    lectureColumns.forEach((value, index) => {
      if (index >= 1) {
        const cell = worksheet.getCell(
          `${String.fromCharCode(79 + index - 1)}2`
        );
        cell.value = value;
      }
    });
    worksheet.mergeCells("Y1:Y2");
    worksheet.getCell("Y1").value = "อาจารย์";
    worksheet.mergeCells("Z1:Z2");
    worksheet.getCell("Z1").value = "หมายเหตุ";
    let row = 3;
    const results12 = await new Promise((resolve, reject) => {
      db.query(
        "select count(status_id) as c from subjectsRegister where status_id=1;",
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
    if (results12.length === 0) {
      return res.status(404).json({ msgerror: "ไม่มีข้อมูลให้ export files" });
    }
    const results3 = await new Promise((resolve, reject) => {
      db.query(
        "select count(status_id) as c from subjectsRegister;",
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
    if (results3.length === 0) {
      return res.status(404).json({ msgerror: "ไม่มีข้อมูลให้ export files" });
    } else {
      if (results3[0].c !== results12[0].c) {
        return res
          .status(404)
          .json({ msgerror: "ข้อมูลยังไม่มีสถานะผ่านทั้งหมด" });
      }
    }
    const results = await new Promise((resolve, reject) => {
      db.query(
        "select distinct Subjects_id,s.idsubject,s.name,s.credit,s.practice_t,s.m_t,s.lecture_t,s.years,realcredit from subjectsRegister join subjects s on s.id=Subjects_id order by Subjects_id",
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    for (const v of results) {
      const results1 = await new Promise((resolve, reject) => {
        db.query(
          "select distinct user_id,user.name from subjectsRegister join user on user_id=user.id where Subjects_id=?",
          [v.Subjects_id],
          (err, results1) => {
            if (err) {
              reject(err);
            } else {
              resolve(results1);
            }
          }
        );
      });

      for (const v1 of results1) {
        const results2 = await new Promise((resolve, reject) => {
          db.query(
            "select *,(SELECT TIMEDIFF(et, st)) AS time_diff,d.name as dayname from subjectsRegister join day d on d.id=day_id where user_id=? and status_id=1 and Subjects_id=? order by sec",
            [v1.user_id, v.Subjects_id],
            (err, results2) => {
              if (err) {
                reject(err);
              } else {
                resolve(results2);
              }
            }
          );
        });
        worksheet.getCell("A" + row).value = v.idsubject;
        worksheet.getCell("B" + row).value = v.idsubject + "-" + v.years;
        worksheet.getCell("C" + row).value = v.name;
        worksheet.getCell("D" + row).value =
          v.realcredit === 0
            ? `${v.credit} (${v.lecture_t}-${v.practice_t}-${v.m_t})`
            : v.realcredit;
        worksheet.getCell("E" + row).value =
          v.lecture_t === 0 ? "" : v.lecture_t;
        worksheet.getCell("O" + row).value =
          v.practice_t === 0 ? "" : v.practice_t;
        console.log(v1.name, v.name);
        if (results2.length >= 2) {
          results2.map((data) => {
            worksheet.getCell("Y" + row).value = v1.name;
            if (data.category_id === 1) {
              const h = Number(data.time_diff.split(":")[0]);
              const m = Number(data.time_diff.split(":")[1]);
              worksheet.getCell("F" + row).value = Number(
                `${h}` + (m >= 1 ? `.${m}` : "")
              );
              worksheet.getCell("G" + row).value = data.sec;
              worksheet.getCell("H" + row).value = data.dayname;
              worksheet.getCell("I" + row).value = data.st;
              worksheet.getCell("J" + row).value = "-";
              worksheet.getCell("K" + row).value = data.et;
              worksheet.getCell("M" + row).value = Object.keys(data.branch)
                .map((key) => `${key}/${data.branch[key].join(",")}`)
                .join(", ");
              worksheet.getCell("N" + row).value = data.N_people;
            } else if (data.category_id === 2) {
              const h = Number(data.time_diff.split(":")[0]);
              const m = Number(data.time_diff.split(":")[1]);
              worksheet.getCell("P" + row).value = Number(
                `${h}` + (m >= 1 ? `.${m}` : "")
              );
              worksheet.getCell("Q" + row).value = data.sec;
              worksheet.getCell("R" + row).value = data.dayname;
              worksheet.getCell("S" + row).value = data.st;
              worksheet.getCell("T" + row).value = "-";
              worksheet.getCell("U" + row).value = data.et;
              worksheet.getCell("W" + row).value = Object.keys(data.branch)
                .map((key) => `${key}/${data.branch[key].join(",")}`)
                .join(", ");
              worksheet.getCell("X" + row).value = data.N_people;
            } else if (data.category_id === 3) {
              const h = Number(data.time_diff.split(":")[0]);
              const m = Number(data.time_diff.split(":")[1]);
              worksheet.getCell("F" + row).value =
                h - v.lecture_t >= 1
                  ? h - v.lecture_t
                  : "มีข้อผิดพลาดตอนเลือกเวลา";
              worksheet.getCell("G" + row).value = data.sec.split("/")[0];
              worksheet.getCell("H" + row).value = data.dayname;
              worksheet.getCell("I" + row).value = data.st;
              worksheet.getCell("J" + row).value = "-";
              const dataEtParts = data.et.split(":").map(Number); // แปลงเวลาให้เป็นอาร์เรย์ของชั่วโมง นาที วินาที
              const dataEtTotalMinutes = dataEtParts[0] * 60 + dataEtParts[1]; // คำนวณเวลาให้เป็นจำนวนนาทีทั้งหมด
              const dataEtMinusPracticeTMinutes =
                dataEtTotalMinutes - v.lecture_t * 60; // ลบจำนวนชั่วโมงของ v.practice_t ออกจากเวลาของ data.et ในหน่วยนาที
              const hours = Math.floor(dataEtMinusPracticeTMinutes / 60); // แยกจำนวนชั่วโมงจากจำนวนนาที
              const minutes = dataEtMinusPracticeTMinutes % 60; // หาเศษของจำนวนนาทีที่เหลือ
              const resultTime = `${hours < 10 ? "0" : ""}${hours}:${
                minutes < 10 ? "0" : ""
              }${minutes}`;
              worksheet.getCell("K" + row).value = resultTime;
              worksheet.getCell("M" + row).value = Object.keys(data.branch)
                .map((key) => `${key}/${data.branch[key].join(",")}`)
                .join(", ");
              worksheet.getCell("N" + row).value = data.N_people;
              worksheet.getCell("P" + row).value =
                v.practice_t + v.lecture_t === data.h
                  ? v.practice_t
                  : "มีข้อผิดพลาดตอนเลือกเวลา";
              worksheet.getCell("Q" + row).value = data.sec.split("/")[1];
              worksheet.getCell("R" + row).value = data.dayname;
              worksheet.getCell("S" + row).value = resultTime;
              worksheet.getCell("T" + row).value = "-";
              worksheet.getCell("U" + row).value = data.et;
              worksheet.getCell("W" + row).value = Object.keys(data.branch)
                .map((key) => `${key}/${data.branch[key].join(",")}`)
                .join(", ");
              worksheet.getCell("X" + row).value = data.N_people;
            }
            row++;
          });
        } else {
          if (results2.length > 0) {
            worksheet.getCell("Y" + row).value = v1.name;
            const data = results2[0];
            if (data.category_id === 1) {
              const h = Number(data.time_diff.split(":")[0]);
              const m = Number(data.time_diff.split(":")[1]);
              worksheet.getCell("F" + row).value = Number(
                `${h}` + (m >= 1 ? `.${m}` : "")
              );
              worksheet.getCell("G" + row).value = data.sec;
              worksheet.getCell("H" + row).value = data.dayname;
              worksheet.getCell("I" + row).value = data.st;
              worksheet.getCell("J" + row).value = "-";
              worksheet.getCell("K" + row).value = data.et;
              worksheet.getCell("M" + row).value = Object.keys(data.branch)
                .map((key) => `${key}/${data.branch[key].join(",")}`)
                .join(", ");
              worksheet.getCell("N" + row).value = data.N_people;
            } else if (data.category_id === 2) {
              const h = Number(data.time_diff.split(":")[0]);
              const m = Number(data.time_diff.split(":")[1]);
              worksheet.getCell("P" + row).value = Number(
                `${h}` + (m >= 1 ? `.${m}` : "")
              );
              worksheet.getCell("Q" + row).value = data.sec;
              worksheet.getCell("R" + row).value = data.dayname;
              worksheet.getCell("S" + row).value = data.st;
              worksheet.getCell("T" + row).value = "-";
              worksheet.getCell("U" + row).value = data.et;
              worksheet.getCell("W" + row).value = Object.keys(data.branch)
                .map((key) => `${key}/${data.branch[key].join(",")}`)
                .join(", ");
              worksheet.getCell("X" + row).value = data.N_people;
            } else if (data.category_id === 3) {
              const h = Number(data.time_diff.split(":")[0]);
              const m = Number(data.time_diff.split(":")[1]);
              worksheet.getCell("F" + row).value =
                h - v.practice_t >= 1
                  ? h - v.practice_t
                  : "มีข้อผิดพลาดตอนเลือกเวลา";
              worksheet.getCell("G" + row).value = data.sec.split("/")[0];
              worksheet.getCell("H" + row).value = data.dayname;
              worksheet.getCell("I" + row).value = data.st;
              worksheet.getCell("J" + row).value = "-";
              const dataEtParts = data.et.split(":").map(Number); // แปลงเวลาให้เป็นอาร์เรย์ของชั่วโมง นาที วินาที
              const dataEtTotalMinutes = dataEtParts[0] * 60 + dataEtParts[1]; // คำนวณเวลาให้เป็นจำนวนนาทีทั้งหมด
              const dataEtMinusPracticeTMinutes =
                dataEtTotalMinutes - v.practice_t * 60; // ลบจำนวนชั่วโมงของ v.practice_t ออกจากเวลาของ data.et ในหน่วยนาที
              const hours = Math.floor(dataEtMinusPracticeTMinutes / 60); // แยกจำนวนชั่วโมงจากจำนวนนาที
              const minutes = dataEtMinusPracticeTMinutes % 60; // หาเศษของจำนวนนาทีที่เหลือ
              const resultTime = `${hours < 10 ? "0" : ""}${hours}:${
                minutes < 10 ? "0" : ""
              }${minutes}`;
              worksheet.getCell("K" + row).value = resultTime;
              worksheet.getCell("M" + row).value = Object.keys(data.branch)
                .map((key) => `${key}/${data.branch[key].join(",")}`)
                .join(", ");
              worksheet.getCell("N" + row).value = data.N_people;
              worksheet.getCell("P" + row).value =
                v.practice_t + v.lecture_t === h
                  ? v.practice_t
                  : hours;
              worksheet.getCell("Q" + row).value = data.sec.split("/")[1];
              worksheet.getCell("R" + row).value = data.dayname;
              worksheet.getCell("S" + row).value = resultTime;
              worksheet.getCell("T" + row).value = "-";
              worksheet.getCell("U" + row).value = data.et;
              worksheet.getCell("W" + row).value = Object.keys(data.branch)
                .map((key) => `${key}/${data.branch[key].join(",")}`)
                .join(", ");
              worksheet.getCell("X" + row).value = data.N_people;
            }
          }
          row++;
        }
      }
    }

    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
    const filesname = "ตาราง" + new Date().getTime() + ".xlsx";
    await workbook.xlsx.writeFile("public/export/" + filesname);
    console.log("Excel file created successfully");
    res.status(200).redirect("http://localhost:4133/export/" + filesname);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error creating Excel file");
  }
});
router.delete("/teacher/deleteReg/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ msg: "กำหนดที่ละลบด้วยครับ" });
  }
  db.query(
    "DELETE FROM subjectsRegister WHERE (`id` = ?);",
    [id],
    (err, results) => {
      if (err) {
        res.status(500).json({
          msgerror:
            "ไม่สามารถลบมีปัญหา database server กรุณาแจ้ง admin เพื่อแก้ไข",
        });
      } else {
        res.status(200).json({ msg: "ลบการลงทะเบียนสำเร็จ" });
      }
    }
  );
});

router.delete("/subjectRegister/all", (req, res) => {
  db.query("select * from subjectsRegister", async (err, results) => {
    if (err) {
      res
        .status(500)
        .json({ msgerror: "ไม่สามารถเข้าถึงฐานข้อมูล กรุณาติดต่อผู้ดูแลระบบ" });
    } else {
      let errors = [];
      let successes = [];

      for (const record of results) {
        await new Promise((resolve, reject) => {
          db.query(
            "DELETE FROM subjectsRegister where id=?",
            [record.id],
            (err, result) => {
              if (err) {
                errors.push({
                  id: record.id,
                  msg: "เกิดข้อผิดพลาดในการลบข้อมูล",
                });
                reject(err);
              } else {
                successes.push(record.id);
                resolve(result);
              }
            }
          );
        });
      }

      if (errors.length > 0) {
        res.status(500).json({ errors: errors });
      } else {
        res
          .status(200)
          .json({ msg: "ลบข้อมูลทั้งหมดเสร็จสิ้น", deleted_ids: successes });
      }
    }
  });
});

module.exports = router;
