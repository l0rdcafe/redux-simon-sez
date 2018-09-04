const ACCEPTING = "ACCEPTING";
const NEW_ROUND = "NEW_ROUND";

const handleUserInput = color => ({ type: ACCEPTING, color });

const newRound = () => ({ type: NEW_ROUND });

export { ACCEPTING, NEW_ROUND, handleUserInput, newRound };
