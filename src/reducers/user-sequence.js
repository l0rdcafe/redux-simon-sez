import { ACCEPTING, NEW_ROUND } from "../actions/user-sequence";
import { GAME_RESET, REPEAT_ROUND } from "../actions/shared";

const userSequence = (state = "", action) => {
  switch (action.type) {
    case ACCEPTING:
      return state.concat(action.color);
    case NEW_ROUND:
    case GAME_RESET:
    case REPEAT_ROUND:
      return "";
    default:
      return state;
  }
};

export default userSequence;
