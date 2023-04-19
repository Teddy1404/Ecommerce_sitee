import express from 'express'
import {
    registerController ,loginController,  testController, forgotPasswordController
  } from "../controllers/authController.js";
  import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router()

//routing
//Register || METHOD POST
router.post("/register", registerController);
router.post("/login",loginController);

//forgot password
router.post('/forgot-password', forgotPasswordController)


//test
router.get("/test", requireSignIn, isAdmin, testController);

//protected route
router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({ok:true});
});

//protected admin dashboard
router.get("/admin-auth", requireSignIn,isAdmin,(req,res) =>{
  res.status(200).send({ok:true});
})
export default router;

