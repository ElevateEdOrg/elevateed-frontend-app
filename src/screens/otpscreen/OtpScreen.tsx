import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LabelComponent from '../../components/LableComponent';
import OTPTextInput from 'react-native-otp-textinput';
import TextfieldComponent from '../../components/TextfieldComponent';
import RactangularButton from '../../components/RectangularButton';
import {styles} from './Styles';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from '../../state/hooks';
import {forgotPassword, resetPassword} from '../../state/auth';
import Snackbar from 'react-native-snackbar';

interface VerifyOTPProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const VerifyOTPPage = ({navigation, route}: VerifyOTPProps) => {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const email = route.params?.email || '';

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTime => {
          if (prevTime === 1) {
            clearInterval(interval as NodeJS.Timeout);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const showSnackbar = (message: string, color: string = 'red') => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: color,
    });
  };

  const resendOTP = async () => {
    if (timer > 0) return; 

    setTimer(120); 
    try {
      const response = await dispatch(forgotPassword({ email })).unwrap();
      if (response && response.status === 'success') {
        console.log("User successfully");
        
        showSnackbar('OTP sent successfully', 'green');
      } else {
        showSnackbar(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      showSnackbar('Error occurred. Try again!');
    }
  };

   const isValidOTP = (otp: string) => /^\d{6}$/.test(otp);

   const isValidPassword = (password: string) =>
     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
 
 
 
   const handleVerifyAndReset = async () => {
     if (!otp.trim()) {
       showSnackbar('Please enter OTP');
       return;
     }
     if (!isValidOTP(otp)) {
       showSnackbar('Invalid OTP. Must be a 6-digit number.');
       return;
     }
     if (!newPassword.trim()) {
       showSnackbar('Please enter the new password');
       return;
     }
     if (!isValidPassword(newPassword)) {
       showSnackbar('Password must be at least 6 characters long and include a number & special character.');
       return;
     }
     if (!confirmPassword.trim()) {
       showSnackbar('Please confirm your new password');
       return;
     }
     if (newPassword !== confirmPassword) {
       showSnackbar('New Password and Confirm Password do not match');
       return;
     }
 
     setLoading(true);
     try {
       const response = await dispatch(
         resetPassword({ email, otp, new_password: newPassword })
       ).unwrap();
 
       setLoading(false);
 
       if (response && response.status === 'success') {
         showSnackbar('Password reset successfully!', 'green');
         navigation.replace('LoginScreen');
       } else {
         showSnackbar('Invalid OTP');
       }
     } catch (error) {
       setLoading(false);
       showSnackbar('Error occurred. Try again!');
     }
   };

 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <LabelComponent value="Verify OTP" style={styles.titleText} />
      <View style={styles.titleContainer}>
        <OTPTextInput
          inputCount={6}
          handleTextChange={setOtp}
          tintColor="#3D5CFF"
          textInputStyle={styles.otpInputBox}
        />
            <TouchableOpacity onPress={resendOTP} style={{ width: '100%', alignItems: 'flex-end' }}>
          <LabelComponent 
            value={timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'} 
            style={[styles.forgotPasswordText, { color: timer > 0 ? 'gray' : '#3D5CFF' }]} 
          />
        </TouchableOpacity>
        <TextfieldComponent
          label="New Password"
          placeholder="Enter New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.textField}
          secureTextEntry={true}
        />
        <TextfieldComponent
          label="Confirm Password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.textField}
          secureTextEntry={true}
        />

<RactangularButton
          title={loading ? 'Processing...' : 'Verify & Reset'}
          onPress={handleVerifyAndReset}
          style={styles.loginButton}
          disabled={loading}
        />

        {loading && <ActivityIndicator size="large" color="#3D5CFF" style={{ marginTop: 10 }} />}


      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default VerifyOTPPage;
