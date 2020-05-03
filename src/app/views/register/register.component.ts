import { Component } from '@angular/core';
import { RestServiceService } from '../../shared/rest-service.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
usernameFlag=false;
emailFlag=false;
passwordFlag=false;
  constructor(private service:RestServiceService,public router:Router) { }

public register(username:string,email:string,password:string,password1:string){
  if(username=='' || email=='' || password==''){
  if(username==''){
    this.usernameFlag=true;
  }
  if(email==''){
    this.emailFlag=true;
  }
  if(username==''){
    this.passwordFlag=true;
  }
}
  else if(password==password1){
    this.usernameFlag=false;
    this.emailFlag=false;
    this.passwordFlag=false;
    this.service.register(username,password,email).subscribe(res=>{this.router.navigate(['/campaign'])},err=>{console.log(err)});
  }
}
public back(){
  this.router.navigate(['/login']);
}
}
