import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {  } from './cesium/components';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isCreate = true;
  public isAuthenticated = false;
  constructor(private http: HttpClient, private store: Store<any>) {
    this.isCreate = true;
  }
  private navBarStore$ = this.store.select(store => store.navBar);

  text: string; /// form input val
  ngOnInit(): void {
    this.navBarStore$.subscribe((val) => {
        this.isCreate = val.isCreate;
    });
  }
}
