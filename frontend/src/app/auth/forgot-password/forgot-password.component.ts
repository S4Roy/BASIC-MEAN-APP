import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }
  onSubmit() {
    this.api.post("/forgot-password", this.forgotForm.value).subscribe((data) => {
      this.snackBar.open("Reset mail sent Succesfully", "", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }, (err) => {
      console.log(err);
      this.snackBar.open(err.error.message, "OK", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      });
    });

  }

}
