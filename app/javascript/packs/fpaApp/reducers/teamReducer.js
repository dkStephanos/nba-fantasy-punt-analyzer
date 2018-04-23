const initialState = {
  team: {},
  teams: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TEAM_SUCCESS':
      return Object.assign({}, state, {
        team: action.team
      });

    case 'GET_TEAMS_SUCCESS':
      return Object.assign({}, state, {
        teams: [...state.teams, ...action.teams]
      });

    default:
      return state;
  }
};