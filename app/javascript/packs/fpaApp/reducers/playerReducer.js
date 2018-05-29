const initialState = {
  players: [],
  userTeamPlayers: [],
  filteredPlayers: [],
  currentFilters: { categories: [], positions: [], statuses: [] }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PLAYERS_SUCCESS":
      return Object.assign({}, state, {
        players: [...action.players]
      });

    case "GET_USER_TEAM_PLAYERS_SUCCESS":
      return Object.assign({}, state, {
        userTeamPlayers: [...action.userTeamPlayers]
      });

    case "SET_FG_AND_FT_IMPACTS":
      return Object.assign({}, state, {
        players: [...action.players]
      });

    case "SET_Z_SCORES":
      return Object.assign({}, state, {
        players: [...action.players]
      });

    case "SET_PLAYER_RANKS":
      return Object.assign({}, state, {
        players: [...action.players]
      });

    case "SORT_PLAYERS_SUCCESS":
      return Object.assign({}, state, {
        players: [...action.players]
      });

    case "SET_FILTERED_PLAYERS":
      return Object.assign({}, state, {
        filteredPlayers: [...action.players]
      });

    default:
      return state;
  }
};
