import { Router } from "express";
import * as todoController from "../controllers/todo.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createTodoValidator,
  updateTodoValidator,
  todoIdValidator,
  getTodosValidator,
} from "../validators/todo.validator.js";

const router = Router();

router
  .route("/")
  .post(createTodoValidator, validate, todoController.createTodo)
  .get(getTodosValidator, validate, todoController.getAllTodos);

router
  .route("/:id")
  .get(todoIdValidator, validate, todoController.getTodoById)
  .put(updateTodoValidator, validate, todoController.updateTodo)
  .delete(todoIdValidator, validate, todoController.deleteTodo);

router.route("/:id/toggle").patch(todoIdValidator, validate, todoController.toggleTodoStatus);

export default router;
