import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user: any = localStorage.getItem("user")
    JSON.parse(user)
    if (!JSON.parse(user)) {
      this.router.navigateByUrl("/auth/sign-in")
      this.snackBar.open("You have to Sign In", "", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
      return false;
    }
    else {
      return true;
    }

  }

}
