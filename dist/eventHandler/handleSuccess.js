"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const headers_1 = __importDefault(require("./headers"));
function handleSuccess(res, data) {
    res.writeHead(200, headers_1.default);
    res.write(JSON.stringify({
        status: "success",
        data: data,
    }));
    res.end();
}
exports.default = handleSuccess;
