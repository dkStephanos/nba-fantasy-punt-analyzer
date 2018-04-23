const initialState = {
  team: {},
  teamId: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TEAM_SUCCESS':
      return Object.assign({}, state, {
        team: action.team
      });

    default:
      return state;
  }
};