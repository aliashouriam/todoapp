import todoService from "../services/todo.service.js";

// Helper function for unified response layouts
const sendResponse = (res, statusCode, success, data, message = "", pagination = undefined) => {
  const responsePayload = { success, data, message };
  if (pagination !== undefined) {
    responsePayload.pagination = pagination;
  }
  return res.status(statusCode).json(responsePayload);
};

export const createTodo = async (req, res, next) => {
  try {
    const todo = await todoService.createTodo(req.body);
    // FIXED: Changed status from 21 to 201
    sendResponse(res, 201, true, todo, "Todo created successfully");
  } catch (error) {
    next(error);
  }
};

export const getAllTodos = async (req, res, next) => {
  try {
    const { todos, pagination } = await todoService.getAllTodos(req.query);
    // OPTIMIZED: Refactored to utilize the sendResponse utility helper cleanly
    sendResponse(res, 200, true, todos, "Todos retrieved successfully", pagination);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (req, res, next) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
    sendResponse(res, 200, true, todo, "Todo item retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await todoService.updateTodo(req.params.id, req.body);
    sendResponse(res, 200, true, updatedTodo, "Todo updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    await todoService.deleteTodo(req.params.id);
    sendResponse(res, 200, true, {}, "Todo deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const toggleTodoStatus = async (req, res, next) => {
  try {
    const toggledTodo = await todoService.toggleTodoStatus(req.params.id);
    sendResponse(res, 200, true, toggledTodo, `Todo status set to ${toggledTodo.completed}`);
  } catch (error) {
    next(error);
  }
};
