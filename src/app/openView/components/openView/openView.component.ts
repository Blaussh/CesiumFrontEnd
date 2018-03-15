import { Component, OnInit } from '@angular/core';
import { OpenViewService } from '../../services';
import { OpenView } from '../../actions/openView.actions';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { View } from '../../models/view.model';

interface AppState {
  openView: View;
}

@Component({
  selector: 'app-open-view',
  templateUrl: 'openView.component.html',
  styleUrls: ['openView.component.css']
})

export class OpenViewComponent implements OnInit {

  constructor(private store: Store<any>, private openViewService: OpenViewService) { }
  private cesiumStore$ = this.store.select(store => store.cesium);
  private viewList: View[] = [];
  public viewsNamesIds = [];
  address: string;
  ngOnInit(): void {
    this.cesiumStore$
      .subscribe((viewsData) => {
        if (viewsData.views !== undefined) {
         this.viewsNamesIds =  viewsData.views.map(a => new Object({name: a.viewName.type, id: a.id}));
        }
      });
      const x = this.openViewService.fetchViews()
      .subscribe((response: any) => {
        // tslint:disable-next-line:no-unused-expression
        const result: View[] = [];
        console.log(response);
        let currentView: View;
        response.forEach(element => {
          if (element.centerLocation !== undefined) {
            currentView = {viewData:  {id: element._id, viewName: {type: element.viewName },
                             centerLocation: {x: element.centerLocation.x, y: element.centerLocation.y},
                             items: element.items}};
            this.viewList.push(currentView);
          }
        });
        this.viewsNamesIds =  this.viewList.map(a => new Object({name: a.viewData.viewName.type, id: a.viewData.id}));
      });
  }

  onSelectionChanged(event) {
    this.store.dispatch(new OpenView(this.viewList[event].viewData.id));
  }
}
