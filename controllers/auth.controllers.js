const db = require('../db/db');
const { verifyPassword } = require('../utils/hash');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query(
      'SELECT hash, salt FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const { hash, salt } = rows[0];
    const isValid = verifyPassword(password, hash, salt);

    if (!isValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el login' });
  }
};

module.exports = {
  login
};
