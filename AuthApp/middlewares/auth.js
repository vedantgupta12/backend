const jwt=require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config()
exports.auth=(req,res,next)=>{
    try{
      const token=req.body.token;
      if(!token)
      {
        return res.status(401).json({
            success:false,
            msg:"token not found"
        })
      }
      try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.user=decode;

      }catch(error)
      {
        return res.status(400).json({
            success:false,
            msg:"invalid token"
        })
      }
      next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            msg:"something went wrong "
        })
    }
}
exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role !== "student")
        {
            return res.status(401).json({
                success:false,
                msg:"this is protected route for student"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            msg:"user role not matching"
        })
    }
}
exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role !== "admin")
        {
            return res.status(401).json({
                success:false,
                msg:"this is protected route for admin"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            msg:"user role not matching"
        })
    }
}
