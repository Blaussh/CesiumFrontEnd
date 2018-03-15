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

import {
  ACTION_TYPES,
  All as navBarActions,
  ChangeScreen,
  ChangeScreenSuccess,
  ChangeScreenFail
} from '../actions/navBar.actions';
export type Action = navBarActions;

@Injectable()
export class NavBarEffects {
  constructor(
    private actions$: Actions,
  ) {}

  @Effect()
  onScreenChang$ = this.actions$
    .ofType<Action>(ACTION_TYPES.CHANGE_SCREEN)
    .switchMap((action: ChangeScreen) => {
      return Observable.of(new ChangeScreenSuccess(action.payload));
    })
    .catch(err => {
      return Observable.of(new ChangeScreenFail());
    });
}
