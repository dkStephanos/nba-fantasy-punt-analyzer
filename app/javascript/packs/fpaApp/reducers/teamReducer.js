const initialState = {
  team: {},
  userTeams: [],
  userCurrentTeam: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_TEAM_SUCCESS":
      return Object.assign({}, state, {
        team: action.team
      });

    case "GET_USER_TEAMS_SUCCESS":
      return Object.assign({}, state, {
        userTeams: action.userTeams
      });

    case "GET_USER_CURRENT_TEAM_SUCCESS":
      return Object.assign({}, state, {
        userCurrentTeam: action.userCurrentTeam
      });

    default:
      return state;
  }
};
