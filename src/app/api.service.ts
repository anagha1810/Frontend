import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './models/Course';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/';
  basecourseUrl = `${this.baseUrl}api/courses/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  getcourses() {
    return this.httpClient.get<Course[]>(this.basecourseUrl, {headers: this.getAuthHeaders()});
  }
  getcourse(id: number) {
    return this.httpClient.get<Course>(`${this.basecourseUrl}${id}/`, {headers: this.getAuthHeaders()});
  }
  createcourse(title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.post(`${this.basecourseUrl}`, body, {headers: this.getAuthHeaders()});
  }
  updatecourse(id: number, title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.put(`${this.basecourseUrl}${id}/`, body, {headers: this.getAuthHeaders()});
  }
  deletecourse(id: number) {
    return this.httpClient.delete(`${this.basecourseUrl}${id}/`, {headers: this.getAuthHeaders()});
  }

  ratecourse(rate: number, courseId: number) {
    const body = JSON.stringify({stars: rate});
    return this.httpClient.post(`${this.basecourseUrl}${courseId}/rate_course/`, body, {headers: this.getAuthHeaders()});
  }

  loginUser(authData) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers: this.headers});
  }

  registerUser(authData) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}api/users/`, body, {headers: this.headers});
  }

  getAuthHeaders() {
    const token = this.cookieService.get('mr-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }
}

