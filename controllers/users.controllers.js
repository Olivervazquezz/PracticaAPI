const db = require('../db/db');
const { hashPassword } = require('../utils/hash');

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const { hash, salt } = hashPassword(password);

    await db.query(
      'INSERT INTO users (username, email, hash, salt) VALUES (?, ?, ?, ?)',
      [username, email, hash, salt]
    );

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

module.exports = {
  createUser
};
