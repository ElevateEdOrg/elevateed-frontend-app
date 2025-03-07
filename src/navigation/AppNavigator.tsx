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
import UserCourseScreen from "../screens/student/UserCourse/UserCourseScreen";
import CourseContentScreen from "../screens/student/CourseContent/CourseContentScreen";
import CreateCourseScreen from "../screens/instructor/CreateCourseScreen";
import PickPDFScreen from "../screens/instructor/CreateContentScreen";
import CreateCourseContentScreen from "../screens/instructor/CreateContentScreen";
import QuizScreen from "../screens/student/Quiz/QuizScreen";
import CourseDetailScreen from "../screens/student/CourseDetail/CourseDetailScreen";
import MessageScreen from "../screens/student/Message/MessageScreen";
import Contact from "../screens/student/Contactscreen/Contact";




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
  UserCourseScreen: undefined;
  CourseContentScreen: undefined;
  CreateCourseScreen: undefined;
  CreateCourseContentScreen: undefined;
  QuizScreen: undefined;
  CourseDetailScreen: undefined;
  MessageScreen: undefined;
  Contact: undefined;

  
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
        <Stack.Screen name="UserCourseScreen" component={UserCourseScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CourseContentScreen" component={CourseContentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateCourseScreen" component={CreateCourseScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateCourseContentScreen" component={CreateCourseContentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
