import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  user;
  constructor(private utils: UtilsService) {
    this.user = this.utils.getUser()
  }

  ngOnInit(): void {
  }

}
