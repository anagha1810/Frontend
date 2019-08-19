import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MainComponent } from './main.component';
import { courseListComponent } from '../course-list/course-list.component';
import { courseDetailsComponent } from '../course-details/course-details.component';
import { courseFormComponent } from '../course-form/course-form.component';

const routes: Routes = [
  {path: 'courses', component: MainComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    courseListComponent,
    courseDetailsComponent,
    courseFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainModule { }
