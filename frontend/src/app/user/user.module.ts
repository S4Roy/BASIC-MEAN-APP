import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { MatMenuModule } from '@angular/material/menu';

const routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  },

]


@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    ToolBarComponent
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
    MatMenuModule
  ]
})
export class UserModule { }
