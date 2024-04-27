"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("../models/posts"));
const handleSuccess_1 = __importDefault(require("../eventHandler/handleSuccess"));
const handleError_1 = __importDefault(require("../eventHandler/handleError"));
const router = express_1.default.Router();
router.get('/posts', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_1.default.find();
    (0, handleSuccess_1.default)(res, post);
}));
router.post('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data.content !== undefined) {
            const newPost = yield posts_1.default.create({
                name: data.name,
                content: data.content.trim(),
                image: data.image ? data.image : null
            });
            (0, handleSuccess_1.default)(res, newPost);
        }
        else {
            (0, handleError_1.default)(res, null);
        }
    }
    catch (error) {
        (0, handleError_1.default)(res, error);
    }
}));
router.delete('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletePost = yield posts_1.default.findByIdAndDelete(id);
        const message = {
            delete: "yes"
        };
        if (!deletePost) {
            (0, handleError_1.default)(res, null);
        }
        else
            (0, handleSuccess_1.default)(res, message);
    }
    catch (error) {
        (0, handleError_1.default)(res, error);
    }
}));
router.delete('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errPath = req.originalUrl;
    if (errPath === '/posts/') {
        const message = { message: "路徑沒有刪除的id" };
        (0, handleError_1.default)(res, message);
        return;
    }
    try {
        yield posts_1.default.deleteMany({});
        const message = {
            delete: "yes"
        };
        (0, handleSuccess_1.default)(res, message);
    }
    catch (error) {
        (0, handleError_1.default)(res, error);
    }
}));
router.patch('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const data = req.body;
        console.log(data);
        if (data.content !== undefined) {
            const updatePost = yield posts_1.default.findByIdAndUpdate(id, {
                name: data.name,
                content: data.content.trim()
            }, {
                new: true,
                runValidators: true
            });
            if (!updatePost) {
                (0, handleError_1.default)(res, null);
            }
            else {
                (0, handleSuccess_1.default)(res, updatePost);
            }
        }
        else {
            (0, handleError_1.default)(res, null);
        }
    }
    catch (error) {
        (0, handleError_1.default)(res, error);
    }
}));
exports.default = router;
