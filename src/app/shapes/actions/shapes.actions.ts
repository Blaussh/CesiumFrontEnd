import { Action } from '@ngrx/store';
import { Shape } from '../models/shape.model';

export const ACTION_TYPES = {
  CHANGE_SHAPE: '[SHAPES] CHANGE_SHAPE',
  CHANGE_SHAPE_SUCCESS: '[SHAPES] CHANGE_SHAPE_SUCCESS',
  CHANGE_SHAPE_FAIL: '[SHAPES] CHANGE_SHAPE_FAIL'
};


export class ChangeShape implements Action {
  readonly type = ACTION_TYPES.CHANGE_SHAPE;

  /// user a constructor to send a payload with the action
  constructor(public payload: string) {}
}

export class ChangeShapeSuccess implements Action {
  readonly type = ACTION_TYPES.CHANGE_SHAPE_SUCCESS;
  constructor(public payload: string) {}
}

export class ChangeShapeFailed implements Action {
  readonly type = ACTION_TYPES.CHANGE_SHAPE_FAIL;
  constructor(public payload?: string) {}
}

export type All
  = ChangeShape |  ChangeShapeSuccess | ChangeShapeFailed;
