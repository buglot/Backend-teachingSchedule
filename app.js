const express = require('express');
const cors = require('cors');
const peterRoutes = require('./task/peter');
const frameRoutes = require('./task/frame');
const fahRoutes = require('./task/fah');
const chalk = require('chalk');
const session = require('express-session');
const passport = require('passport');
const app = express();
const port = 4133;
app.use(cors());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use((req, res, next) => {
  const now = new Date().toString().slice(16, 24);
  res.on("finish", () => {
   console.log(`${chalk.bgGreen(req.method+" ")}${res.statusCode <400?chalk.bgBlue(" "+res.statusCode+" "):res.statusCode<500?chalk.bgRed(" "+res.statusCode+" "):chalk.bgYellow(" "+res.statusCode+" ")} ${now} ${req.originalUrl}`);
  });
  next();
 });
app.use('/api', peterRoutes);
app.use('/api', frameRoutes);
app.use('/api', fahRoutes);
app.listen(port, () => {
  console.log()
  console.log(chalk.bgRed(` Server is running on` + chalk.bgGreen(` port ${port} `) + "\n"));
  console.log("=======================================\n")
  console.log('  api on web: ', chalk.bgBlue(` http://localhost:${port}/ \n`))
  console.log("=======================================\n")
});
