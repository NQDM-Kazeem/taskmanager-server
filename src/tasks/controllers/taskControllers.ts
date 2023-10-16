/* eslint-disable @typescript-eslint/ban-ts-comment */
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { AppDataSource } from '../../../server';
import { Task } from '../tasks.entity';
import { UpdateResult } from 'typeorm';

class TaskController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    // Declare a variable to hold all task
    let allTasks: Task[];

    // Fetch all tasks using the repo
    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: { date: 'ASC' },
      });

      // Convert tasks instance to an array of objects;
      allTasks = instanceToPlain(allTasks) as Task[];
      return res.status(200).json(allTasks);
    } catch (_error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async createTask(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTask = new Task();

    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);
      createdTask = instanceToPlain(createdTask) as Task;

      return res.status(200).json(createdTask);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if task exists in database
    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Return 404 if task is null
    if (!task) {
      return res.status(404).json({ error: 'Task does not exists!' });
    }

    // Declare a variable for updatedTask
    let updatedTask: UpdateResult;

    // Update the task
    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status }),
      );

      // Convert updatedtask instance to plain object
      updatedTask = instanceToPlain(updatedTask) as UpdateResult;

      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error!' });
    }
  }
}

export const taskController = new TaskController();
