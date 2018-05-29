const initialState = {
  currentUser: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CURRENT_USER_SUCCESS":
      return Object.assign({}, state, {
        currentUser: action.currentUser
      });

    default:
      return state;
  }
};
