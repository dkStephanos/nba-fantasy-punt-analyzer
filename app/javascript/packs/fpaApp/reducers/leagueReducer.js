const initialState = {
  leagues: [],
  league: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LEAGUE_SUCCESS':
      return Object.assign({}, state, { league: action.league });

    case 'GET_LEAGUES_SUCCESS':
      return Object.assign({}, state, {
        leagues: [...state.leagues, ...action.leagues]
      });

    default:
      return state;
  }
};