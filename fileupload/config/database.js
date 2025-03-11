const mongoose=require("mongoose");
exports.connect=()=>{
    mongoose.connect("mongodb+srv://vedant12:ved2003%40@cluster2.zrm9sc9.mongodb.net/fileupload")
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.error(err.message)
        process.exit(1)
    })
}