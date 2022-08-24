import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  myProfile!: FormGroup;
  hide = true;
  edit: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myProfile = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]'?[- a-zA-Z]+$")]],
      lastname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]'?[- a-zA-Z]+$")]],
      email: ["", [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      country: [],
      state: [],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    })
  }
  onSubmit() {
    console.log(this.myProfile.value);

  }
  editProfile(fileType: any) {
    console.log(fileType);
    this.edit = true;
    document.getElementById(fileType)?.click()
  }
  onFileSelect(event: any, fileType: any) {
    console.log(event);

  }

}
