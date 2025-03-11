const express=require("express");
const app=express();


const PORT=3000;

app.use(express.json())
const todoRoutes=require("./routes/todos")
app.use("/api/v1",todoRoutes);


const dbConnect=require("./config/database");
dbConnect();

app.get("/",(req,res)=>{
    res.send(`<h1>This is the homepage </h1>`)
});
app.listen(PORT, () => {
    console.log(`Server is running successfully at port ${PORT}`); 
});