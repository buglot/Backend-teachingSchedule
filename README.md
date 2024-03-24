# backend web with express + mysql
## easy run one command
#### cmd windows
```cmd 
docker pull ptii2x/teachingschedule-mysql-tastcase && docker container rm -f mysqltestcase && docker run -d --name mysqltestcase -p 6000:3306 ptii2x/teachingschedule-mysql-tastcase && git pull && npm i && timeout /t 60 && npm start
```
#### powershell windows
```powershell 
docker pull ptii2x/teachingschedule-mysql-tastcase; docker container rm -f mysqltestcase; docker run -d --name mysqltestcase -p 6000:3306 ptii2x/teachingschedule-mysql-tastcase; git pull; npm i; Start-Sleep -Seconds 60; npm start
```
## mysql แบบง่ายเข้า docker
### เลือก1อัน 
โดยต่างที่ว่า
 > only table มีแต่ table ไม่มีข้อมูล

 > somedata มีแค่ ประเภท (บรรยาย ปฏิบัติ) สถานะ(ผ่าน ไม่ผ่าน รอ) role(อจ ฝ่ายการศึกษา แอดมิน) เป็นต้น

 > testcase มีข้อมูลหมดพอ testcase มั้ง วิชา วิชาลงทะเบียน มี email สถานะ มีการลงทะเบียนวิชา
 
- 1.database mysql `docker in commend line` testcase 
```cmd
    docker pull ptii2x/teachingschedule-mysql-tastcase
```

- 2.database mysql `docker in commend line` some data
```cmd
    docker pull ptii2x/teachingschedule-mysql-tastcase
```

- 3.database mysql `docker in commend line` only table
```cmd
    docker pull ptii2x/teachingschedule-mysql-tastcase
```
### หลังจากนั้น
- ตัวอย่าง `docker run -d --name <ชื่ออะไรก็ได้> -p <postตามใจ>:3306 <ลิ้งdockeที่pullมา>`
```cmd
docker run -d --name mysqltestcase -p 6000:3306 ptii2x/teachingschedule-mysql-tastcase
```

## หรือ เอาไฟล์ import เองไม่ใช้ docker
มีสามไฟล์
- 1.`basetable.sql` only table
- 2.`basetableandsomedata.sql` some data
- 3.`basetableandTestcase.sql` testcase 
เลือกอันใดอันหนึ่ง

## only table on mysql workbench
`basetable.mwb` 
