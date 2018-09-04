import { TOGGLE_STRICT } from "../actions/strict";

const strict = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_STRICT:
      return !action.strict;
    default:
      return state;
  }
};

export default strict;
