import {
  INPUT_CHANGE,
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  RESET_FORM,
  SET_INFO_MESSAGE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  NEW_ANSWER,
} from "./action-types";

import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answer) {
  return { type: SET_SELECTED_ANSWER, payload: answer };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(quiz) {
  return { type: SET_QUIZ_INTO_STATE, payload: quiz };
}

// export function inputChange(change) {
//   return { type: INPUT_CHANGE, payload: change };
// }

export function inputChange(name, payload) {
  return { type: INPUT_CHANGE, name, payload };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null));
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        console.log(err);
      }, []);
  };
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    selectAnswer(null);
  };
}
export function postQuiz(payload) {
  return function (dispatch) {
    axios.post("http://localhost:9000/api/quiz/new", payload).then((res) => {
      console.log(res.data);
      dispatch(
        setMessage(`Congrats: "${res.data.question}" is a great question!`)
      );
      dispatch(resetForm(true));
    });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
