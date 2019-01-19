import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../../../shared/rest-service.service';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  constructor(public httpServ: RestServiceService) { }

  ngOnInit() {
    this.httpServ.isLoggedIn().subscribe(res => console.log(res));
    this.httpServ.campaignChosed().subscribe(res => console.log(res));
  }

}
