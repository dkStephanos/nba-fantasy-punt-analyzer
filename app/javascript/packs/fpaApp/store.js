import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

import playerReducer from "./reducers/playerReducer";
import leagueReducer from "./reducers/leagueReducer";
import teamReducer from "./reducers/teamReducer";
import statReducer from "./reducers/statReducer";
import userReducer from "./reducers/userReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1 // see "Merge Process" section for details.
};

const reducers = combineReducers({
  playerReducer,
  leagueReducer,
  teamReducer,
  statReducer,
  userReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
);

export const persistor = persistStore(store);
