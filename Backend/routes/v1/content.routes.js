import express from 'express'
import { generateContentController, getContentById, getContentHistory, searchContent } from '../../controllers/content.controller.js'
import { auth } from '../../middlewares/auth.middleware.js'
const router = express.Router()

router.post("/generate/:action", auth, generateContentController)  //Add a middleware for authentication
router.get("/history", auth, getContentHistory);
router.get("/search", auth, searchContent);
router.get("/content-details/:id", getContentById);
export default router