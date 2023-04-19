import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, updateCategorycontroller } from '../controllers/categoryController.js';

const router = express.Router();

//routes
router.post('/create-category', requireSignIn,isAdmin,createCategoryController);

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategorycontroller)

export default router