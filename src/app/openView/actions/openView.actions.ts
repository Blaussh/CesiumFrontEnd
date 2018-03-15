import { Action } from '@ngrx/store';
import { View } from '../models/view.model';

export const ACTION_TYPES = {
  OPEN_VIEW: '[OPEN_VIEW] OPEN_VIEW',
  OPEN_VIEW_SUCCESS: '[OPEN_VIEW] OPEN_VIEW_SUCCESS',
  OPEN_VIEW_FAIL: '[OPEN_VIEW] OPEN_VIEW_FAIL',
};

export class OpenView implements Action {
  readonly type = ACTION_TYPES.OPEN_VIEW;

  /// user a constructor to send a payload with the action
  constructor(public payload: string) {}
}

export class OpenViewSuccess implements Action {
  readonly type = ACTION_TYPES.OPEN_VIEW_SUCCESS;
  constructor(public payload: View) {}
}

export class OpenViewFailed implements Action {
  readonly type = ACTION_TYPES.OPEN_VIEW_SUCCESS;
  constructor(public payload?: string) {}
}

export type All
  = OpenView | OpenViewSuccess | OpenViewFailed;
