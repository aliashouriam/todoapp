import Todo from "../models/todo.model.js";
import { ApiError } from "../middleware/error.middleware.js";

class TodoService {
  async createTodo(todoData) {
    return await Todo.create(todoData);
  }

  async getAllTodos(filters = {}) {
    const { page = 1, limit = 10, completed, search } = filters;
    const query = {};

    if (completed !== undefined) {
      query.completed = completed === "true" || completed === true;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [todos, total] = await Promise.all([
      Todo.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Todo.countDocuments(query),
    ]);

    return {
      todos,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    };
  }

  async getTodoById(id) {
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new ApiError("Todo item not found", 404);
    }
    return todo;
  }

  async updateTodo(id, updateData) {
    const todo = await Todo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      throw new ApiError("Todo item not found", 404);
    }
    return todo;
  }

  async deleteTodo(id) {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      throw new ApiError("Todo item not found", 404);
    }
    return todo;
  }

  async toggleTodoStatus(id) {
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new ApiError("Todo item not found", 404);
    }
    todo.completed = !todo.completed;
    return await todo.save();
  }
}

export default new TodoService();
