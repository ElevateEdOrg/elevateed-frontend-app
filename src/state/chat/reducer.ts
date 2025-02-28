import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {headers} from '../../utils/commonHeaders';
import {Endpoints} from '../../utils/Endpoints';
import {axiosInstance} from '../../utils/axiosInstanceCourse';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Chat {
  chat_id: string;
  user1_id: string;
  user1_name: string;
  user1_avatar: string | null;
  user2_id: string;
  user2_name: string;
  last_message: string;
  last_message_time: string | number | Date;
  has_unread_messages: boolean;
  created_at: string;
}
export interface ChatHistory {
  message_id: string;
  sender_name: string;
  sender_id: string;
  message: string;
  sent_at: string | number | Date;
  status: string;
}
interface chatReducerProps {
  chatList: Chat[];
  chatHistory: ChatHistory[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const chatInitialState: chatReducerProps = {
  chatList: [],
  chatHistory: [],
  loading: false,
  error: null,
  success: false,
};

export const getChatList = createAsyncThunk(
  Endpoints.CHAT_LIST,
  async (userId: string, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${Endpoints.CHAT_LIST}/${userId}`,
      );
      console.log('RESPONSE OF get contact list API:', userId);
      return response.data;
    } catch (error: any) {
      console.error('GetChatList API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getChatHistory = createAsyncThunk(
  Endpoints.CHAT_HISTORY,
  async (chatId: string, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${Endpoints.CHAT_HISTORY}/${chatId}`,
      );
      console.log('RESPONSE OF GET Chat History API:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('GetChatHistory API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getChatList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        state.loading = false;
        state.chatList = action.payload;
      })
      .addCase(getChatList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getChatHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.chatHistory = action.payload;
      })
      .addCase(getChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chatSlice.reducer;