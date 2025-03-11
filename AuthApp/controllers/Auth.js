const bcrypt=require("bcrypt");
const User=require("../models/User");
const jwt=require("jsonwebtoken")
require("dotenv").config()


//signup

exports.signup=async (req,res)=>{
  try
   {const {name,email,password,role}=req.body;
   const existingUser=await User.findOne({email});
   if(existingUser)
   {
    return res.status(400).json({
        success:false,
        msg:"user already exists"
    })
   }
     let hashedPassword;
   try{
    hashedPassword=await bcrypt.hash(password,10);
   }
   catch(err){
      return res.status(500).json({
        success:false,
        msg:"error in hashing password"
      })
   }
   const user=await User.create({
    name,email,password:hashedPassword,role
   });
   res.status(200).json({
    success:true,
    msg:"user created successfully"
   });

}
catch(error){
console.error(error);
return res.status(500).json({
    success:false,
    msg:"user cannot be created, try again later"
});
}
}

//login

exports.login= async (req,res)=>{
try
{  
  const {email,password}=req.body;
  if(!email || !password)
  {
   return  res.status(400).json({
      success:false,
      msg:"email and password are not entered"
    })
  }
  let user= await User.findOne({email});
  if(!user)
  {
    return res.status(401).json({
      success:false,
      msg:"user is not registered"
    })

  }
  const payload={
    email:user.email,
    id:user._id,
    role:user.role
  }

  if(await bcrypt.compare(password,user.password))
{
   const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})
   user=user.toObject();
   user.token=token
   user.password=undefined
   const options={
    expires:new Date(Date.now()+3*24*60*60*1000),
    httpOnly:true
   }
   res.cookie("token",token,options).status(200).json({
    success:true,
    token,
    user,
    msg:"user logged in successfully"
   })
}
else{
  return res.status(403).json({
    success:false,
    msg:"incorrect password"
  })
}
}

catch(err)
{
  console.error(err);
  return res.status(500).json({
    success:false,
    msg:"login failed"
  })
}
}