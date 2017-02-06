import { combineReducers } from "redux";

const updateData = (state, action) => {
  return action.data || {};
};

export default updateData;
