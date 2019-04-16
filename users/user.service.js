const config = require("config.json");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
  authenticate
};

async function authenticate({ username, password }) {
  var sql =
    "SELECT username, hash, firstname, lastname, createdDate FROM `user` WHERE `username`='" +
    username +
    "' and hash = '" +
    password +
    "'";

  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        let user = results[0];
        resolve(user);
      }
    });
  });
}
