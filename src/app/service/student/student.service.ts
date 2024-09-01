import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Student} from "../../models/student";
import {AuthenticationService} from "../Authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})

export class StudentService  {

  private URL="http://localhost:8080/api";
  constructor(private  http : HttpClient,private auth : AuthenticationService) { }

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      'Authorization': token,
    });
  }

  //  http://localhost:8080/api/students
  getAllStudents(page:number,size:number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.URL}/students?page=${page}&size=${size}`).pipe(
      map(response => response)
    );
  }

  // http://localhost:8080/api/students/2
  removeStudent(id:number){
    return this.http.delete(`${this.URL}/students/${id}`);
  }

  // http://localhost:8080/api/student
  addStudent(student: Student){
    return this.http.post(`${this.URL}/student`, student,{headers: this.getHeaders()});
  }

  // http://localhost:8080/api/students/2
  getStudentById(id:number):Observable<Student> {
    return this.http.get<Student>(`${this.URL}/students/${id}`,{headers: this.getHeaders()}).pipe(
      map(response => response)
    );
  }

  //http://localhost:8080/api/students?id=22
  editStudent(student: Student,id:number){
    return this.http.put(`${this.URL}/students?id=${id}`, student,{headers: this.getHeaders()});
  }

  getStudentByName(name: string,page:number,size:number):Observable<Student[]> {
    return this.http.get<Student[]>(`${this.URL}/students/searchName?fullName=${name}&page=${page}&size=${size}`).pipe(
      map(response => response)
    )
  }

  getStudentSize(){
    return this.http.get<number>(`${this.URL}/students/size`);
  }

  getStudentSizeName(name:string){
    return this.http.get<number>(`${this.URL}/students/sizeName?fullName=${name}`);
  }


}


