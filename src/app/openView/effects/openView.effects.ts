import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { ofType, toPayload } from 'ts-action-operators';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { ACTION_TYPES, All as openViewActions, OpenView, OpenViewFailed, OpenViewSuccess } from '../actions/openView.actions';
import { OpenViewService } from '../services/openView.service';
import { View } from '../models/view.model';
export type Action = openViewActions;

@Injectable()
export class OpenViewEffects {
  constructor(private actions$: Actions, private openViewService: OpenViewService) {}

  @Effect()
    onOpenView$ = this.actions$
      .ofType<Action>(ACTION_TYPES.OPEN_VIEW)
      .switchMap((action: OpenView) => {
        return this.openViewService.getView(action.payload)
          .map((response: any) => {
            console.log(response);
            const viewName = {type: response.viewName };
            const centerLocation = {x: response.centerLocation.x, y: response.centerLocation.y};
            const items = response.items;
            const id = response._id;
            const result: View = { viewData: {centerLocation, id, items, viewName}};
            return new OpenViewSuccess(result);
           })
          .catch((err) => {
              return Observable.of(new OpenViewFailed());
          });
      });
}
