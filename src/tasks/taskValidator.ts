import { body, ValidationChain } from 'express-validator';

import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Task title is required')
    .trim()
    .isString()
    .withMessage('Title should be of type string'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('Task date is required')
    .isString()
    .withMessage('Date should a valid date format'),
  body('info').trim().isString().withMessage('Info should be of type string'),
  body('priority')
    .trim()
    .isIn([Priority.LOW, Priority.NORMAL, Priority.HIGH])
    .withMessage('Priority can only be normal, high, or low'),
  body('status')
    .trim()
    .isIn([Status.TODO, Status.IN_PROGRESS, Status.COMPLETED])
    .withMessage('Status is either completed, inprogress, or todo'),
];

export const updateValidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('Task is is required')
    .trim()
    .isString()
    .withMessage('Task ID must be a valid uuid format'),
  body('status')
    .trim()
    .isIn([Status.TODO, Status.IN_PROGRESS, Status.COMPLETED])
    .withMessage('Status is either completed, inprogress, or todo'),
];
