const express = require("express");
const auth = require("../MIddleware/auth");
const postModel = require("../Model/postModel");

const postRoute = express.Router();

postRoute.post("/blogs", auth, async (req, res) => {
  try {
    let obj = {
      ...req.body,
      creator: req.user,
      user: req.name,
    };

    const newPost = await postModel.create(obj);
    await newPost.populate("creator");

    res.send({
      message: "post successful",
      post: newPost,
    });
  } catch (error) {
    res.send({
      post: error,
    });
  }
});
postRoute.patch("/blogs/:id", auth, async (req, res) => {
  try {
    console.log(req.params.id);

    const post = await postModel.findById({ _id: req.params.id });

    if (String(post.creator) === req.user) {
      const newPost = await postModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.send({
        message: "Edited Successful",
        post: newPost,
      });
    } else {
      res.send("You are not athorized to edit this post");
    }

    res.send(post);
  } catch (error) {
    res.send({
      update: error,
    });
  }
});
postRoute.delete("/blogs/:id", auth, async (req, res) => {
  try {
    console.log(req.params.id);

    const post = await postModel.findById({ _id: req.params.id });

    if (String(post.creator) === req.user) {
      const newPost = await postModel.findByIdAndDelete(req.params.id);
      res.send({
        message: "Delete Post",
      });
    } else {
      res.send("You are not athorized to edit this post");
    }

    res.send(post);
  } catch (error) {
    res.send({
      delete: error,
    });
  }
});

postRoute.patch("/blogs/like/:id", auth, async (req, res) => {
  try {
    console.log(req.params);
    const post = await postModel.findById(req.params.id);
    
    let likes = post.likes

    if(likes.includes(req.user))
    {
        likes = likes.filter(el=>el!==req.user)
    }
    else{
        likes.push(req.user)
    }
    const newLikes = await postModel.findByIdAndUpdate(req.params.id,{likes},{new:true})
    res.send(newLikes)
  } catch (error) {
    res.send({
      likes: error,
    });
  }
});
postRoute.patch("/blogs/comment/:id", auth, async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body)
    const post = await postModel.findById(req.params.id);
    const newComment = {comment:req.body,name:req.name}
    let comments = post.comments;

    comments.push(newComment)

    
    const newLikes = await postModel.findByIdAndUpdate(req.params.id,{comments},{new:true})
    res.send(newLikes)
  } catch (error) {
    res.send({
      likes: error,
    });
  }
});


postRoute.get('/blogs',async(req,res)=>{
    try {
        let data 
        if(req.query.sort=="date" && req.query.order=='asc' )
        {
           data = await postModel.find().sort({date:1})
        }
       else if(req.query.sort=="date" && req.query.order=='desc' )
        {
           data = await postModel.find().sort({date:-1})
        }
        else if(req.query.category)
        {
            data = await postModel.find({category:req.query.category})
        }
        else if(req.query.title)
        {
            const title = RegExp(req.query.title,'i')
            data = await postModel.find({title:req.query.title})
        }
        else{
            data = await postModel.find({})
        }
        res.send({data})
    } catch (error) {
        res.send(error)
    }
})

module.exports = postRoute;
