import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes = [
  {
    path: 'auth/sign-up',
    component: SignUpComponent
  },
  {
    path: 'auth/sign-in',
    component: SignInComponent
  },
  {
    path: 'auth/reset-password/:resetToken',
    component: ResetPasswordComponent,
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent
  }
]


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatAutocompleteModule,
  ]
})
export class AuthModule { }
