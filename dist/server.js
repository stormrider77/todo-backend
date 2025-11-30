"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const app_1 = __importDefault(require("./app"));
// Load environment variables
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
app_1.default.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
