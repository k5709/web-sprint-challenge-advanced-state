import React from "react";
import { setQuiz, fetchQuiz } from "../state/action-creators";
import { connect } from "react-redux";

function Quiz(props) {
  console.log(props.quiz);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."

        props.quiz ? (
          <>
            <h2>What is a closure?</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                A function
                <button>SELECTED</button>
              </div>

              <div className="answer">
                An elephant
                <button>Select</button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}
const mapStateToProps = (state) => {
  return { ...state, quiz: state.quiz };
};

export default connect(mapStateToProps, { fetchQuiz, setQuiz })(Quiz);
