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

import { GeoCoordinates } from '../models/geoCoordinates.model';
import { ACTION_TYPES, All as navigationActions, GetAddressSuccess, GetAddressFailed, GetAddress } from '../actions/navigation.actions';
import { NavigationService } from '../services';
import { View } from '../models/view.model';
export type Action = navigationActions;

@Injectable()
export class NavigationEffects {
  constructor(private actions$: Actions, private navigationService: NavigationService) {}

  @Effect()
    onFetch$ = this.actions$
      .ofType<Action>(ACTION_TYPES.FETCH_NAVIGATE)
      .switchMap( (action: GetAddress) => {
        return this.navigationService.fly(action.payload)
            .map( (response: any) => {
              const {lat, lng } = response.results[0].geometry.location;

              const result: GeoCoordinates = {longitude: lng, latitude: lat } ;
              return  new GetAddressSuccess(result);
            })
            .catch( (err) => {
                return Observable.of( new GetAddressFailed());
            });
      });
}
