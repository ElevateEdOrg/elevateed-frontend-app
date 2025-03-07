import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { headers } from "../../utils/commonHeaders";
import { Endpoints } from '../../utils/Endpoints';
import { axiosInstance } from '../../utils/axiosInstanceCourse';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface profileReducerProps {
    loading: boolean;
  error: string | null;
  success: boolean;
}

const profileInitialState: profileReducerProps = {
    loading: false,
    error: null,
    success: false,
};

export const updateProfile = createAsyncThunk(
    Endpoints.UPDATE_PROFILE,
    async ({ formData}: { formData: FormData}, { rejectWithValue }) => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);
        
        if (!accessToken) {
          throw new Error('Access Token Not Found');
        }
  
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        };
  
        const response = await axiosInstance.post('update-profile', formData, { headers });
        console.log('Update Profile Response:', response.data);
        return response.data;
      } catch (error: any) {
        console.log('Update Profile Error:', error);
        return rejectWithValue(error.response?.data || 'Failed to update profile');
      }
      }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: profileInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
          })
          .addCase(updateProfile.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
          })
          .addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });
    },
});

export default profileSlice.reducer;