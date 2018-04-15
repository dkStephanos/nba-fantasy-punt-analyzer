const initialState = {
  players: [],
  playerStart: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLAYERS_SUCCESS':
      return Object.assign({}, state, {
        players: [...state.players, ...action.players],
        playerStart: action.playerStart
      });

    default:
      return state;
  }
};