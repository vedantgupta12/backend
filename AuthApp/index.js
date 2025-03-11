const express=require("express");
const app=express();
app.use(express.json());
const PORT=4000;
const dbConnect=require('./config/database');

dbConnect();
const user=require("./routes/user")
app.use("/api/v1",user)

app.get('/',(req,res)=>{
    res.send(`<h1>This is the Homepage</h1>`);
})
app.listen(PORT,()=>{
    console.log(`server is successfully running on port ${PORT}`)
})
