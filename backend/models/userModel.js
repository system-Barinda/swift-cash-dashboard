const db = require("../config/db");

/* =========================
   FIND USER BY EMAIL
========================= */

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, results) => {

        if (err) {
          return reject(err);
        }

        if (!results || results.length === 0) {
          return resolve(null);
        }

        resolve(results[0]);
      }
    );

  });
}


/* =========================
   CREATE USER
========================= */

function createUser(email, password) {
  return new Promise((resolve, reject) => {

    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password],
      (err, result) => {

        if (err) {
          return reject(err);
        }

        resolve(result);
      }
    );

  });
}

module.exports = {
  findUserByEmail,
  createUser
};