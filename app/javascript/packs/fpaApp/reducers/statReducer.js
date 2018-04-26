const initialState = {
  means: {},
  categoryLabels: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MEANS':
      return Object.assign({}, state, {
        means: action.means
      });

    case 'SET_CATEGORY_LABELS':
      return Object.assign({}, state, {
        categoryLabels: action.categoryLabels
      });

    default:
      return state;
  }
};