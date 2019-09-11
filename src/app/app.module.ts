import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TaskData } from './task-data';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DialogOverviewExampleDialogComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatToolbarModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatDialogModule, MatCheckboxModule } from '@angular/material';

// NgRx
import {StoreModule} from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    DialogOverviewExampleDialogComponent
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(TaskData),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    StoreModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
