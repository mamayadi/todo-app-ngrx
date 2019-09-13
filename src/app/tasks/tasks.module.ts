import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TasksComponent,
  DialogOverviewExampleDialogComponent
} from './tasks.component';
import {} from '@angular/material';
import {
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { reducer } from './state/reducers/tasks.reducer';


// Router

const taskRoutes: Routes = [
  {path: '', component: TasksComponent}
];

@NgModule({
  declarations: [TasksComponent, DialogOverviewExampleDialogComponent],
  entryComponents: [DialogOverviewExampleDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    RouterModule.forChild(taskRoutes),
    StoreModule.forFeature('tasks', reducer)
  ],
  exports: [TasksComponent, DialogOverviewExampleDialogComponent]
})
export class TasksModule {}
