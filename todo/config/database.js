const mongoose = require("mongoose");


const dbConnect = () => { 

    mongoose.connect("mongodb+srv://vedant12:ved2003%40@cluster2.zrm9sc9.mongodb.net/")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Issue in DB connection:", error.message);
        process.exit(1);
    });
};

module.exports = dbConnect;
