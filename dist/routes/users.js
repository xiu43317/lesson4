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
const users_1 = __importDefault(require("../models/users"));
const handleSuccess_1 = __importDefault(require("../eventHandler/handleSuccess"));
const handleError_1 = __importDefault(require("../eventHandler/handleError"));
const router = express_1.default.Router();
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUsers = yield users_1.default.find();
        (0, handleSuccess_1.default)(res, getUsers);
    }
    catch (error) {
        (0, handleError_1.default)(res, error);
    }
}));
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let defaultPhoto = "";
    if (!data.photo)
        defaultPhoto = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";
    else
        defaultPhoto = data.photo;
    try {
        const newUser = yield users_1.default.create({
            name: data.name,
            email: data.email,
            photo: defaultPhoto
        });
        (0, handleSuccess_1.default)(res, newUser);
    }
    catch (error) {
        (0, handleError_1.default)(res, error);
    }
}));
// 假登入
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const owner = yield users_1.default.find({ name: data.name, email: data.email });
        // console.log(owner)
        if (!owner.length) {
            const message = { message: "再檢查一次帳密" };
            (0, handleError_1.default)(res, message);
        }
        else {
            res.status(200).send({
                status: "success",
                data: owner[0]
            });
        }
    }
    catch (error) {
        res.status(400).send({
            status: "false",
            error
        });
    }
}));
router.delete('/users/:user_id', (req, res) => { });
router.delete('/users', () => { });
router.patch('/users/:user_id', (req, res) => { });
exports.default = router;
