import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../../states/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  @Input() changeTemplate: any;
  registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private store: Store, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }


  ngOnInit(): void {

  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value)
      console.log("Login req data", this.registerForm.value);

    }
  }
}
