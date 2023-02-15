const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(cors());

const corsOptions = {
  origin: "http://localhost:8100",
};

app.use(cors(corsOptions));
const port = process.env.PORT || 3000;
// Conexión a la base de datos
mongoose.connect("mongodb://localhost:27017/platos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definición del modelo
const platoSchema = new mongoose.Schema({
  Color: String,
  Precio: Number,
  Campos: Array,
  id: mongoose.Schema.Types.ObjectId,
  Nombre: String,
  fecha: Date,
  oferta: Boolean,
});

const Plato = mongoose.model("plato", platoSchema);

// Middleware para analizar los datos del cuerpo de la solicitud
app.use(bodyParser.json());

// Rutas de la API
app.get("/platos", (req, res) => {
  // Obtener todos los platos
  Plato.find((err, platos) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(platos);
    }
  });
});

app.post("/platos", (req, res) => {
  // Crear un nuevo plato
  const plato = new Plato({
    _id: new mongoose.Types.ObjectId(),
    Campos: [],
    ...req.body,
  });

  // Agregar el espacio de memoria a la matriz Campos
  const dbMemory = { type: "database", name: "mongodb", size: "1GB" };
  plato.Campos.push(dbMemory);

  plato.save((err, plato) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(plato);
    }
  });
});

app.put("/platos/:id", (req, res) => {
  // Actualizar un plato existente
  Plato.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, plato) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(plato);
      }
    }
  );
});

app.delete("/platos/:id", (req, res) => {
  // Eliminar un plato existente
  Plato.findByIdAndDelete(req.params.id, (err, plato) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(plato);
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
