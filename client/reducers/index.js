import { combineReducers } from "redux";

const updateData = (state, action) => {
  return action.data || state;
};

export default updateData;
