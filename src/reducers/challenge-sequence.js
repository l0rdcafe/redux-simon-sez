import { GAME_RESET, NEXT_ROUND } from "../actions/shared";

const challengeSequence = (state = "", action) => {
  switch (action.type) {
    case NEXT_ROUND:
      return state.concat(action.color);
    case GAME_RESET:
      return "";
    default:
      return state;
  }
};

export default challengeSequence;
