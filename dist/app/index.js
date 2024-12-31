"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const node_path_1 = require("node:path");
const routes_1 = __importDefault(require("../routes"));
const error_handler_1 = require("./middlewares/handlers/error.handler");
const node_http_1 = require("node:http");
require("./helpers/passport/jwt-strategy");
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const upload = (0, multer_1.default)();
const server = (0, node_http_1.createServer)(app);
// Middlewares
app.use(express_1.default.json());
app.use("/public/uploads", express_1.default.static("public/uploads"));
app.use((0, cors_1.default)({ origin: "*", methods: ["GET", "POST"] }));
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api", upload.any(), routes_1.default);
app.get("/", (req, res) => {
    res.sendFile((0, node_path_1.join)(__dirname, "../public/index.html"));
});
// Error handler
app.use(error_handler_1.errorHandler);
exports.default = server;
