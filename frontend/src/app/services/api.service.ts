import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  backend: String = "";
  constructor(private http: HttpClient) {
    this.backend = "https://api.subhankarroy.in/api"
    this.backend = "http://localhost:5000/api";
  }
  //post call
  post(route: string, data: { [k: string]: any }) {
    return this.http.post<any>(this.backend + route, data);
  }

  //Patch call
  patch(route: string, data: { [k: string]: any }) {
    return this.http.patch<any>(this.backend + route, data);
  }

  //get call
  get(route: string) {
    return this.http.get<any>(this.backend + route);
  }

  //delete call
  delete(route: string) {
    return this.http.delete<any>(this.backend + route);
  }

  //getFile call
  getFile(route: string) {
    return this.backend + route;
  }
}