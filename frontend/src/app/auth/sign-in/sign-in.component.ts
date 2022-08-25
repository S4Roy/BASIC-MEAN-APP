import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  onSubmit() {
    // console.log(this.signInForm.value);
    this.api.post("/login", this.signInForm.value).subscribe(
      (data) => {
        // console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      },
      (err) => {
        this.snackBar.open(err.error.message, "OK", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        })
      }
    );
  }

}
