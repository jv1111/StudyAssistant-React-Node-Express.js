import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  submitAnswer,
  nextQuestion,
  deleteQuizSession,
} from "../../api/quiz/quizSession.api";

const useQuizSession = () => {
  const { sessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const quizType = location.pathname.includes("/enumeration/")
    ? "enumeration"
    : "multiple_choice";

  const [quiz, setQuiz] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    onConfirm: null,
  });

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const response = await nextQuestion(sessionId, quizType);

        setQuiz(response);
      } catch (error) {
        setFeedback({
          isOpen: true,
          type: "error",
          title: "Unable to Load Quiz",
          message:
            error.response?.data?.message ||
            "Something went wrong while loading the quiz.",
          onConfirm: () => navigate(-1),
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadQuiz();
  }, [sessionId, quizType, navigate]);

  const handleSelectOption = (choice) => {
    if (isSubmitting) {
      return;
    }

    setSelectedChoice(choice);

    console.log("Selected choice:", choice);
    console.log("Selected choice type:", typeof choice);
  };

  const handleSubmitAnswer = async (answer = selectedChoice) => {
    console.log("Submit answer:", answer);
    console.log("Submit answer type:", typeof answer);

    if (!answer || !String(answer).trim() || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      const trimmedAnswer = String(answer).trim();

      console.log("Sending to API:", trimmedAnswer);
      console.log("Sending to API type:", typeof trimmedAnswer);

      const response = await submitAnswer(sessionId, quizType, trimmedAnswer);

      if (response.status === "completed") {
        setFeedback({
          isOpen: true,
          type: "success",
          title: "Quiz Completed!",
          message: `You've completed the quiz with a total score of ${response.score}/${response.numberOfItems}.`,
          onConfirm: () => navigate(`/quiz/records/${response.recordId}`),
        });

        return;
      }

      setFeedback({
        isOpen: true,
        type: response.correct ? "success" : "error",
        title: response.correct ? "Correct Answer" : "Incorrect Answer",
        message: response.correct
          ? "Your answer is correct!"
          : `The correct answer was: "${response.correctAnswer}".`,
        onConfirm: handleNextQuestion,
      });
    } catch (error) {
      setFeedback({
        isOpen: true,
        type: "error",
        title: "Unable to Submit Answer",
        message:
          error.response?.data?.message ||
          "Something went wrong while submitting your answer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = async () => {
    setSelectedChoice(null);

    try {
      setIsSubmitting(true);

      const response = await nextQuestion(sessionId, quizType);

      setQuiz(response);

      setFeedback((prev) => ({
        ...prev,
        isOpen: false,
        onConfirm: null,
      }));
    } catch (error) {
      setFeedback({
        isOpen: true,
        type: "error",
        title: "Unable to Load Question",
        message:
          error.response?.data?.message ||
          "Something went wrong while loading the next question.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeFeedback = () => {
    setFeedback((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handlePauseQuiz = () => {
    navigate(-1);
  };

  const handleCancelQuiz = async () => {
    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      await deleteQuizSession(sessionId, quizType);

      navigate("/");
    } catch (error) {
      setFeedback({
        isOpen: true,
        type: "error",
        title: "Unable to Cancel Quiz",
        message:
          error.response?.data?.message ||
          "Something went wrong while canceling the quiz.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    quiz,
    quizType,
    selectedChoice,
    isLoading,
    isSubmitting,
    feedback,
    handleSelectOption,
    handleSubmitAnswer,
    handleNextQuestion,
    closeFeedback,
    handlePauseQuiz,
    handleCancelQuiz,
  };
};

export default useQuizSession;
