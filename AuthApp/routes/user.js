const express=require("express");
const router=express.Router();
const {signup,login}=require("../controllers/Auth");
const {auth,isStudent,isAdmin}=require("../middlewares/auth");
router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        msg:"welcome to the protected routes of test"
    })
})
router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        msg:"welcome to the protected route of student"
    })
})
router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        msg:"welcome to the protected route of admin"
    })
})

router.post('/login',login)
router.post('/signup',signup);

module.exports=router;