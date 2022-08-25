import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '../app/auth/auth.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { TokenInterceptor } from './services/token.service';
import { UtilsService } from './services/utils.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { MatTooltipModule } from '@angular/material/tooltip';

const appRoutes: Routes = [
  //auth
  {
    path: "auth/sign-up",
    loadChildren: () => import("../app/auth/auth.module").then(
      (m) => m.AuthModule
    )
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
]
@NgModule({
  declarations: [
    AppComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    AuthModule,
    UserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthGuard,
    ApiService,
    UtilsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
