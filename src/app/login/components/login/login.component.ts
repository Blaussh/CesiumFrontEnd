import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../services';

// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';
// import * as NavigationActions from '../../actions/navigation.actions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [AuthService]
})

export class LoginComponent {
  constructor(private authService: AuthService) { }
  loginData = { };

  login() {
    this.authService.login(this.loginData);
  }

}
