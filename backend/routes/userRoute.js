import express from "express";

import * as userController from "../controllers/userController.js"

const router = express.Router();

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/logout", userController.logout)



export default router
