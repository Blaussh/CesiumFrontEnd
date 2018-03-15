import { ACTION_TYPES as ShapesActions, All} from '../actions/shapes.actions';
import { Shape } from '../models';

export type Action = All;

/// Default app state
const defaultState = '';

/// Reducer function
export function ShapesReducer(state: string = defaultState, action: Action) {
  console.log(action.type, state);
  switch (action.type) {
    case ShapesActions.CHANGE_SHAPE_SUCCESS:
     {
       return {
           state,
           name: <any>action.payload,
     };
    }

    default:
      return state;
  }
}
