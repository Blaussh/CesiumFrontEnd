import { ACTION_TYPES as NavBarActions, All} from '../actions/navBar.actions';

export type Action = All;

/// Default app state
const defaultState = '';

/// Reducer function
export function navBarReducer(state = defaultState, action: Action) {
  console.log(action.type, state);
  switch (action.type) {
    case NavBarActions.CHANGE_SCREEN_SUCCESS:
     {
       return {
         state,
         isCreate: <any>action.payload,
     };
    }
    default:
      return state;
  }
}
