import { sleep } from "../constants";

const SET_FLASH_COLOR = "SET_FLASH_COLOR";
const RESET_COLORS = "RESET_COLORS";

const resetColors = () => ({ type: RESET_COLORS });

const setFlashColor = color => ({ type: SET_FLASH_COLOR, color });

const flashColor = (delay, obj) => async (dispatch, getState) => {
  dispatch(resetColors());
  const { challengeSequence } = getState();
  for (const color of challengeSequence) {
    dispatch(setFlashColor(color));
    obj[color].play();
    await sleep(delay);
    dispatch(resetColors());
    await sleep(delay / 4);
  }
};

export { RESET_COLORS, SET_FLASH_COLOR, flashColor };
