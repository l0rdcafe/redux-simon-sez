import { NEXT_ROUND, REPEAT_ROUND } from "./shared";

const nextRound = color => ({ type: NEXT_ROUND, color });

const repeatRound = () => ({ type: REPEAT_ROUND });

export { nextRound, repeatRound };
