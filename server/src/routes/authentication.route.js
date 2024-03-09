import express from "express";
import { signup, login } from "../controllers/authentication.controller.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);

export default router;