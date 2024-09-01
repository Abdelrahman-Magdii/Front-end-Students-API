import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {StudentService} from "../service/student/student.service";
import {HttpClientModule} from "@angular/common/http";
import {Student} from "../models/student";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    RouterLink,
    HttpClientModule,
    NgbPagination
  ],
  providers:[StudentService],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {

  students: Student[] = [];
  page:number=1;
  size:number=11;
  numElements!:number;
  message: string = '';
  showAlert: boolean = false;
  searchName:string="";
  constructor(private student: StudentService,private route:ActivatedRoute) { }

  ngOnInit():void {
    this.route.paramMap.subscribe(()=> {
      const res = this.route.snapshot.paramMap.has("name");
      if(res){
        this.searchName = this.route.snapshot.paramMap.get("name")!;
        this.getStudentsByName();
      }else{
        this.getStudents();
      }
    });

  }


  getStudents(){
    this.student.getAllStudents(this.page -1,this.size).subscribe( (data)=>{
      this.students = data;
      this.getStudentsSize();
      console.log(this.students);
    },(err)=>{
      console.error('Error fetching students:', err);
    })

  }

  getStudentsByName(){
    this.student.getStudentByName(this.searchName,this.page -1 ,this.size).subscribe( (data)=>{
      this.students = data;
      this.getStudentSizeName()
    },(err)=>{
      console.error('Error fetching students:', err);
    })
  }

  removeStudent(id: number) {
    const index = this.students.findIndex((item) => item.id === id);
    this.student.removeStudent(id).subscribe(data => {
      this.students.splice(index, 1);
      this.message = `Successfully deleted student ${id}`;
      this.showAlert = true; // Show alert message
      this.hideMessageAfterDelay(); // Hide alert message after delay
    });
  }

  hideMessageAfterDelay() {
    setTimeout(() => {
      this.showAlert = false; // Hide alert after 3000 ms
    }, 3000);
  }


  // to handle numElements in pagination
  getStudentsSize(){
    this.student.getStudentSize().subscribe( (data)=> this.numElements = data );
  }

  // to handle numElements in pagination using search by name
  getStudentSizeName(){
    this.student.getStudentSizeName(this.searchName).subscribe( (data)=> this.numElements = data );
  }

  done() {
    const res = this.route.snapshot.paramMap.has("name");
    if(res){
      this.getStudentsByName();
    }else{
      this.getStudents();
    }
  }

}
