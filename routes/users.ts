import express from 'express'
import User from '../models/users'
import handleSuccess from '../eventHandler/handleSuccess'
import handleError from '../eventHandler/handleError'

const router = express.Router()

router.get('/users',async(req,res)=>{
    try{
        const getUsers = await User.find()
        handleSuccess(res,getUsers)
    }catch(error){
        handleError(res,error)
    }
})
router.post('/users',async(req,res)=>{
    const data = req.body
    try{
        const newUser = await User.create({
            name:data.name,
            email:data.email,
            photo:data.photo
        })
        handleSuccess(res,newUser)
    }catch(error){
        handleError(res,error)
    }
})
// 假登入
router.post('/login',async(req,res)=>{
    const data = req.body
    try{
        const owner = await User.find({name:data.name,email:data.email})
        res.status(200).send({
            status:"success",
            data:owner
        })
    }catch(error){
        res.status(400).send({
            status:"false",
            error
        })
    }
})
router.delete('/users/:user_id',(req,res)=>{})
router.delete('/users',()=>{})
router.patch('/users/:user_id',(req,res)=>{})

export default router