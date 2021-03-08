import { useCallback, useState } from 'react';

export const scores = {
  A: { value: 'A', min: 90, max: 100, color: 'green' },
  B: { value: 'B', min: 80, max: 89, color: 'black' },
  C: { value: 'C', min: 70, max: 79, color: 'black' },
  D: { value: 'D', min: 60, max: 69, color: 'black' },
  F: { value: 'F', min: 59, max: 0, color: 'red' }
};

export default function useGame({ questions: initialQuestions = [] }) {
  const [questions] = useState(initialQuestions);
  const [question, setQuestion] = useState(0);
  const [isEndedGame, setIsEndGame] = useState(false);
  const [answers, setAnswer] = useState([]);
  const [rank, setRank] = useState({});

  const qualifyAnswers = useCallback(
    (answers = []) => {
      let correctAnswers = 0;
      let wrongAnswers = 0;

      questions.forEach(({ answer: options }, i) => {
        const answer = answers[i];

        if (answer) {
          if (options.includes(answer)) {
            correctAnswers++;
          } else {
            wrongAnswers++;
          }
        } else {
          // wrongAnswers++;
        }
      });

      return { correctAnswers, wrongAnswers };
    },
    [questions]
  );

  const finalQualification = useCallback(
    (answers) => {
      const { correctAnswers, wrongAnswers } = qualifyAnswers(answers);
      const total = questions.length;

      if (total === 0 || wrongAnswers === total) {
        const rank = { qualification: 0, value: scores.F.value, color: scores.F.color };
        setRank(rank);
        return rank;
      }

      const qualification = Math.floor((correctAnswers / total) * 100);

      if (qualification >= scores.A.min && qualification <= scores.A.max) {
        const rank = { qualification, value: scores.A.value, color: scores.A.color };
        setRank(rank);
        return rank;
      }
      if (qualification >= scores.B.min && qualification <= scores.B.max) {
        const rank = { qualification, value: scores.B.value, color: scores.B.color };
        setRank(rank);
        return rank;
      }
      if (qualification >= scores.C.min && qualification <= scores.C.max) {
        const rank = { qualification, value: scores.C.value, color: scores.C.color };
        setRank(rank);
        return rank;
      }
      if (qualification >= scores.D.min && qualification <= scores.D.max) {
        const rank = { qualification, value: scores.D.value, color: scores.D.color };
        setRank(rank);
        return rank;
      }
      const rank = { qualification, value: scores.F.value, color: scores.F.color };
      setRank(rank);
      return rank;
    },
    [questions.length, qualifyAnswers]
  );

  const goNextQuestion = useCallback(
    (answer) => {
      if (isEndedGame) {
        return null;
      }

      const currentAnswers = [...answers, answer];

      setAnswer(currentAnswers);
      setQuestion(question + 1);

      // ultime question
      if (questions.length - 1 === question) {
        setIsEndGame(true);
        return finalQualification(currentAnswers);
      }

      setIsEndGame(false);
      return null;
    },
    [answers, isEndedGame, question, questions.length, finalQualification]
  );

  return [
    { questions, rank, question },
    { goNextQuestion, finalQualification }
  ];
}
