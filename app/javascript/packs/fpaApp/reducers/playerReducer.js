const initialState = {
  players: [],
  freeAgentsStart: 1,
  freeAgents: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FREE_AGENTS_SUCCESS':
      return Object.assign({}, state, {
        freeAgents: [...state.players, ...action.players],
        freeAgentsStart: action.playerStart
      });

    case 'GET_PLAYERS_SUCCESS':
      return Object.assign({}, state, {
        players: [...action.players]
      });

    case 'SET_Z_SCORES':
      return Object.assign({}, state, {
        players: [...action.players]
      });

    case 'SET_PLAYER_RANKS':
      return Object.assign({}, state, {
        players: [...action.players]
      });

    default:
      return state;
  }
};