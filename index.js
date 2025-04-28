import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import indexRoutes from "./routes/index.routes.js";
import userRoutes  from "./routes/users.routes.js";
import authRoutes  from "./routes/auth.routes.js";

const app = express();

// middlewares globales
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// rutas
app.use(indexRoutes);
app.use("/users", userRoutes);
app.use("/login", authRoutes);

// arranque
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀  API ready → http://localhost:${PORT}`));