import express from 'express'
import { generateImageController, getImageHistoryController } from '../../controllers/image.controller.js'
import { auth } from '../../middlewares/auth.middleware.js'
const router = express.Router()

router.post("/generate",auth, generateImageController)  //Add a middleware for authentication
router.get("/history",auth, getImageHistoryController)  

export default router