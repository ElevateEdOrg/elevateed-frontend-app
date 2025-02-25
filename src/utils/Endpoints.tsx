export const Endpoints = {
    //Auth module
    LOGIN: 'login',
    REGISTER: 'register',
    EMAILVERIFY: 'verify-email',
    FORGOT_PASSWORD: 'forgot-password',
    VERIFY_FORGOT_PASS: 'verify-forgot-password-otp',
    RESEND_OTP: 'resend-otp',
    RESET_PASSWORD: 'reset-password',
    UPDATE_TOKEN: 'update-token',
    GOOGLE_LOGIN: 'googleLogin',
    APPLE_LOGIN: 'appleLogin',
  
    //courses
    COURSES: 'courses/getcourses',
    
    //Workouts
    WOMEN_WORKOUTS: 'workouts',
    INCREASE_VIEW_COUNT: 'workout/increase-view-count',
    POPULAR_WORKOUTS: 'workout/popular-workouts',
  
    //Profile
    UPDATE_PROFILE: 'profile',
    GET_PROFILE: 'profile',
    LOGOUT: 'logout',
    DELETE_ACCOUNT: 'delete-account',
    CHANGE_PASSWORD: 'change-password',
  
    //Notification
  
    GET_NOTIFICATIONS: 'notifications',
    DELETE_NOTIFICATION: 'notifications',
    COUNT_NOTIFICATION: 'notifications/count',
  };
  