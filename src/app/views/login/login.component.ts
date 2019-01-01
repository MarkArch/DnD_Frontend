import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestServiceService } from '../../shared/rest-service.service';
import { postlogin } from '../../class/postlogin';
import { SharedVariableService } from '../../shared/shared-variable.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public accounts: postlogin[]=[];
  constructor(public route: ActivatedRoute, public router: Router, private service: RestServiceService,private shared:SharedVariableService) { }
  onRegister() {
    this.router.navigate(['/register']);
  }

  onLogin(username, password) {
    //this.router.navigate(['/campaign']);
    this.service.login(username, password).subscribe(res => {
      let i = 0;
      while (res[i] != null) {
        let account: postlogin=new postlogin();
        account.alive = res[i].alive;
        account.charName = res[i].charName;
        account.session_id = res[i].session_id;
        account.session_master = res[i].session_master;
        account.session_name = res[i].session_name;
        this.accounts.push(account);
        i = i + 1;
      }
      console.log(this.accounts);this.shared.setAccounts(this.accounts); this.router.navigate(['/campaign']);
    }, err => {
      console.log(err)
    });
  }

}
