const mongoose=require("mongoose");
exports.connect=()=>{
    mongoose.connect("")
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.error(err.message)
        process.exit(1)
    })
}
