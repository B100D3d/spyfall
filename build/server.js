"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./router"));
const app = express_1.default();
const port = process.env.PORT || 3000;
const publicPath = path_1.default.join(__dirname, "../dist");
app
    .use(cors_1.default())
    .use(body_parser_1.default.json({ limit: '50mb' }))
    .use(express_1.default.static(path_1.default.join(publicPath)))
    .use("/api", router_1.default)
    .get("*", (_, res) => res.sendFile(path_1.default.join(publicPath, "index.html")));
app.listen(port, () => {
    console.log(`Server is running on port ${port}... | ${new Date().toLocaleString()}`);
});
