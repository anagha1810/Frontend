import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../models/Course';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class courseFormComponent implements OnInit {

  courseForm;
  id = null;

  @Output() courseCreated = new EventEmitter<Course>();
  @Output() courseUpdated = new EventEmitter<Course>();

  @Input() set course(val: Course) {
    this.id = val.id;
    this.courseForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description)
    });
  }

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  /*formDisabled() {
    if (this.course.value.title.length &&
      this.courseForm.value.description.length) {
        return false;
    } else {
      return true;
    }
  } */
  saveForm() {
    if (this.id) {
      this.apiService.updatecourse(this.id,
        this.courseForm.value.title, this.courseForm.value.description).subscribe(
          (result: Course) => this.courseUpdated.emit(result),
          error => console.log(error)
        );
    } else {
      this.apiService.createcourse(
        this.courseForm.value.title, this.courseForm.value.description).subscribe(
          (result: Course) => this.courseCreated.emit(result),
          error => console.log(error)
        );
    }
  }
}

