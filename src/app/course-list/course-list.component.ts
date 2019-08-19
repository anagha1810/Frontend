import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../models/Course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class courseListComponent implements OnInit {

  @Input() courses: Course[] = [];
  @Output() selectcourse = new EventEmitter<Course>();
  @Output() editedcourse = new EventEmitter<Course>();
  @Output() createNewcourse = new EventEmitter();  
  @Output() deletedcourse = new EventEmitter<Course>();

  constructor() { }

  ngOnInit() {}

  courseClicked(course: Course) {
    this.selectcourse.emit(course);
  }

  editcourse(course: Course) {
    this.editedcourse.emit(course);
  }
  newcourse() {
    this.createNewcourse.emit();
  }
  deletecourse(course: Course) {
    this.deletedcourse.emit(course);
  }

}

