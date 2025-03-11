const Comment=require("../model/commentModel");
const Post=require("../model/postModel");

const createComment=async (req,res)=>{
try{   
     const {post,user,body}=req.body;

    // const newComment=await Comment.create({
    //     post,user,body
    // })

    const comment=new Comment({
        post,user,body
    });
    const savedComment=await comment.save();
    
    const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true})
    .populate("comments") //populate comment documents with comment documents
    .exec();
   res.json({
    post:updatedPost
   });
}
catch(error){
    return res.status(500).json({
         error:"error while creating comment",
         details:error.message
    })
}
}
module.exports=createComment;