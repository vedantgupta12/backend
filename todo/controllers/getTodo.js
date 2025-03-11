const Todo=require("../models/Todo");

const getTodo=async (req,res)=>{
   try{
    const todos=await Todo.find({});
    res.status(200)
    .json({
        success:true,
        data:todos,
        message:"data fetched"
    });
   }
   catch(err){
       console.error(err);
       res.status(500).json({
        success:false,
       error:err.message,
       message:"server errror"
       });

   }
}

const getTodoById=async (req,res)=>{
    try{
     const id=req.params.id;
     const todo=await Todo.findById({_id:id});
     if(!todo)
     {
        res.status(404).json({
            success:false,
            message:"no data with given id"
        });

     }
     res.status(200).json({
        success:true,
        data:todo,
        message:"Data with given id has feen found"
     });
       }
       catch(err){
           console.error(err);
           res.status(500).json({
            success:false,
           error:err.message,
           message:"server errror"
           });
    
       }
}
module.exports={getTodo,getTodoById};