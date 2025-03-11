import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../../utils/axiosInstanceCourse";

interface QuizState {
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
  currentQuestionIndex: number;
  userAnswers: string[];
  loading: boolean;
  error: string | null;
  quizCompleted: boolean;
  scoreUpdated: boolean;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  loading: false,
  error: null,
  quizCompleted: false,
  scoreUpdated: false,
};

// Fetch Quiz Questions API
export const fetchQuizQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return rejectWithValue("No access token found");

      const response = await axiosInstance.get("courses/ai/getquiz/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Quiz response:", response.data.data);
      return response.data.data; // Returns questions array
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch questions");
    }
  }
);

// API to Update Score
export const updateQuizScore = createAsyncThunk(
  "quiz/updateScore",
  async ({ courseId, correctAnswers }: { courseId: string; correctAnswers: Number }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return rejectWithValue("No access token found");

      const response = await axiosInstance.put(
        `courses/ai/updatescore/${courseId}`,
        { correctAnswers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Score updated:", response.data);
      return response.data; // Return success message
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update score");
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    submitAnswer: (state, action) => {
      const { answer } = action.payload;
      state.userAnswers.push(answer);

      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.quizCompleted = true;
      }
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.userAnswers = [];
      state.quizCompleted = false;
      state.scoreUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateQuizScore.fulfilled, (state) => {
        state.scoreUpdated = true;
      })
      .addCase(updateQuizScore.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { submitAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
