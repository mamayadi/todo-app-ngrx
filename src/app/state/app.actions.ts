import { Action } from '@ngrx/store';
import { Task } from '../models/task';

export enum TaskActionTypes {
  GetTasks = '[Task] Get Tasks',
  AddTask = '[Task] Add Task',
  UpdateTaskStatus = '[Task] Update Task Status',
  UpdateTaskName = '[Task] Update Task Name',
  RemoveTask = '[Task] Remove Task',
  ChangeDisplay = '[Task] Change Tasks Display'
}

export class GetTasks implements Action {
  type = TaskActionTypes.GetTasks;
  constructor(public payload: Task[]) {}
}

export class AddTask implements Action {
  type = TaskActionTypes.AddTask;
  constructor(public payload: Task) {}
}

export class UpdateTaskStatus implements Action {
  type = TaskActionTypes.UpdateTaskStatus;
  constructor(public payload: Task) {}
}

export class UpdateTaskName implements Action {
  type = TaskActionTypes.UpdateTaskName;
  constructor(public payload: Task) {}
}

export class RemoveTask implements Action {
  type = TaskActionTypes.RemoveTask;
  constructor(public payload: any) {}
}

export class ChangeDisplay implements Action {
  type = TaskActionTypes.ChangeDisplay;
  constructor(public payload: string) {}
}

export type TaskActions =
  | GetTasks
  | AddTask
  | UpdateTaskStatus
  | UpdateTaskName
  | RemoveTask
  | ChangeDisplay;
