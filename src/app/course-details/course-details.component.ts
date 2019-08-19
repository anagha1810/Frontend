import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Course } from '../models/Course';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class courseDetailsComponent implements OnInit {

  @Input() course: Course;
  @Output() updateCourse = new EventEmitter<Course>();
  rateHovered = 0;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }
  rateHover(rate: number) {
    this.rateHovered = rate;
  }
  rateClicked(rate: number) {
    this.apiService.ratecourse(rate, this.course.id).subscribe(
      result => this.getDetails(),
      error => console.log(error)
    );
  }
  getDetails() {
    this.apiService.getcourse(this.course.id).subscribe(
      (course: Course) => {
        this.updateCourse.emit(course);
      },
      error => console.log(error)
    );
  }
}
