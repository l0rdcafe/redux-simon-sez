import { SET_FLASH_COLOR, RESET_COLORS } from "../actions/current-color";
import { GAME_RESET } from "../actions/shared";

const currColor = (state = "", action) => {
  switch (action.type) {
    case RESET_COLORS:
    case GAME_RESET:
      return "";
    case SET_FLASH_COLOR:
      return action.color;
    default:
      return state;
  }
};

export default currColor;
