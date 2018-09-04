import { combineReducers } from "redux";
import challengeSequence from "./challenge-sequence";
import playing from "./playing";
import currColor from "./current-color";
import userSequence from "./user-sequence";
import strict from "./strict";

export default combineReducers({ challengeSequence, playing, currColor, userSequence, strict });
