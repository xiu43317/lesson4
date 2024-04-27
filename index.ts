import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import posts from './routes/posts'
import users from './routes/users'

dotenv.config({path:"./config.env"})
const app = express()
const port = 3005

const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)
mongoose
  //.connect(DB)
  .connect('mongodb://localhost:27017/homework')
  .then(() => console.log("資料庫連線成功"))

 app.use(express.json())
 app.use('/',posts)
 app.use('/',users)
 app.use(express.urlencoded({ extended: true }))

 app.use((req,res,next)=>{
   res.status(404)
   res.send(
      JSON.stringify({
        status: "false",
        message: "抱歉你的頁面找不到",
      })
   )
 })

 app.use((err:any,req:any,res:any,next:any)=>{
   console.error(err)
   res.status(500)
   res.send("網頁發生問題，請稍後再試")
 })
 app.listen(process.env.PORT || port,()=>{
    console.log(`伺服器已經啟動`)
 })