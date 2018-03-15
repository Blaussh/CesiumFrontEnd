import { Component, OnInit } from '@angular/core';
// import { NavigationService } from '../../services';
// import { Navigate } from '../../models/navigation.model';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// import { GetAddress } from '../../actions/navigation.actions';
import { View } from '../../../cesium/models';
import { ChangeScreen } from '../../actions';
import { AuthService } from '../../../login/services';

// interface AppState {
//   // navigation: Navigate;
// }


@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavBarComponent implements OnInit {

  constructor(private store: Store<any>, public authService: AuthService) {
    this.showCreate();
   }
  address: string;

  ngOnInit(): void {
    this.store.dispatch(new ChangeScreen(true));
  }

  showOpen() {
    this.store.dispatch(new ChangeScreen(false));
  }

  showCreate() {
    this.store.dispatch(new ChangeScreen(true));
  }
}
