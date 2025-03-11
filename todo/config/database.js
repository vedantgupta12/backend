const mongoose = require("mongoose");


const dbConnect = () => { 

    mongoose.connect("")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Issue in DB connection:", error.message);
        process.exit(1);
    });
};

module.exports = dbConnect;
