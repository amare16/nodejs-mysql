const config = require("config.json");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
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
      } else if (results.length) {
        let user = results[0];
        const token = jwt.sign({ sub: user.id }, config.secret);

        resolve({
          ...user,
          token
        });
      } else {
        resolve(results[0]);
      }
    });
  });
}

async function getAll() {
  let getAllUserSqlQuery = "SELECT * FROM `USER`";

  return new Promise((resolve, reject) => {
    db.query(getAllUserSqlQuery, (err, results) => {
      if (results.length) {
        return resolve(results);
      } else {
        return reject(err);
      }
    });
  });
}

async function getById(id) {
  var sql =
    "SELECT id, username, hash, firstname, lastname FROM `user` WHERE `id`=" +
    id;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (results.length) {
        return resolve(results[0]);
      } else {
        return reject("User is not found");
      }
    });
  });
}

async function create(userParam) {
  let username = userParam.username;
  let password = userParam.password;
  let firstname = userParam.firstname;
  let lastname = userParam.lastname;

  var checkUserSqlQuery =
    "SELECT username, hash, firstname, lastname, createdDate FROM `user` WHERE `username`='" +
    username +
    "'";

  var createUserSqlQuery =
    "INSERT INTO `user` (`username`, `hash`, `firstname`, `lastname`) VALUES ('" +
    username +
    "', '" +
    password +
    "', '" +
    firstname +
    "', '" +
    lastname +
    "')";

  return new Promise((resolve, reject) => {
    db.query(checkUserSqlQuery, (err, results) => {
      if (results.length) {
        return reject("Username already exists");
      } else {
        db.query(createUserSqlQuery, (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve();
          }
        });
      }
    });
  });
}

async function update(id, userParam) {
  let updateUserSqlQuery =
    "UPDATE user SET username = '" + userParam.username + "' WHERE id = " + id;

  return new Promise((resolve, reject) => {
    getById(id)
      .then(() => {
        db.query(updateUserSqlQuery, (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve();
          }
        });
      })
      .catch(err => {
        return reject(err);
      });
  });
}

async function _delete(id) {
  let deleteUserSqlQuery = "DELETE FROM user WHERE id = " + id;

  return new Promise((resolve, reject) => {
    db.query(deleteUserSqlQuery, (err, results) => {
      if (results.affectedRows) {
        resolve();
      } else {
        reject("User doesn't exist");
      }
    });
  });
}
