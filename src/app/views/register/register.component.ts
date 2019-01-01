import { Component } from '@angular/core';
import { RestServiceService } from '../../shared/rest-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  constructor(private service:RestServiceService,public router:Router) { }

public register(username:string,email:string,password:string,password1:string){
  if(password==password1){
    this.service.register(username,password,email).subscribe(res=>{this.router.navigate(['/campaign'])},err=>{console.log(err)});
  }
}

}
