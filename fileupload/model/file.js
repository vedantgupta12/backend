const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
require("dotenv").config();
const fileSchema= new mongoose.Schema({
    name:{
        type:String
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    },
    
});

//creating a post middleware which will send mail after saving document into the database
fileSchema.post("save",async (doc)=>{
    try{
        console.log("Doc",doc);
        let transporter= nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        let info=await transporter.sendMail({
            from:`vedant`,
            to:doc.email,
            subject:"file uploded to cloudinary",
            html:`<h2>hi!!!</h><p>this is to inform you that file has been uploaded to cloudinary successfully</p><p>view here</p><a href="${doc.imageUrl}">click here</a>`
        })

    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            msg:"something went wrong"
        })
    }
})

const File=mongoose.model("File",fileSchema);
module.exports=File;

//gmail password=//tffy wqcn hpsk peyk