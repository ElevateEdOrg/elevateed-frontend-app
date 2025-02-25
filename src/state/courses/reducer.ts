import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { headers } from "../../utils/commonHeaders";
import { Endpoints } from '../../utils/Endpoints';
import { axiosInstance } from '../../utils/axiosInstanceCourse';

interface categoryReducerProps {
    coursesData: Object;
    loading: boolean | false;
    error: String | "";
}

const coursesInitialState: categoryReducerProps = {
    coursesData: {},
    loading: false,
    error: "",
};

export const getCourses = createAsyncThunk('courses/getcourses', async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(Endpoints.COURSES);
      console.log('RESPONSE OF GETCOURSES API:', response.data);
      return response.data;
    } catch (error: any) {
      console.error("GetCourses API Error:", error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  });
  


const coursesSlice = createSlice({
    name: 'app',
    initialState: coursesInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getCourses.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.coursesData = action.payload;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "";
            });

            
    },
});

export default coursesSlice.reducer;
