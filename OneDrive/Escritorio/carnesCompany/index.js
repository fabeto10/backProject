const express = require('express');
const registrosRouter = require('./routes/registros');

const app = express();
const port = 3000;

// Otro código de configuración de Express

app.use('/registros', registrosRouter);

// Otro código de configuración de Express

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
