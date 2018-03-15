import { ACTION_TYPES as OpenViewActions, All} from '../actions/openView.actions';
import { View } from '../models/view.model';

export type Action = All;

/// Default app state
const defaultState: View = {
  viewData: {
      centerLocation: {
        x: 0,
        y: 0
      },
      id: '',
      items: [{classification: '', position_x: 0, position_y: 0, position_z: 0}],
      viewName: {
        type: ''
      }
}
};

/// Reducer function
export function OpenViewReducer(state: View = defaultState, action: Action) {
  console.log(action.type, state);
  switch (action.type) {
    case OpenViewActions.OPEN_VIEW_SUCCESS:
     {
       return {
         ...state,
         viewData: {
           ...state.viewData,
           ...(<any>action.payload)
         },
    };
    }
    default:
      return state;
  }
}
