import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/api/test";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  // ✅ Create a new test
  createTest(testDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}`, testDto);
  }

  // ✅ Get all tests
  getAllTest(): Observable<any> {
    return this.http.get(`${BASIC_URL}`);
  }

  // ✅ Add question to a test
  addQuestionInTest(questionDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/question`, questionDto);
  }

  // ✅ Get questions by test ID
  getTestQuestions(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/${id}`);
  }

  // ✅ Get all test results
  getTestResults(): Observable<any> {
    return this.http.get(`${BASIC_URL}/test-result`);
  }

  // ✅ NEW: Filter tests by level and topic
  getTestsByLevelAndTopic(level: string, topic: string): Observable<any> {
    return this.http.get(`${BASIC_URL}/filter?level=${level}&topic=${topic}`);
  }
}
