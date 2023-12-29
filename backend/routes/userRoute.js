import express from "express";

import * as userController from "../controllers/userController.js";
import { authenticatedmid } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/reset/:token", userController.resetPassword);
router.get("/me",authenticatedmid, userController.userDetail);

export default router;
