const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/usuarios', require('./routes/users.routes'));
app.use('/login', require('./routes/auth.routes'));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
