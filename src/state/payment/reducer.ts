import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {headers} from '../../utils/commonHeaders';
import {Endpoints} from '../../utils/Endpoints';
import { axiosInstance } from '../../utils/axiosInstanceCourse';
import { RootState } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface paymentReducerProps {
 
    loading: boolean | false;
    error: String | '';
    paymentData: Object | null;
   
  }
  
  const UserAuthInitialState: paymentReducerProps = {
  
    loading: false,
    error: '',
    paymentData:{}
  
  };
  export const makePayment = createAsyncThunk(
    Endpoints.MAKE_PAYMENT,
    async (params: { courseIds: any }, { getState }) => {
      try {
   
    
        const token = await AsyncStorage.getItem('accessToken');

  
        const response = await axiosInstance.post(
          'courses/payment/makepayement',
          params,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log('Response Data:', response.data);
        return response.data;
      } catch (err: any) {
        console.log('Payment API Error:', err.message);
        throw err;
      }
    }
  );





  const paymentSlice = createSlice({
      name: 'app',
      initialState: UserAuthInitialState,
      reducers: {},
      extraReducers: (builder) => {
          builder
          .addCase(makePayment.pending, state => {
            state.loading = true;
            state.error = '';
          })
          .addCase(makePayment.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentData = action.payload;
          })
          .addCase(makePayment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
          });
         
  
              
      },
  });

export default paymentSlice.reducer;