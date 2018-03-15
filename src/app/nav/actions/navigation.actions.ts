import { Action } from '@ngrx/store';
import { GeoCoordinates } from '../models/geoCoordinates.model';
import { View } from '../models/view.model';

export const ACTION_TYPES = {
  FETCH_NAVIGATE: '[NAV] FETCH_NAVIGATE',
  FETCH_NAVIGATE_SUCCESS: '[NAV] FETCH_NAVIGATE_SUCCESS',
  FETCH_NAVIGATE_FAIL: '[NAV] FETCH_NAVIGATE_FAIL',
  CHANGE_VIEW: '[NAV] CHANGE_VIEW',
  CHANGE_VIEW_SUCCESS: '[NAV] CHANGE_VIEW_SUCCESS',
  CHANGE_VIEW_FAIL: '[NAV] CHANGE_VIEW_FAIL',
};


export class GetAddress implements Action {
  readonly type = ACTION_TYPES.FETCH_NAVIGATE;

  /// user a constructor to send a payload with the action
  constructor(public payload: string) {}
}

export class GetAddressSuccess implements Action {
  readonly type = ACTION_TYPES.FETCH_NAVIGATE_SUCCESS;
  constructor(public payload: GeoCoordinates) {}
}

export class GetAddressFailed implements Action {
  readonly type = ACTION_TYPES.FETCH_NAVIGATE_FAIL;
  constructor(public payload?: string) {}
}

export type All
  = GetAddress |  GetAddressSuccess | GetAddressFailed;
