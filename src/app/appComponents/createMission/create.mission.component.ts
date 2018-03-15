import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CesiumComponent } from '../../cesium/components';
// // import { ShapesService } from './shapes.service';

// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NavigationComponent } from '../../nav/components';
import { NavBarComponent } from '../../navBar/components';


@Component({
  selector: 'app-create-mission',
  templateUrl: './create.mission.component.html',
  styleUrls: ['./create.mission.component.css'],
  providers: [NavigationComponent]
})

export class CreateMissionComponent {
  viewName = '';
  savedSuccess = false;
  @Output() viewNameChanged: EventEmitter<string> = new EventEmitter<string>();

  onNameUpdated(viewName: string) {
    this.viewName = viewName;
  }

  constructor(private http: HttpClient, private navigationComponent: NavigationComponent) { }
  save() {
    console.log(this.viewName);
    console.log(CesiumComponent.viewer.entities);
    console.log('save');
    const windowPosition = new Cesium.Cartesian2(CesiumComponent.canvas.clientWidth / 2, CesiumComponent.viewer.container.clientHeight / 2);
    const pickRay = CesiumComponent.viewer.scene.camera.getPickRay(windowPosition);
    const pickPosition = CesiumComponent.viewer.scene.globe.pick(pickRay, CesiumComponent.viewer.scene);
    const pickPositionCartographic = CesiumComponent.viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
    const centerLocation = {
      centerx: pickPositionCartographic.latitude * (180 / Math.PI),
      centery: pickPositionCartographic.longitude * (180 / Math.PI)
    };
    // console.log(pickPositionCartographic.latitude * (180/Math.PI));
    // tslint:disable-next-line:max-line-length
    const saveViewPath = 'http://localhost:8080/api/views';
    const loginPath = 'http://localhost:8080/users/login';
    // tslint:disable-next-line:max-line-length
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const loginBody = { 'username': 'shaib', 'password': 'shaib' };
    this.http.post(loginPath, loginBody, { headers }).subscribe((res) => {
      console.log(res);
    });
    // tslint:disable-next-line:max-line-length
    headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTk0YzgxZDlkZDE5NjQzZWM5MjJlMGYiLCJpYXQiOjE1MjEwMTg0MjMsImV4cCI6MTUyMjIyNDQyM30.an0SJcBhVZlG_Ayex0EYTNjwT5uK-4T-RsE0EjTxsUM');
    const addViewBody = {
      viewName: this.viewName,
      items: CesiumComponent.entitiesForDb,
      centerx: centerLocation.centerx, centery: centerLocation.centery
    };
    this.http.post<any>(saveViewPath, addViewBody, { headers }).subscribe((res) => {
      console.log('success!!' + res.status);
      if (res.status === 200) {
        this.savedSuccess = true;
      } else {
        this.savedSuccess = false;
      }

    });
  }

  onViewNameUpdated(event) {
    this.viewNameChanged.emit(event.target.value);
  }
}
