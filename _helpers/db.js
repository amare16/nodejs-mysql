// const config = require("config.json");
const mysql = require("mysql");

// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
// mongoose.Promise = global.Promise;

const db = mysql.createConnection({
  host: "localhost",
  user: "qdan",
  password: "derpderp",
  database: "app"
});

// connect to database
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

global.db = db;

module.exports = db;

// Exemple de requête
// let query = "SELECT * FROM `user`";

// db.query(query, (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result);
//   }
// });

// module.exports = {
//     User: require('../users/user.model')
// };
