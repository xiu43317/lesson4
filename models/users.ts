import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require: [true, "使用者名未填寫"]
        },
        email:{
            type:String,
            require: [true, "信箱未填寫"]
        },
        photo:{
            type:String,
            default:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        }
    },
    {
        versionKey: false
    }
)

const User = mongoose.model("user", userSchema)

export default User