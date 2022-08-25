import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user;
  profilePic: string = "";
  constructor(
    private utils: UtilsService,
    private api: ApiService,
  ) {
    this.user = this.utils.getUser();
    // console.log(this.user);
    this.api.get("/user/" + this.user._id).subscribe((data) => {
      this.profilePic = this.api.getFile("/getFile/g/" + data.profilePic);
    })
  }

  ngOnInit(): void {
  }

}
