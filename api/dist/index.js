"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./database");
const api_1 = __importDefault(require("./src/routes/api"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, database_1.connection)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api', api_1.default);
app.get('/', (req, res) => {
    res.send('API');
});
app.use((0, cors_1.default)());
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
