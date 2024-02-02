import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up the timer with a 1-second interval
    const timer = setTimeout(() => {
      // Decrease the timeRemaining by 1 second
      setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    // Clean up the timer when the component is unmounted or when timeRemaining hits 0
    return () => {
      // Call the onAnswered callback with a value of false
      onAnswered(false);
      clearTimeout(timer);
      if (timeRemaining === 0) {
        // Reset timeRemaining back to 10 seconds
        setTimeRemaining(10);
        
      }
    };
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    // Reset timeRemaining back to 10 seconds
    setTimeRemaining(10);
    // Call the onAnswered callback with the provided value
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
