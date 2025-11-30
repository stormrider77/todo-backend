"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = exports.getTodos = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getTodos = () => {
    return prisma_1.default.todo.findMany();
};
exports.getTodos = getTodos;
const createTodo = (data) => {
    return prisma_1.default.todo.create({
        data,
    });
};
exports.createTodo = createTodo;
