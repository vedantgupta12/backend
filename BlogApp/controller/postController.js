const Post=require("../model/postModel");

const createPost=async (req,res)=>{
    try
    {
        const {title,body}=req.body;
    const post=new Post({
        title,body
    })
    const savedPost=await post.save();
    res.json({
        post:savedPost
    })

}
catch(error)
{
    return res.status(500).json({
        error:"error while creating post",
        details:error.message
    })
}

}

const getAllPost=async (req,res)=>{
    try
    {
        const posts=await Post.find().populate("likes").populate("comments");
    res.json({
        posts
    })
}
catch(error)
{
    return res.status(500).json({
        error:"error while creating post",
        details:error.message
    })
}
}
module.exports={createPost,getAllPost};