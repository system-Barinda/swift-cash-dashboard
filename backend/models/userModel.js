const db = require("../config/db");

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      }
    );
  });
}

function createUser(email, password) {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

module.exports = {
  findUserByEmail,
  createUser
};