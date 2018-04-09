const initialState = {
  users: [],
  user: {},
  currentUser: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      return Object.assign({}, state, { user: action.user });

    case 'GET_CURRENT_USER_SUCCESS':
      return Object.assign({}, state, { currentUser: action.user });

    case 'GET_USERS_SUCCESS':
      return Object.assign({}, state, {
        users: [...state.users, ...action.users]
      });

    default:
      return state;
  }
};