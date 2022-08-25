import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public user;
  public hideCurrent = true;
  public hideNew = true;
  public hideConfirmNew = true;
  public changePasswordFormGroup: FormGroup;
  public isSubmitting = false;
  constructor(
    private apiService: ApiService,
    private utils: UtilsService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.user = this.utils.getUser();

    this.changePasswordFormGroup = this.fb.group({
      _id: [this.user._id, Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.passwordMatchingValidatior });
  }


  ngOnInit(): void {
  }
  onSubmit() {
    if (this.changePasswordFormGroup.valid) {
      this.isSubmitting = true;
      console.log(this.changePasswordFormGroup.value);
      this.apiService.post('/change-password', this.changePasswordFormGroup.value).subscribe(
        (data) => {
          this.isSubmitting = false;
          this.snackBar.open('Password changed successfully', '', {
            duration: 3000,
            verticalPosition: 'top'
          });
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          this.router.navigateByUrl("/auth/login");
        },
        (err) => {
          this.isSubmitting = false;
          this.snackBar.open(err.error.message, '', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      );
    }
  }

  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const confirmNewPassword = control.get('confirmNewPassword');

    return newPassword?.value === confirmNewPassword?.value ? null : { notmatched: true };
  };
}
