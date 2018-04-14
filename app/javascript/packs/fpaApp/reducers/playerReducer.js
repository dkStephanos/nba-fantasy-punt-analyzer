const initialState = {
  players: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLAYERS_SUCCESS':
      return Object.assign({}, state, {
        players: [...state.players, ...action.players]
      });

    default:
      return state;
  }
};