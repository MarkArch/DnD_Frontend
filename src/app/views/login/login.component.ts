import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestServiceService } from '../../shared/rest-service.service';
import { postlogin } from '../../class/postlogin';
import { SharedVariableService } from '../../shared/shared-variable.service';
import { FacebookService, InitParams, LoginResponse, LoginStatus, LoginOptions } from 'ngx-facebook';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  ngOnInit() {

  }
  public accounts: postlogin[] = [];
  isLoginFailed=false;
  constructor(public route: ActivatedRoute, private fb: FacebookService, public router: Router, private service: RestServiceService, private shared: SharedVariableService) {
    let initParams: InitParams = {
      appId: '285738238803032',
      cookie: true,
      xfbml: true,
      version: 'v3.2'
    };
    fb.init(initParams);
 /*   const socket = new SockJS('http://93.55.227.222:9001/gs-guide-websocket');
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.send('/app/hello/1',{},JSON.stringify({'name':'prova'}))
      stompClient.subscribe('/topic/greetings/1', function (hello) {
        alert(hello)
      });
      stompClient.send('/app/hello/1',{},JSON.stringify({'name':'prova'}))
    });*/
  }
  onRegister() {
    this.router.navigate(['/register']);
  }

  onLogin(username, password) {
    //this.router.navigate(['/campaign']);
    this.service.login(username, password).subscribe((res:any) => {
      console.log(res);
      if(res.changeCharName=='true'){
        this.router.navigate(['/newCharacter']);
      }else{
      this.router.navigate(['/campaign']);
      }
    }, err => {
      this.isLoginFailed=true;
    });
  }
  onSubmitFacebookLogin(socialPlatform: string) {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,email'
    };
    this.fb.getLoginStatus().then((res: LoginStatus) => {
      console.log(res.status); if (res.status != 'connected') {
        this.fb.login(loginOptions)
          .then((res: LoginResponse) => {
            this.service.facebookLogin(res.authResponse.accessToken).subscribe(res=>{console.log(res);this.router.navigate(['/campaign']);});
          })
          .catch(this.handleError);
      }else{
        this.service.facebookLogin(res.authResponse.accessToken).subscribe(res=>{console.log(res);this.router.navigate(['/campaign']);})
      }
    });
  }
  onFacebookLogout() {
    this.fb.getLoginStatus().then((res: LoginStatus) => {
      console.log(res.status); if (res.status == 'connected') {
        this.fb.logout().then(() => console.log("logged out")).catch(err => console.log(err));
      }
    });
  }
  private handleError(error) {
    console.error('Error processing action', error);
  }
  onKeydown(event,username,password) {
    if (event.key === "Enter") {
      this.onLogin(username,password);
    }
  }
 passReset(){
  this.router.navigate(['/resetPass']);
 }
}
