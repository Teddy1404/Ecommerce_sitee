import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categorycontroller, createCategoryController, deleteCategoryCOntroller, singleCategoryController, updateCategorycontroller } from '../controllers/categoryController.js';

const router = express.Router();

//routes
router.post('/create-category', requireSignIn,isAdmin,createCategoryController);

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategorycontroller)
//get all category
router.get('/get-category',categorycontroller)
//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);
export default router