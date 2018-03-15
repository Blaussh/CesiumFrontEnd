import { ACTION_TYPES as NavigationActions, All} from '../actions/navigation.actions';
import { Navigate } from '../models/navigation.model';

export type Action = All;

/// Default app state
const defaultState: Navigate = {
  center: {
    longitude: 0,
    latitude: 0
  }
};

/// Reducer function
export function navigationReducer(state: Navigate = defaultState, action: Action) {
  console.log(action.type, state);
  switch (action.type) {
    case NavigationActions.FETCH_NAVIGATE_SUCCESS:
     {
       return {
         ...state,
         center: {
           longitude: (<any>action.payload).longitude,
           latitude: (<any>action.payload).latitude
         }
     };
    }
    default:
      return state;
  }
}
