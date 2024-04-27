"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, "使用者名未填寫"]
    },
    email: {
        type: String,
        require: [true, "信箱未填寫"]
    },
    photo: {
        type: String,
        default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
    }
}, {
    versionKey: false
});
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
