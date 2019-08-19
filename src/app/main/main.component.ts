import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Course } from '../models/Course';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  courses: Course[] = [];
  selectedcourse = null;
  editedcourse = null;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    if (!mrToken) {
      this.router.navigate(['/auth']);
    } else {
      this.apiService.getcourses().subscribe(
        (data: Course[]) => {
          this.courses = data;
        },
        error => console.log(error)
      );
    }
  }
  logout() {
    this.cookieService.delete('mr-token');
    this.router.navigate(['/auth']);
  }
  selectcourse(course: Course) {
    this.selectedcourse = course;
    this.editedcourse = null;
  }
  editcourse(course: Course) {
    this.editedcourse = course;
    this.selectedcourse = null;
  }
  createNewcourse() {
    this.editedcourse = {title: '', description: ''};
    this.selectedcourse = null;
  }
  deletedcourse(course: Course) {
    this.apiService.deletecourse(course.id).subscribe(
      data => {
        this.courses = this.courses.filter(curs => curs.id !== course.id);
      },
      error => console.log(error)
    );
  }
  courseCreated(course: Course) {
    this.courses.push(course);
    this.editedcourse = null;
  }
  courseUpdated(course: Course) {
    const indx = this.courses.findIndex( curs => curs.id === course.id);
    if (indx >= 0) {
      this.courses[indx] = course;
    }
    this.editedcourse = null;
  }
}
