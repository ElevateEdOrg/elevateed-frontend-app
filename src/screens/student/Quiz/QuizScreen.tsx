import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchQuizQuestions, resetQuiz, submitAnswer, updateQuizScore } from "../../../state/quiz/reducer";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { RootState } from "../../../state/store";
import { Colors } from "../../../constants/colors";
import { TextStyles } from "../../../constants/textstyle";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { styles } from "./Styles";

const QuizScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
   const route = useRoute();
    const { courseId } = route.params as { courseId: string };

  const { questions = [], currentQuestionIndex, userAnswers, loading, quizCompleted,scoreUpdated } = useAppSelector(
    (state: RootState) => state.quizReducer
  );

  useEffect(() => {
    dispatch(fetchQuizQuestions());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />;
  }

  if (!questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No quiz questions available. Please try again later.</Text>
      </View>
    );
  }

  if (quizCompleted) {
    const correctAnswers = questions.filter((q, index) => q.answer === userAnswers[index]).length;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Quiz Completed!</Text>
        <Text style={styles.resultScore}>Score: {correctAnswers} / {questions.length}</Text>

        {!scoreUpdated ? (
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => dispatch(updateQuizScore({ courseId: courseId, correctAnswers }))}
          >
            <Text style={styles.doneButtonText}>Submit Score</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => {
              dispatch(resetQuiz());
              navigation.goBack();
            }}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => dispatch(submitAnswer({ answer: option }))}
          disabled={userAnswers.length > currentQuestionIndex}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};



export default QuizScreen;
