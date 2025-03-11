const express=require("express");
const app=express();
const PORT=3000;
app.use(express.json());
const blog=require("./routes/blog");
app.use("/api/v1",blog);

const dbConnect=require("./config/database");
dbConnect();

app.get('/',(req,res)=>{
         res.send(`<h1>This is the Homepage</h1>`);    
})

app.listen(PORT,()=>{console.log(`server is running on port ${PORT} successfully`)});

