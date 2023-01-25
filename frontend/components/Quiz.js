import React, { useEffect, useState } from "react";
import { setQuiz, fetchQuiz, selectAnswer } from "../state/action-creators";
import { connect, useDispatch, useSelector } from "react-redux";

function Quiz(props) {
  const { quiz, selectedAnswer, selectAnswer } = props;
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [null]);

  const onClickHandler = (number) => {
    dispatch(selectAnswer(quiz.answers[number].answer_id));
    setActive(number);
  };
  console.log(selectedAnswer);
  console.log(props);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."

        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer${active === 0 ? " selected" : ""} `}>
                {quiz.answers &&
                  quiz.answers.map((answer, index) => (
                    <div key={answer.id}>{quiz.answers[0].text}</div>
                  ))}
                <button onClick={() => onClickHandler(0)}>
                  {active === 0 ? "SELECTED" : "select"}
                </button>
              </div>

              <div className={`answer${active === 1 ? " selected" : ""} `}>
                {quiz.answers &&
                  quiz.answers.map((answer, index) => (
                    <div key={index}>{quiz.answers[1].text}</div>
                  ))}
                <div>
                  <button onClick={() => onClickHandler(1)}>
                    {active === 1 ? "SELECTED" : "select"}
                  </button>
                </div>
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
  return {
    ...state,
    quiz: state.quiz,
  };
};

export default connect(mapStateToProps, { fetchQuiz, setQuiz, selectAnswer })(
  Quiz
);
