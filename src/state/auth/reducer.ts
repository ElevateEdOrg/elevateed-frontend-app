import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {headers} from '../../utils/commonHeaders';
import {Endpoints} from '../../utils/Endpoints';
import { axiosInstance } from '../../utils/axiosInstanceCourse';


interface User {
    full_name: string;
    email: string;
     password:string
    role: string;
  }
interface authReducerProps {
    data: {
        user: User;
      };
    loading: boolean | false;
    error: String | '';
    isRegister: Boolean | false;
    message: String | '';
    tokenError: String | '';
    registerData: Object;
    emailVerifyData: Object;
    loginData: Object;
    forgotPwdData: Object;
    veifyForgotPwdData: Object;
    resendOTPData: Object;
    resetPwdData: Object;
    updateTokenData: Object;
    access_token: string;
    googleLoginData: Object;
    appleLoginData: Object;
  }
  
  const UserAuthInitialState: authReducerProps = {
    data: {user: {} as User},
    loading: false,
    error: '',
    isRegister: false,
    message: '',
    tokenError: '',
    registerData: {},
    emailVerifyData: {},
    loginData: {},
    forgotPwdData: {},
    veifyForgotPwdData: {},
    resendOTPData: {},
    resetPwdData: {},
    updateTokenData: {},
    access_token: '',
    googleLoginData: {},
    appleLoginData: {},
  };


export const register = createAsyncThunk(
    Endpoints.REGISTER,
    async (params:User) => {
      try {
        const response = await axiosInstance.post('register', params);
        console.log("jygjchgbjhgbv"+response)
        return response.data;
      } catch (err: any) {
        console.log('RegisterAPI_ERROR :: ' + err.message);
      }
    },
  );


  export const login = createAsyncThunk(Endpoints.LOGIN, async params => {
  try {
    const response = await axiosInstance.post('login', params);
    return response.data;
  } catch (err: any) {
    console.log('RegisterAPI_ERROR :: ' + err.message);
  }
});



  const authSlice = createSlice({
      name: 'app',
      initialState: UserAuthInitialState,
      reducers: {
        setAccessToken: (state, action) => {
            state.access_token = action.payload;
          },
          setUserData: (state, action) => {
            state.data.user = action.payload;
          },
         
      },
      extraReducers: (builder) => {
          builder
  
          .addCase(register.pending, state => {
            state.data.user = {} as User;
            state.loading = true;
            state.error = '';
          })
          .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.registerData = action.payload;
          })
          .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
          })

          .addCase(login.pending, state => {
            state.loading = true;
            state.error = '';
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.loginData = action.payload;
            state.access_token = action?.payload?.access_token;
            const user = action.payload.user;
            state.data.user = user;
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || '';
          })
  
              
      },
  });
  export const {setAccessToken, setUserData} = authSlice.actions;
export default authSlice.reducer;