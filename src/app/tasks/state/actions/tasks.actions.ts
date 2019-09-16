import { Action } from '@ngrx/store';
import { Task } from '../../../models/task';

export enum TaskActionTypes {
  ChangeDisplay = '[Task] Change Tasks Display',
  ChangeTaskStatus = '[Task] Change Task Status',
  ChangeTaskName = '[Task] Change Task Name',
  Load = '[Task] Load',
  LoadSuccess = '[Task] Load Success',
  LoadFail = '[Task] Load Fail',
  AddTask = '[Task] Add Task',
  AddTaskSuccess = '[Task] Add Task Success',
  AddTaskFail = '[Task] Add Task Fail',
  UpdateTask = '[Task] Update Task',
  UpdateTaskSuccess = '[Task] Update Task Success',
  UpdateTaskFail = '[Task] Update Task Fail',
  RemoveTask = '[Task] Remove Task',
  RemoveTaskSuccess = '[Task] Remove Task Success',
  RemoveTaskFail = '[Task] Remove Task Fail'
}

export class ChangeDisplay implements Action {
  readonly type = TaskActionTypes.ChangeDisplay;
  constructor(public payload: string) {}
}

export class ChangeTaskName implements Action {
  readonly type = TaskActionTypes.ChangeTaskName;
  constructor(public payload: Task) {}
}
export class ChangeTaskStatus implements Action {
  readonly type = TaskActionTypes.ChangeTaskStatus;
  constructor(public payload: Task) {}
}
export class Load implements Action {
  readonly type = TaskActionTypes.Load;
}
export class LoadSuccess implements Action {
  readonly type = TaskActionTypes.LoadSuccess;
  constructor(public payload: Task[]) {}
}

export class LoadFail implements Action {
  readonly type = TaskActionTypes.LoadFail;
  constructor(public payload: string) {}
}

export class AddTask implements Action {
  readonly type = TaskActionTypes.AddTask;
  constructor(public payload: Task) {}
}

export class AddTaskSuccess implements Action {
  readonly type = TaskActionTypes.AddTaskSuccess;
  constructor(public payload: Task) {}
}

export class AddTaskFail implements Action {
  readonly type = TaskActionTypes.AddTaskFail;
  constructor(public payload: string) {}
}

export class UpdateTask implements Action {
  readonly type = TaskActionTypes.UpdateTask;
  constructor(public payload: Task) {}
}

export class UpdateTaskSuccess implements Action {
  readonly type = TaskActionTypes.UpdateTaskSuccess;
  constructor(public payload: Task) {}
}

export class UpdateTaskFail implements Action {
  readonly type = TaskActionTypes.UpdateTaskFail;
  constructor(public payload: string) {}
}

export class RemoveTask implements Action {
  readonly type = TaskActionTypes.RemoveTask;
  constructor(public payload: number) {}
}

export class RemoveTaskSuccess implements Action {
  readonly type = TaskActionTypes.RemoveTaskSuccess;
  constructor(public payload: number) {}
}

export class RemoveTaskFail implements Action {
  readonly type = TaskActionTypes.RemoveTaskFail;
  constructor(public payload: string) {}
}

export type TaskActions =
  | ChangeDisplay
  | ChangeTaskName
  | ChangeTaskStatus
  | Load
  | LoadSuccess
  | LoadFail
  | AddTask
  | AddTaskSuccess
  | AddTaskFail
  | UpdateTask
  | UpdateTaskSuccess
  | UpdateTaskFail
  | RemoveTask
  | RemoveTaskSuccess
  | RemoveTaskFail;
