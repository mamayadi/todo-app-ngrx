import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TaskData } from './tasks/task-data';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// NgRx
import { StoreModule, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TasksModule } from './tasks/tasks.module';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(TaskData),
    HttpClientModule,
    MatToolbarModule,
    TasksModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Todo app ngrx',
      maxAge: 25
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
