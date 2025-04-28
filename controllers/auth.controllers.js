import { pool } from "../db/db.js";
import CryptoJS from "crypto-js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const hashed = CryptoJS.SHA256(password).toString();

  const [rows] = await pool.query(
    "SELECT id, username FROM users WHERE email=? AND password=?",
    [email, hashed]
  );

  if (rows.length) {
    res.json({ ok: true, user: rows[0] });
  } else {
    res.status(401).json({ ok: false, msg: "Credenciales inválidas" });
  }
};