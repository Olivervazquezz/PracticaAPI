import { Router } from "express";
import { saludo, ping, polo } from "../controllers/index.controllers.js";
const router = Router();

router.get("/", saludo);
router.get("/ping", ping);
router.get("/marco", polo);

export default router;