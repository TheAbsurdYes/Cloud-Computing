const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "data/mock.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
    }
  }
);

function findAll() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM products";

    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM products WHERE id = ?";

    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO products (name, description, price) VALUES(?,?,?)";

    if (process.env.NODE_ENV !== "test") {
      db.run(sql, [product.name, product.description, product.price], (err) => {
        reject(err);
      });
    }
    resolve(product);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";

    if (process.env.NODE_ENV !== "test") {
      db.run(
        sql,
        [product.name, product.description, product.price, id],
        (err) => {
          if (err) {
            reject(err);
          }
        }
      );
    }

    findById(id)
      .then((product) => {
        resolve(product);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM products WHERE id = ?";

    if (process.env.NODE_ENV !== "test") {
      db.run(sql, [id], (err) => {
        if (err) {
          reject(err);
        }
      });
    }
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
