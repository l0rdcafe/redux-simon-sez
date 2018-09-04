import { TOGGLE_PLAYING } from "../actions/playing";
import { GAME_RESET } from "../actions/shared";

const playing = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_PLAYING:
      return !action.playing;
    case GAME_RESET:
      return false;
    default:
      return state;
  }
};

export default playing;
