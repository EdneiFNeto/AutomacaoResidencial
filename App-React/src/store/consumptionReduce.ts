export interface NotesState {
  notes: object[];
}

const initialstate = {
  notes: [],
};

type Action = {type: 'ADD_NOTE'; payload: object};

export const consumptionReducer = (
  _state: NotesState = initialstate,
  _action: Action,
) => {
  switch (_action.type) {
    case 'ADD_NOTE': {
      return {..._state, note: [..._state.notes, _action.payload]};
    }

    default:
      return _state;
  }
};
