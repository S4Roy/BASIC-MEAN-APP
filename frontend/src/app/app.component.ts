import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  user;
  constructor(
    private utils: UtilsService,
  ) {
    this.user = this.utils.getUser()
  }
  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "auth/sign-in";

  }
}
