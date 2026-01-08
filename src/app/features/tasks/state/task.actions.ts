import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/core/models/task.model';

export const loadTasks = createAction(
  '[Task] Load Tasks',
  props<{ userId: string }>()
);

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

// Change this to accept complete Task
export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()  // Changed from Omit<Task,...> to just Task
);

export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: Task }>()
);

export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ taskId: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ taskId: string }>()
);

export const toggleTaskCompletion = createAction(
  '[Task] Toggle Task Completion',
  props<{ taskId: string }>()
);