import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SpaceValidator} from "../models/validator/space-validator";
import {AuthenticationService} from "../service/Authentication/authentication.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements  OnInit {

  logForm!: FormGroup;  // Use the non-null assertion operator
  message!: string;
  showAlert:boolean=false;
  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService,private router : Router) { }

  ngOnInit():void {
    this.logForm = this.formBuilder.group({
      admin: this.formBuilder.group({
        userName: ['', [Validators.required,Validators.minLength(4),SpaceValidator.noSpaces]],
        password: ['', [Validators.required, Validators.minLength(4)]]
      })
    });
  }

  get UserName(){
    return this.logForm!.get('admin.userName')!;
  }

  get Password(){
    return this.logForm!.get('admin.password')!;

  }


  OnSubmit() {
    if(this.logForm.invalid){
      this.logForm.markAllAsTouched();
    }else{
      const adminForm = this.logForm.get('admin') as FormGroup;
      const userName = adminForm.get('userName')?.value;
      const password = adminForm.get('password')?.value;

      this.auth.executeAuthentication(userName, password).subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl('home');
        },error => {
          this.message = "Incorrect Username or  Password.";
          this.showAlert = true;
          this.hideMessageAfterDelay();
        }
      )

      /*
      const res =this.loginService.login(userName, password);
      if(res == true){
        this.router.navigateByUrl('home');
      }else{
        this.message = "Incorrect Username or  Password.";
        this.showAlert = true;
        this.hideMessageAfterDelay();
      }*/
    }

  }

  hideMessageAfterDelay() {
    setTimeout(() => {
      this.showAlert = false; // Hide alert after 3000 ms
    }, 3000);
  }


}
