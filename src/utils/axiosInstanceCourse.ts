import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';
import Config from 'react-native-config';


export const axiosInstance = axios.create({
  baseURL: `${Config.BASE_URL}`,
});

axiosInstance.interceptors.request.use(async (request: any) => {
  console.log('Request API :', JSON.stringify(request, null, 2));

  return request;
});

axiosInstance.interceptors.response.use(
  response => {
    console.log('Response API:', JSON.stringify(response, null, 2));
    return response;
  },
  error => {
    console.error('Error Response API:', JSON.stringify(error, null, 2));
    if (error.response) {
      console.error('Server Error Response:', error.response);

      if (
        error &&
        error.response &&
        error.response.status === 401 
        // !global.logoutCounter
      ) {
        // global.logoutCounter = true;
        Alert.alert(
          'Device Alert',
          'You have already logged in from another device', 
          [
            {
              text: 'OK',
              onPress: async () => {
                await AsyncStorage.clear();
                await AsyncStorage.setItem('userSignedIn', 'false');
                await AsyncStorage.setItem('onboardingCompleted', 'true');
                if (global.navigation) {
                  console.log('@@@@@@@@@ininini');
                //   global.navigation.replace(ONBOARDING_STACK.AUTHSTACK);
                //   global.navigation = null;
                //   global.logoutCounter = true;
                }
              },
            },
          ],
        );
      }

      return Promise.resolve(error.response);
    } else if (error.request) {
      console.error('No Response Received:', error.request);
    } else {
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  },
);