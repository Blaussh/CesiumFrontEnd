import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NavigationService } from '../../services';
import { Navigate } from '../../models/navigation.model';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { GetAddress } from '../../actions/navigation.actions';
import { View } from '../../../cesium/models';

interface AppState {
  navigation: Navigate;
}

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css']
})

export class NavigationComponent implements OnInit {

  // @Output() viewNameChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private store: Store<any>, private navigationService: NavigationService) { }
  address: string;
  public viewName: string;
  ngOnInit(): void {
  }

  // onViewNameUpdated(event) {
  //   this.viewNameChanged.emit(event.target.value);
  // }

  fly() {
      this.store.dispatch(new GetAddress(this.address));
  }
}
