import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../../states/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit{

  @Input() changeTemplate:any
  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private store: Store, private authService: AuthService){
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }
  
  
  ngOnInit(): void {
    
  }
  
  

  submitForm(): void{
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value)
      console.log("Login req data", this.loginForm.value);
      
    }
  }

}
