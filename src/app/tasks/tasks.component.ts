import { Task } from './../models/task';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatListOption } from '@angular/material';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { TaskService } from './services/task.service';

import * as fromTask from './state/reducers/tasks.reducer';
import * as taskActions from './state/actions/tasks.actions';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>Delete Task</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete this task?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
    </div>
  `
})
export class DialogOverviewExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  errorMessage$: Observable<string>;
  tasks: Task[];
  myForm: FormGroup;
  display: string;
  tasks$: Observable<Task[]>;

  constructor(
    private store: Store<fromTask.State>,
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      taskInput: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ])
    });
    this.tasks$ = this.store.pipe(select(fromTask.getTasks));
    this.errorMessage$ = this.store.pipe(select(fromTask.getError));
    this.store.dispatch(new taskActions.Load());
    this.store
      .pipe(select(fromTask.getDisplay))
      .subscribe(data => (this.display = data));
    // this.getTasks();
    // this.store.pipe(select(fromTask.getTasks)).subscribe(
    //   tasks => this.tasks = tasks
    // );
  }

  // getTasks() {
  //   this.taskService.getTasks().subscribe(
  //     (tasks: Task[]) => {
  //       this.tasks = tasks;
  //     },
  //     err => console.log(err)
  //   );
  // }

  @HostListener('document:keydown.Enter', ['$event']) onKeyDown(
    event: KeyboardEvent
  ) {
    // console.log(this.myForm.value);
    if (this.myForm.valid) {
      this.addTask();
      this.myForm.reset();
    }
  }

  addTask() {
    if (this.myForm.valid) {
      const newTask: Task = {
        id: Math.round(Math.random() * 1000),
        taskName: this.myForm.value.taskInput,
        status: false
      };
      this.store.dispatch(new taskActions.AddTask(newTask));
      this.myForm.reset();
      this.taskService.createTask(newTask).subscribe(task => {
        console.log(task);
      });
    }
  }

  markTaskDone(task: Task) {
    // console.log(!task.status);
    task.status = !task.status;
    this.store.dispatch(new taskActions.ChangeTaskStatus(task));
    this.taskService
      .updateTask(task)
      .subscribe((data: Task) => console.log(data));
  }

  updateTaskName(task: Task, e: any) {
    task.taskName = e.target.value;
    this.store.dispatch(new taskActions.ChangeTaskName(task));
    this.taskService
      .updateTask(task)
      .subscribe((data: Task) => console.log(data));
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(data => {
      console.log(data);
    });
  }

  displayTasks(p: string) {
    // this.display = p;
    this.store.dispatch(new taskActions.ChangeDisplay(p));
  }

  get lengthTasksTodo() {
    let i: number;
    this.tasks$.pipe(
      map(tasks =>
        tasks.forEach(task => (task.status === false ? i++ : (i = i + 0)))
      )
    );
    return i;
  }

  selectionChange(option: MatListOption) {
    console.log(option);
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.deleteTask(result);
    });
  }
}
