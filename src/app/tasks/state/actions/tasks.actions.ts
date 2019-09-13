import { Action } from '@ngrx/store';
import { Task } from '../../../models/task';

export enum TaskActionTypes {
  ChangeDisplay = '[Task] Change Tasks Display',
  AddTask = '[Task] Add Task',
  ChangeTaskStatus = '[Task] Change Task Status',
  ChangeTaskName = '[Task] Change Task Name',
  Load = '[Task] Load',
  LoadSuccess = '[Task] Load Success',
  LoadFail = '[Task] Load Fail'
}

export class AddTask implements Action {
  readonly type = TaskActionTypes.AddTask;
  constructor(public payload: Task) {}
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

export type TaskActions =
  | AddTask
  | ChangeDisplay
  | ChangeTaskName
  | ChangeTaskStatus
  | Load
  | LoadSuccess
  | LoadFail;
