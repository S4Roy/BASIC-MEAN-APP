import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userRegistration!: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userRegistration = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]'?[- a-zA-Z]+$")]],
      lastname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]'?[- a-zA-Z]+$")]],
      email: ["", [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      country: [],
      state: [],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    }, { validators: this.passwordMatchingValidatior })
  }
  onSubmit() {
    console.log(this.userRegistration.value);

  }
  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };

}
