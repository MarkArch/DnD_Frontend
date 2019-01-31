import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../../shared/rest-service.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.scss']
})
export class NewCharacterComponent implements OnInit {

  constructor(private rest:RestServiceService,private router:Router,private toast:ToastrService) { }

  ngOnInit() {
  }
  onChangeCharName(value){
    this.rest.updatePg('charName',value).subscribe(res=>this.router.navigate(['/campaign']),err=>this.toast.error('Something went wrong, please try again in a moment'));
  }
}
