const initialState = {
  means: {},
  stdDeviations: {},
  categoryLabels: [],
  filteredMeans: {},
  filteredStdDeviations: {},
  currentFilters: { categories: [], positions: [], statuses: [] }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_MEANS":
      return Object.assign({}, state, {
        means: action.means
      });

    case "SET_STD_DEVIATIONS":
      return Object.assign({}, state, {
        stdDeviations: action.stdDeviations
      });

    case "SET_CATEGORY_LABELS":
      return Object.assign({}, state, {
        categoryLabels: action.categoryLabels
      });

    default:
      return state;
  }
};
