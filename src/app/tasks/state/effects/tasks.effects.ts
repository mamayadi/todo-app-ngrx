import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { TaskService } from '../../services/task.service';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as taskActions from '../actions/tasks.actions';

@Injectable()
export class TaskEffects {
  constructor(private taskService: TaskService, private actions$: Actions) {}

  @Effect()
  loadTasks$: Observable<Action> = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.Load),
    mergeMap(action =>
      this.taskService.getTasks().pipe(
        map(tasks => (new taskActions.LoadSuccess(tasks))),
        catchError(err => of(new taskActions.LoadFail(err)))
      )
    )
  );
}
