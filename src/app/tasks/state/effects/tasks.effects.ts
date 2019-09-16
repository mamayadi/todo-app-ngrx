import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { TaskService } from '../../services/task.service';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as taskActions from '../actions/tasks.actions';
import { Task } from 'src/app/models/task';

@Injectable()
export class TaskEffects {
  constructor(private taskService: TaskService, private actions$: Actions) {}

  @Effect()
  loadTasks$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.Load),
    mergeMap(action =>
      this.taskService.getTasks().pipe(
        map(tasks => new taskActions.LoadSuccess(tasks)),
        catchError(err => of(new taskActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateTask$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.UpdateTask),
    map((action: taskActions.UpdateTask) => action.payload),
    mergeMap((task: Task) =>
      this.taskService.updateTask(task).pipe(
        map(updatedTask => new taskActions.UpdateTaskSuccess(updatedTask)),
        catchError(err => of(new taskActions.UpdateTaskFail(err)))
      )
    )
  );

  @Effect()
  AddTask$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.AddTask),
    map((action: taskActions.AddTask) => action.payload),
    mergeMap((task: Task) =>
      this.taskService.createTask(task).pipe(
        map(newtask => (new taskActions.AddTaskSuccess(newtask))),
        catchError(err => of(new taskActions.AddTaskFail(err)))
      )
    )
  );

  @Effect()
  deleteTask$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.RemoveTask),
    map((action: taskActions.RemoveTask) => action.payload),
    mergeMap((taskId: number) =>
      this.taskService.deleteTask(taskId).pipe(
        map(() => (new taskActions.RemoveTaskSuccess(taskId))),
        catchError(err => of(new taskActions.RemoveTaskFail(err)))
      )
    )
  );
}
