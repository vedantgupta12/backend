const Todo = require("../models/Todo");

const deleteTodo=async (req,res)=>{
  try { 
    const id=req.params.id;
    await Todo.findByIdAndDelete({_id:id});
    res.status(200).json({
        success:true,
        message:"data deleted"
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
module.exports=deleteTodo;