import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { validateLogin, validateRegistration } from "../../middlewares/validator.js";

const router = Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);

export default router;