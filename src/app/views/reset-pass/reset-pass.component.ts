import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../../shared/rest-service.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  constructor(private service:RestServiceService) { }

  ngOnInit() {
  }
  resetPassword(email: String){
    this.service.resetPassword(email).subscribe(res=>{
      alert("ok");
    })
  }

}
