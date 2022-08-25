import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword!: FormGroup;
  tokenId;
  hide: boolean = true
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.tokenId = this.activatedRoute.snapshot.params['token'];
  }

  ngOnInit(): void {
    this.resetPassword = this.fb.group({
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required]]
    }, { validators: this.passwordMatchingValidatior })
  }
  onSubmit() {
    this.api.post("/reset-password/" + this.tokenId, this.resetPassword.value).subscribe((data) => {
      console.log('password changed successfully');
      this.router.navigateByUrl("/auth/sign-in/");
      this.snackBar.open("Password Changed Succesfully", "", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    }, (err) => {
      this.snackBar.open(err.error.message, "OK", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      });
    });
  }
  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    return password?.value === passwordConfirm?.value ? null : { notmatched: true };
  };
}
