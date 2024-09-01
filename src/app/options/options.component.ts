import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Student } from "../models/student";
import { StudentService } from "../service/student/student.service";
import {ActivatedRoute, Router} from "@angular/router";
import { HttpClientModule} from "@angular/common/http";
import {SpaceValidator} from "../models/validator/space-validator";

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  studentForm!: FormGroup;
  id:number=0;
  myStudent: Student = new Student(0,"","","","","");
  constructor(private formBuilder: FormBuilder,private serviceStudent: StudentService,
    private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    this.id =+ this.route.snapshot.params['id'];
    if(isNaN(this.id))this.id=0;
    console.log(this.id)
    if(this.id !=0){
      this.serviceStudent.getStudentById(this.id).subscribe(
        response => {
          this.myStudent = response,
            this.studentForm.get("students.userName")?.patchValue(response.fullName),
            this.studentForm.get("students.age")?.patchValue(response.age),
            this.studentForm.get("students.address")?.patchValue(response.address),
            this.studentForm.get("students.phone")?.patchValue(response.phone),
            this.studentForm.get("students.gender")?.patchValue(response.gender)

        }
      )
    }


    this.studentForm = this.formBuilder.group({
      students: this.formBuilder.group({
        userName: ['', [Validators.required,Validators.minLength(4),SpaceValidator.noSpaces]],
        age: ['', [Validators.required,Validators.maxLength(2),Validators.pattern("^[0-9]*$")]],
        address: ['', [Validators.required,Validators.minLength(4),SpaceValidator.noSpaces]],
        phone: ['', [Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern("^[0-9]*$"),SpaceValidator.noSpaces]],
        gender: ['', [Validators.required]]
      })
    });
  }

  get userName() {
    return this.studentForm!.get('students.userName')!;
  }

  get age() {
    return this.studentForm!.get('students.age')!;
  }

  get address() {
    return this.studentForm!.get('students.address')!;
  }

  get phone() {
    return this.studentForm!.get('students.phone')!;
  }

  get gender() {
    return this.studentForm!.get('students.gender')!;
  }





  getUserName() {
    return this.studentForm.get('students')?.value.userName;
  }

  getAge() {
    return this.studentForm.get('students')?.value.age;
  }

  getAddress() {
    return this.studentForm.get('students')?.value.address;
  }

  getPhone() {
    return this.studentForm.get('students')?.value.phone;
  }

  getGender() {
    return this.studentForm.get('students')?.value.gender;
  }


  done() {
    const stu = new Student(this.id,this.getUserName(),this.getGender(),this.getAge(),this.getPhone(),this.getAddress());
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    }else{
      if(isNaN(this.id) || this.id == 0){
        console.log(" add :" + this.id)
        this.serviceStudent.addStudent(stu).subscribe(
          response => {
            this.router.navigateByUrl('/students');
          }
        )
      } else {
        console.log( " edit :" + this.id)
        this.serviceStudent.editStudent(stu,this.id).subscribe(
          response => {
            this.router.navigateByUrl('/students');
          }
        )
      }

    }


    console.log(this.getUserName())
    console.log(this.getAge())
    console.log(this.getAddress())
    console.log(this.getPhone())
    console.log(this.getGender())

  }
}
