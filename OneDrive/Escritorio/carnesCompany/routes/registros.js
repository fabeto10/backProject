const express = require("express");
const router = express.Router();
const connection = require("../db/mysql");

// Define las rutas para manejar los registros

router.get("/", (req, res) => {
  connection.query("SELECT * FROM clientes", (err, rows) => {
    if (err) {
      console.error("Error al realizar la consulta: ", err);
      res.status(500).json({ error: "Error al realizar la consulta" });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;
