import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/splash/SplashScreen";
import OnBoardingScreen from "../screens/onboarding/OnBoardingScreen";
import LoginPage from "../screens/login/LoginScreen";
import SignupPage from "../screens/signup/SignupScreen";
import ForgotPasswordPage from "../screens/forgotpassword/ForgotPasswordScreen";
import Dashboard from "../screens/dashboard/DashboardScreen";
import VerifyOTPPage from "../screens/otpscreen/OtpScreen";
import MessageScreen from "../screens/message/MessageScreen";


export type RootStackParamList = {
  SplashScreen: undefined;
  OnBoardingScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordPage: undefined;
  Dashboard: undefined;
  VerifyOTPPage: undefined;
  MessageScreen: undefined;

  
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignupScreen" component={SignupPage} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOTPPage" component={VerifyOTPPage} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
