"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: [true, "Content 未填寫"],
    },
    image: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    name: {
        type: String,
        required: [true, "貼文姓名未填寫"],
    },
    likes: {
        type: Number,
        default: 0,
    },
}, {
    versionKey: false
});
const Post = mongoose_1.default.model("post", postSchema);
exports.default = Post;
