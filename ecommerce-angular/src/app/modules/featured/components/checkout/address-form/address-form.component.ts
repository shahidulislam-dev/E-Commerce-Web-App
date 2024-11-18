import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {
  addresses = [1,1,1]
  myForm!:FormGroup;
  constructor(private formBuilder: FormBuilder){
    this.myForm= this.formBuilder.group({
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      streetAddress:["", Validators.required],
      city:["", Validators.required],
      district:["", Validators.required],
      zipCode:["", Validators.required],
      mobile:["", Validators.required],
    });
  }
  
  

  handleSubmit(){
    const formVlue = this.myForm.value
    console.log("Forms data", formVlue);
    
  }

  handleCreateOrder(item:any){}
}
