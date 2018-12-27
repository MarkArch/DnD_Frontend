import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(public route: ActivatedRoute, public router: Router) {}
  onRegister() {
    this.router.navigate(['/register']);
  }

  onLogin() {
    this.router.navigate(['/campaign']);
  }

}
