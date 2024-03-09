const express = require('express');
const cors = require('cors');
const peterRoutes = require('./task/peter');
const frameRoutes = require('./task/frame');
const fahRoutes = require('./task/fah');
const settingRoutes = require('./task/setting');
const auto = require("./task/auto")
const chalk = require('chalk');
const path = require('path');
const fs = require("fs")
const app = express();
const port = 4133;
//check folder files exists?
if (!fs.existsSync("files")) {
  fs.mkdirSync("files")
}
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const now = new Date().toString().slice(16, 24);
  res.on("finish", () => {
    console.log(`${chalk.bgGreen(req.method + " ")}${res.statusCode < 400 ? chalk.bgBlue(" " + res.statusCode + " ") : res.statusCode < 500 ? chalk.bgRed(" " + res.statusCode + " ") : chalk.bgYellow(" " + res.statusCode + " ")} ${now} ${req.originalUrl}`);
  });
  next();
});
app.use('/api', peterRoutes);
app.use('/api', frameRoutes);
app.use('/api', fahRoutes);
app.use('/api', settingRoutes);
app.get('/download/:file', (req, res) => {
  const { file } = req.params;
  res.sendFile(path.join(__dirname, 'public/savefiles/' + file));
})
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})
app.get("/pidprocess",(req,res) => {
    res.status(200).send(process.pid.toString())
})
app.get('/restart-server', (req, res) => {
  res.send('Server is restarting...');
  const { spawn } = require('child_process');
  const child = spawn('node', ['app.js'], {
    detached: true,
    stdio: 'ignore',
  });
  console.log(child.pid)
  child.unref();
  process.exit(0);
});
app.get('/stop-server', (req, res) => {
  res.send('Server is restarting...');
  process.exit(0);
});
app.listen(port, () => {
  console.log()
  console.log(chalk.bgRed(` Server is running on` + chalk.bgGreen(` port ${port} `) + "\n"));
  console.log("=======================================\n")
  console.log('  api on web: ', chalk.bgBlue(` http://localhost:${port}/ \n`))
  console.log("=======================================\n")
});
