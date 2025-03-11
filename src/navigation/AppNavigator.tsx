import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/splash/SplashScreen";
import OnBoardingScreen from "../screens/onboarding/OnBoardingScreen";
import LoginPage from "../screens/login/LoginScreen";
import SignupPage from "../screens/signup/SignupScreen";
import ForgotPasswordPage from "../screens/forgotpassword/ForgotPasswordScreen";
import SearchScreen from "../screens/student/Searchscreen/SearchScreen";
import VerifyOTPPage from "../screens/otpscreen/OtpScreen";
// import MessageScreen from "../screens/student/message/MessageScreen";

import Dashboard from "../screens/student/Dashboard/DashboardScreen";
import InstructorDashboard from "../screens/instructor/Dashboard/Dashboard";




export type RootStackParamList = {
  SplashScreen: undefined;
  OnBoardingScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordPage: undefined;
  Dashboard: undefined;
  VerifyOTPScreen: { email: string };
  ProfileScreen: undefined;
  SearchScreen: undefined;
  InstructorDashboardScreen: undefined;

  
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
        <Stack.Screen name="VerifyOTPScreen" component={VerifyOTPPage} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="InstructorDashboardScreen" component={InstructorDashboard} options={{ headerShown: false }} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
