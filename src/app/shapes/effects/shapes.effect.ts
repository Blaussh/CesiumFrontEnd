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

import { Shape } from '../models/shape.model';
import { ACTION_TYPES, All as shapesActions, ChangeShapeSuccess, ChangeShapeFailed, ChangeShape } from '../actions/shapes.actions';
export type Action = shapesActions;

@Injectable()
export class ShapesEffects {
  constructor(private actions$: Actions) {}

  @Effect()
    onShapeChanged$ = this.actions$
      .ofType<Action>(ACTION_TYPES.CHANGE_SHAPE)
      .switchMap( (action: ChangeShape) => {
              return  Observable.of(new ChangeShapeSuccess(action.payload));
            })
            .catch( (err) => {
                return Observable.of( new ChangeShapeFailed());
            });
}
