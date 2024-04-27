import express from 'express'
import Post from '../models/posts'
import handleSuccess from '../eventHandler/handleSuccess'
import handleError from '../eventHandler/handleError'

const router = express.Router()

router.get('/posts',async(_req, res)=>{
    const post = await Post.find()
    handleSuccess(res,post)
})

router.post('/posts',async(req,res)=>{
    try {
      const data = req.body
        if (data.content !== undefined) {
          const newPost = await Post.create({
            name: data.name,
            content: data.content.trim(),
            image:data.image?data.image:null
          });
          handleSuccess(res,newPost)
        } else {
          handleError(res,null)
        }
      } catch (error) {
        handleError(res,error)
      }
})

router.delete('/posts/:id',async(req,res)=>{
    const id:string = req.params.id
    try{
        const deletePost = await Post.findByIdAndDelete(id)
        const message =
          {
            delete: "yes"
          }
          if(!deletePost){
            handleError(res,null)
          }else handleSuccess(res,message)
          
    }catch(error){
    handleError(res,error)
    }
})

router.delete('/posts',async(req,res)=>{
  const errPath = req.originalUrl
  if(errPath === '/posts/'){
    const message = {message:"路徑沒有刪除的id"}
    handleError(res,message)
    return
  }
  try{
    await Post.deleteMany({})
    const message =
    {
      delete: "yes"
    }
    handleSuccess(res,message)  
  }catch(error){
    handleError(res,error)
  }
})

router.patch('/posts/:id',async(req,res)=>{
    const id:string = req.params.id
    try {
      const data = req.body
      console.log(data)
      if (data.content !== undefined) {
        const updatePost = await Post.findByIdAndUpdate(id,{
          name: data.name,
          content: data.content.trim()
        },
        {
          new:true,
          runValidators: true
        }
      );
        if(!updatePost){
          handleError(res,null)
        }else{
          handleSuccess(res,updatePost)
        }
      } else {
        handleError(res,null)
      }
    } catch (error) {
        handleError(res,error)
    }
})
export default router