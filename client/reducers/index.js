import { combineReducers } from "redux";

const updateData = (state, action) => {
  // console.log("Reducer\n", state);
  return action.data || state;
};

export default updateData;
