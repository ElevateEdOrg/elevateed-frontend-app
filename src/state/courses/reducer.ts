import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { headers } from "../../utils/commonHeaders";
import { Endpoints } from '../../utils/Endpoints';
import { axiosInstance } from '../../utils/axiosInstanceCourse';

interface categoryReducerProps {
    coursesData: Object;
    searchResults: Object;
    loading: boolean | false;
    error: String | "";
    searchLoading: boolean;
   
    searchError: string;
}

const coursesInitialState: categoryReducerProps = {
    coursesData: {},
    searchResults: {},
    loading: false,
    searchLoading: false,
    error: "",
    searchError: "",
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
  
  export const searchCourse = createAsyncThunk(
    'courses/searchCourse',
    async (query: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${Endpoints.SEARCH_COURSE}?search=${query}`);
            console.log('RESPONSE OF SEARCHCOURSE API:', response.data);
            return response.data;
        } catch (error: any) {
            console.error("SearchCourse API Error:", error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

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
            })

            .addCase(searchCourse.pending, (state) => {
                state.searchLoading = true;
                state.searchError = "";
            })
            .addCase(searchCourse.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchResults = action.payload.data;
            })
            .addCase(searchCourse.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.payload as string;
            });

            
    },
});

export default coursesSlice.reducer;
