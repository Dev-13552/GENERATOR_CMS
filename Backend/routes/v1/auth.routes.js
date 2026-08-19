import express from 'express'
import { getUser, loginController, registerController } from '../../controllers/auth.controller.js';
import { auth } from '../../middlewares/auth.middleware.js';

const router = express.Router()

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/get-me",auth, getUser);

export default router
