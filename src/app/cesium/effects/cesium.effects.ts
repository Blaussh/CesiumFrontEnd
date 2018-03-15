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

import { View } from '../models/view.model';
import { ACTION_TYPES, All as viewActions } from '../actions/cesium.actions';
import { CesiumService } from '../services';

export type Action = viewActions;

@Injectable()
export class CesiumEffects {
  constructor(private actions$: Actions, private cesiumService: CesiumService) {}

  // @Effect()
  //   onFetch$ = this.actions$
  //     .ofType<Action>(ACTION_TYPES.FETCH_VIEWS)
  //     .switchMap( (action: FetchViews) => {
  //       return this.cesiumService.fetchViews()
  //         .map((response: any) => {
  //           // tslint:disable-next-line:no-unused-expression
  //           const result: View[] = [];
  //           console.log(response);
  //           response.forEach(element => {
  //           const viewName = {type: element.viewName };
  //           const centerLocation = element.centerLocation;
  //           const items = element.items;
  //           const id = element._id;
  //             result.push({id, viewName, centerLocation, items});
  //           });
  //           return new FetchViewsSuccess(result);
  //         })
  //         .catch( (err) => {
  //               return Observable.of( new FetchViewsFailed());
  //         });
  //       });
}
