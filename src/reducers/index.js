import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./user";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    index: (state = {}, action) => {
      switch (action.type) {
        default:
          return state;
      }
    },
    user,
  });
export default rootReducer;
