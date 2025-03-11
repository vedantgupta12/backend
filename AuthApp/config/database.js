const mongoose=require("mongoose");

const dbConnect=()=>{
    mongoose.connect("mongodb+srv://vedant12:ved2003%40@cluster2.zrm9sc9.mongodb.net/AuthApp")
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.error(err.message);
        process.exit(1);
    })
}
module.exports=dbConnect;