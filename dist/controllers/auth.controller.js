"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.signIn = exports.signUp = void 0;
const authService = __importStar(require("../services/auth.service"));
const signUp = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required",
            });
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: "Invalid email format",
            });
        }
        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                error: "Password must be at least 6 characters long",
            });
        }
        const result = await authService.signUp({ email, password, name });
        res.status(201).json({
            message: "User created successfully",
            ...result,
        });
    }
    catch (error) {
        if (error.message === "User with this email already exists") {
            return res.status(409).json({
                error: error.message,
            });
        }
        res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required",
            });
        }
        const result = await authService.signIn({ email, password });
        res.status(200).json({
            message: "Sign in successful",
            ...result,
        });
    }
    catch (error) {
        if (error.message === "Invalid email or password" ||
            error.message === "Invalid or expired token") {
            return res.status(401).json({
                error: error.message,
            });
        }
        res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
};
exports.signIn = signIn;
const getProfile = async (req, res) => {
    try {
        // User is attached by auth middleware
        const user = req.user;
        res.status(200).json({
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
};
exports.getProfile = getProfile;
