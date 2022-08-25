import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
          //   "Content-Type": "application/json",
        },
      });
    }
    return next.handle(request);
  }
}