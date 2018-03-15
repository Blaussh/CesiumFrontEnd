import { ACTION_TYPES as CesiumActions, All} from '../actions/cesium.actions';
import { View } from '../models';

export type Action = All;

/// Default app state
const defaultState: View[] = [];

/// Reducer function
export function CesiumReducer(state: View[] = defaultState, action: Action) {
  console.log(action, state);
  switch (action) {
    default:
      return state;
  }
}
