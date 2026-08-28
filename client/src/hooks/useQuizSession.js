import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { submitAnswer, nextQuestion } from "../api/quizSession.api";

const useQuizSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

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
        const response = await nextQuestion(sessionId);

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
  }, [sessionId, navigate]);

  const handleSelectOption = (choice) => {
    if (isSubmitting) return;

    setSelectedChoice(choice);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedChoice || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const response = await submitAnswer(sessionId, selectedChoice);

      if (response.status === "completed") {
        setFeedback({
          isOpen: true,
          type: "success",
          title: "Quiz Completed!",
          message: `You've completed the quiz with a total score of ${response.score}/${response.numberOfItems}.`,
          onConfirm: () => navigate("/"),
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

      const response = await nextQuestion(sessionId);

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

  const handleCancelQuiz = () => {
    setFeedback({
      isOpen: true,
      type: "warning",
      title: "Cancel Quiz?",
      message:
        "Are you sure you want to exit? Your progress will not be saved.",
      onConfirm: () => navigate("/"),
    });
  };

  return {
    quiz,
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
