import { body, param, query } from 'express-validator';

export const createTodoValidator = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .trim()
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .trim(),
];

export const updateTodoValidator = [
  param('id').isMongoId().withMessage('Invalid Todo ID format'),
  body('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .trim()
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .trim(),
  body('completed')
    .optional()
    .isBoolean().withMessage('Completed must be a boolean'),
];

export const todoIdValidator = [
  param('id').isMongoId().withMessage('Invalid Todo ID format'),
];

export const getTodosValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
  query('search').optional().isString().trim(),
];