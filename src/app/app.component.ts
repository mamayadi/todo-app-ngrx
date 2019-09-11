import { TaskService } from './task.service';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { Task } from './models/task';
import {
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { MatListOption } from '@angular/material';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo-app';
  tasks: Task[] = [];
  myForm: FormGroup;
  display = 'all';

  animal: string;
  name: string;

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      taskInput: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ])
    });

    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
        console.log(this.tasks);
      },
      err => console.log(err)
    );
  }

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
      this.myForm.reset();
      this.taskService.createTask(newTask).subscribe(task => {
        console.log('New Task Added:');
        console.log(task);
        console.log('Tasks:', this.tasks);
      });
    }
  }

  markTaskDone(task: Task) {
    task.status = !task.status;
    this.taskService
      .updateTask(task)
      .subscribe((data: Task) => console.log(data));
  }

  updateTaskName(task: Task, e: any) {
    task.taskName = e.target.value;
    this.taskService
      .updateTask(task)
      .subscribe((data: Task) => console.log(data));
  }

  displayTasks(p: string) {
    this.display = p;
  }

  get lengthTasksTodo() {
    let i = 0;
    this.tasks.forEach((task: Task) =>
      task.status === false ? i++ : (i = i + 0)
    );
    return i;
  }

  selectionChange(option: MatListOption) {
    console.log(option);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(data => {
      console.log(data);
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data:  id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.deleteTask(result);
    });
  }
}


