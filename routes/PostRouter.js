const express = require("express")
const auth = require("../middleware/auth")
const PostModel = require("../model/postModel")
const postRoute = express.Router()
postRoute.use(auth)

postRoute.post("/add", async (req, res) => {
  try {
    const post = new PostModel(req.body)
    await post.save()
    console.log(post)
    res.status(200).send({ "msg": "post Added!", post })
  } catch (error) {
    res.status(400).send({ "err": error.message })
  }
})

postRoute.get("/", async (req, res) => {
  const { device } = req.query
  try {

    const page = parseInt(req.query.page) || 1;
    const perPage = 3

    if (device) {
      const post = await PostModel.find({ userID: req.body.userID, device }).skip((page - 1) * perPage).limit(perPage)
      res.status(200).send(post)
    } else {
      const post = await PostModel.find({ userID: req.body.userID }).skip((page - 1) * perPage).limit(perPage)
      res.status(200).send(post)
    }

  } catch (error) {
    res.status(400).send({ "err": error.message })
  }
})
postRoute.get("/top",async(req,res)=>{
  
  try {

    const page = parseInt(req.query.page) || 1;
    const perPage = 3

    
      const post = await PostModel.find({ userID: req.body.userID }).sort(no_of_comments).skip((page - 1) * perPage).limit(perPage)
      res.status(200).send(post)
    

  } catch (error) {
    res.status(400).send({ "err": error.message })
  }
})

postRoute.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findOne({ _id: id })
    if (req.body.userID !== post.userID) {
      res.status(400).send({ "msg": "User is Not Authorized!" })
    } else {
      const post = await PostModel.findByIdAndUpdate({ _id: id }, req.body)
      res.status(200).send({ "msg": "Post is Updated", post })
    }
  } catch (error) {
    res.status(400).send({ "err": error.message })
  }
})
postRoute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findOne({ _id: id })
    if (req.body.userID !== post.userID) {
      res.status(400).send({ "msg": "User is Not Authorized!" })
    } else {
      const post = await PostModel.findByIdAndDelete({ _id: id })
      res.status(200).send({ "msg": "Post is Deletd", post })
    }
  } catch (error) {
    res.status(400).send({ "err": error.message })
  }
})


module.exports = postRoute