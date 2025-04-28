import { pool } from "../db/db.js";
import CryptoJS from "crypto-js";

const hash = (pwd) => CryptoJS.SHA256(pwd).toString();

export const getUsers = async (_, res) => {
  const [rows] = await pool.query("SELECT id, username, email, created_at FROM users");
  res.json(rows);
};

export const getUser = async (req, res) => {
  const [rows] = await pool.query("SELECT id, username, email, created_at FROM users WHERE id=?", [req.params.id]);
  rows.length ? res.json(rows[0]) : res.status(404).send("No existe");
};

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  await pool.query("INSERT INTO users (username,email,password) VALUES (?,?,?)",
                   [username, email, hash(password)]);
  res.status(201).send("Creado");
};

export const updateUser = async (req, res) => {
  const { username, email } = req.body;
  await pool.query("UPDATE users SET username=?, email=? WHERE id=?",
                   [username, email, req.params.id]);
  res.send("Actualizado");
};

export const deleteUser = async (req, res) => {
  await pool.query("DELETE FROM users WHERE id=?", [req.params.id]);
  res.send("Eliminado");
};
