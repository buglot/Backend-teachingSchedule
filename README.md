## backend web with epress + mysql
#### mysql แบบง่ายเข้า docker
##### เลือก1อัน
- 1. database mysql `docker` testcase 
```cmd
    docker pull ptii2x/teachingschedule-mysql-tastcase
```

- 2. database mysql `docker` some data
```cmd
    docker pull ptii2x/teachingschedule-mysql-tastcase
```

- 3. database mysql `docker` only table
```cmd
    docker pull ptii2x/teachingschedule-mysql-tastcase
```
##### หลังจาก
- ตัวอย่าง `docker run -d --name <ชื่ออะไรก็ได้> -p <postตามใจ>:3306 <ลิ้งdockeที่pullมา>`
```cmd
docker run -d --name mysqltestcase -p 6000:3306 ptii2x/teachingschedule-mysql-tastcase
```

#### หรือ เอาไฟล์ import เองไม่ใช้ docker
มีสามไฟล์
- 1. `basetable.sql`
- 2. `basetableandsomedata.sql`
- 3. `basetableandTestcase.sql`
เลือกอันใดอันหนึ่ง