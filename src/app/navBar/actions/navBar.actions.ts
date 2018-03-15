import { Action } from '@ngrx/store';

export const ACTION_TYPES = {
  CHANGE_SCREEN: '[NAV_BAR] CHANGE_SCREEN',
  CHANGE_SCREEN_SUCCESS: '[NAV_BAR] CHANGE_SCREEN_SUCCESS',
  CHANGE_SCREEN_FAIL: '[NAV_BAR] CHANGE_SCREEN_FAIL',
};


export class ChangeScreen implements Action {
  readonly type = ACTION_TYPES.CHANGE_SCREEN;

  /// user a constructor to send a payload with the action
  constructor(public payload: boolean) {}
}

export class ChangeScreenSuccess implements Action {
  readonly type = ACTION_TYPES.CHANGE_SCREEN_SUCCESS;
  constructor(public payload: boolean) {}
}

export class ChangeScreenFail implements Action {
  readonly type = ACTION_TYPES.CHANGE_SCREEN_FAIL;
  constructor(public payload?: string) {}
}

export type All
  = ChangeScreen |  ChangeScreenSuccess | ChangeScreenFail;
