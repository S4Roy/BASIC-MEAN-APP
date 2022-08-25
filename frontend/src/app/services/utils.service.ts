import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  user: any = localStorage.getItem("user")
  constructor() { }
  getUser() {
    return JSON.parse(this.user);
  }
}