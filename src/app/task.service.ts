import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './models/task';
import { Observable, throwError } from 'rxjs';

import {tap, catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'api/tasks';
  private tasks: Task[];
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.tasks = data),
        catchError(this.handleError)
      );
  }

  createTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Task>(this.tasksUrl, task, { headers })
      .pipe(
        tap(data => console.log('createTask: ' + JSON.stringify(data))),
        tap(data => this.tasks.push(data)),
        catchError(this.handleError)
      );
  }

  updateTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.put<Task>(url, task, { headers })
      .pipe(
        tap(() => console.log('updateTask: ' + task.id)),
        // Update the item in the list
        // This is required because the selected Task that was edited
        // was a copy of the item from the array.
        tap(() => {
          const foundIndex = this.tasks.findIndex(item => item.id === task.id);
          if (foundIndex > -1) {
            this.tasks[foundIndex] = task;
          }
        }),
        // Return the Task on an update
        map(() => task),
        catchError(this.handleError)
      );
  }

  deleteTask(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<Task>(url, { headers })
      .pipe(
        tap(data => console.log('deleteTask: ' + id)),
        tap(data => {
          const foundIndex = this.tasks.findIndex(item => item.id === id);
          if (foundIndex > -1) {
            this.tasks.splice(foundIndex, 1);
          }
        }),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
