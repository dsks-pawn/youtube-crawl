import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from 'config'

var app = express();




// let options = {
//   useNewUrlParser: config.get("mongodb.useNewUrlParser"),
//   db: config.get("mongodb.db"),
//   server: config.get("mongodb.server"),
//   user: config.get("mongodb.user"),
//   pass: config.get("mongodb.pass"),
// }

// mongoose.connect(`mongodb://localhost:27017/${config.get("mongodb.database")}`, options, (err) => {
//   if (err) {
//     console.log(`Connect DB failed. Error ${err}`);
//   } else {
//     console.log('Connect DB successfully');
//   }
// });

// mkdir /c/Users/Administrator/Desktop/node-vue-x2js/server/database
// mongod --port 27017 --dbpath /c/Users/Administrator/Desktop/node-vue-x2js/server/database
// mongo --port 27017
// use project_node_vue
// db.createUser({user:"admin", pwd:"admin", roles: ["readWrite", "dbAdmin", "dbOwner"]})
// mongod --auth --port 27017 --dbpath /c/Users/Administrator/Desktop/node-vue-x2js/server/database
// mongo --port 27017 -u "admin" -p "admin" --authenticationDatabase "project_node_vue"


// mkdir /Users/thanh/Desktop/node-vue-x2js/server/database2
// mongod --port 27017 --dbpath /Users/thanh/Desktop/node-vue-x2js/server/database
// mongo --port 27017
// use project_node_vue
// db.createUser({user:"admin", pwd:"admin", roles: ["readWrite", "dbAdmin", "dbOwner"]})
// mongod --auth --port 27017 --dbpath /Users/thanh/Desktop/node-vue-x2js/server/database
// mongo --port 27017 -u "admin" -p "admin" --authenticationDatabase "project_node_vue"


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CẤU HÌNH STATIC 2 KIỂU VIẾT
// app.use("/static", express.static(__dirname + "/public"))
app.use(express.static(path.join(__dirname, 'public')));


const routes = require(__dirname + "/routes")
app.use(routes)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;