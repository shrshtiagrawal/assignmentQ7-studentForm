import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup ,FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;
  get userName() {
    return this.registrationForm.get('userName');
  }

  get email(){
    return this.registrationForm.get('email');
  }
  
  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail(){
    this.alternateEmails.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      dob: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        pin: ['']
      }),
      alternateEmails: this.fb.array([])
    }, { validator: PasswordValidator });
    this.registrationForm.get('subscribe').valueChanges
    .subscribe(checkedValue => {
      const email =this.registrationForm.get('email');
      if(checkedValue){
        email.setValidators(Validators.required);
      }else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
  }

  loadApiData() {
    this.registrationForm.setValue(
      {
        userName: 'Shrshti',
        password: 'test',
        confirmPassword: 'test',
        dob: '1994-12-27',
        address: {
          city: 'Pune',
          state: 'Mharastra',
          pin: '411057'
        }
      }
    );
  }

  onSubmit(){
    console.log(this.registrationForm.value);
   
  }
}