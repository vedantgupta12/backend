
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("hello world");
})
app.post('/api/cars',(req,res)=>{
    const {name,brand}=req.body;
    console.log(name);
    console.log(brand);
    res.send("car submitted succefully");

})
app.listen(3000,()=>{console.log("server started at port")})