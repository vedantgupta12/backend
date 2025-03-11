const express=require("express");
const app=express();
const PORT=3000;
app.use(express.json());
const fileUpload=require("express-fileupload");

app.use(fileUpload({
    useTempFiles: true,          // Enable temporary file storage
    tempFileDir: '/tmp/',        // Specify the directory for temporary files
  }));

const db=require("./config/database");
db.connect();
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();
const upload=require("./routes/FileUpload");
app.use("/api/v1/upload",upload);
app.get("/",(req,res)=>{
    res.send(`<h1>this is the homepage</h1>`);
})
app.listen(PORT,()=>{
    console.log("server connected to the port successfully");
})