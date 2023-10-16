/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';

import { taskController } from '../controllers/taskControllers';
import { createValidator, updateValidator } from '../taskValidator';

export const taskRouter: Router = Router();

taskRouter.get('/tasks', taskController.getAll);

taskRouter.post('/tasks', createValidator, taskController.createTask);

taskRouter.put('/tasks', updateValidator, taskController.updateTask);
