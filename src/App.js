import React, { Component } from "react";
import { Container, Heading, Button, Circle, Box, Flex } from "rebass";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { COLORS_ARR as colors } from "./constants";
import { togglePlaying } from "./actions/playing";
import { nextRound, repeatRound } from "./actions/challenge-sequence";
import { handleUserInput, newRound } from "./actions/user-sequence";
import { flashColor } from "./actions/current-color";
import { toggleStrict } from "./actions/strict";
import { resetGame } from "./actions/shared";
import g from "./audio/simonSound1.mp3";
import b from "./audio/simonSound2.mp3";
import r from "./audio/simonSound3.mp3";
import o from "./audio/simonSound4.mp3";

class App extends Component {
  constructor(props) {
    super(props);

    this.g = new Audio(g);
    this.o = new Audio(o);
    this.r = new Audio(r);
    this.b = new Audio(b);
  }
  togglePlaying = () => {
    const { playing } = this.props.state;

    this.props.dispatch(togglePlaying(playing));

    if (playing) {
      this.resetGame();
    } else {
      this.nextRound();
    }
  };
  toggleStrict = () => {
    const { strict } = this.props.state;
    this.props.dispatch(toggleStrict(strict));
  };
  resetGame = () => {
    this.props.dispatch(resetGame());
  };
  nextRound = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    this.props.dispatch(nextRound(color));
    const count = this.props.state.challengeSequence.length;
    const delay = this.calcDelay(count);
    this.props.dispatch(flashColor(delay, this));
  };
  handleClick = e => {
    const { challengeSequence, userSequence, playing } = this.props.state;
    if (!playing) {
      return;
    }

    this.props.dispatch(handleUserInput(e.target.id));
    const answer = `${userSequence}${e.target.id}`;

    if (challengeSequence.length === answer.length) {
      if (challengeSequence === answer) {
        this.props.dispatch(newRound());
        this.nextRound();
      } else {
        console.log("YOU LOST");
        this.props.dispatch(repeatRound());
        const count = challengeSequence.length;
        const delay = this.calcDelay(count);
        this.props.dispatch(flashColor(delay));
      }
    } else if (!challengeSequence.startsWith(answer)) {
      console.log("YOU LOST STRICTLY");
      const count = challengeSequence.length;
      const delay = this.calcDelay(count);
      this.props.dispatch(flashColor(delay));
    }
  };
  calcDelay = count => {
    if (count < 4) {
      return 1250;
    }
    if (count < 8) {
      return 1000;
    }
    if (count < 12) {
      return 750;
    }
    return 500;
  };
  render() {
    const { playing, currColor, strict } = this.props.state;
    return (
      <Container p={4}>
        <Heading style={{ textAlign: "center" }}>Simon Sez</Heading>
        <Button style={{ display: "block", margin: "auto", marginTop: "5%" }} onClick={this.togglePlaying}>
          {playing ? "RESET" : "START"}
        </Button>
        {playing ? (
          <Button style={{ display: "block", margin: "auto", marginTop: "5%" }} onClick={this.toggleStrict}>
            STRICT: {strict ? "ON" : "OFF"}
          </Button>
        ) : null}
        <Flex mt={4} justifyContent="center">
          <Box m={4}>
            <Circle
              onClick={this.handleClick}
              id="r"
              bg="red"
              style={{ opacity: currColor === "r" ? 1 : 0.5, cursor: "pointer" }}
            />
            <Circle
              onClick={this.handleClick}
              id="o"
              bg="orange"
              style={{ opacity: currColor === "o" ? 1 : 0.5, cursor: "pointer" }}
            />
            <Circle
              onClick={this.handleClick}
              id="g"
              bg="green"
              style={{ opacity: currColor === "g" ? 1 : 0.5, cursor: "pointer" }}
            />
            <Circle
              onClick={this.handleClick}
              id="b"
              style={{ opacity: currColor === "b" ? 1 : 0.5, cursor: "pointer" }}
            />
          </Box>
        </Flex>
      </Container>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    strict: PropTypes.bool,
    playing: PropTypes.bool,
    currColor: PropTypes.string,
    challengeSequence: PropTypes.string,
    userSequence: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(App);
