const mongoose=require("mongoose");

const dbConnect=()=>{
    mongoose.connect("")
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.error(err.message);
        process.exit(1);
    })
}
module.exports=dbConnect;
