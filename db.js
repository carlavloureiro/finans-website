const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./emails.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cadastros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

function salvarEmail(email) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO cadastros (email) VALUES (?)`, [email], function(err) {
      if (err) return reject(err);
      resolve(true);
    });
  });
}

module.exports = { salvarEmail };
