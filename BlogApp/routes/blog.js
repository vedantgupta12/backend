const express=require("express");
const router=express.Router();
const createComment=require("../controller/commentController");
const {createPost,getAllPost} = require("../controller/postController");
const {likePost,unlikePost}=require("../controller/likeController");


router.post('/create/comments',createComment);
router.post('/posts/create',createPost);
router.post('/likes/like',likePost);
router.delete('/likes/unlike',unlikePost)
router.get('/posts',getAllPost);


module.exports=router;
