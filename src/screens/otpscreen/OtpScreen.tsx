import React, { useState } from 'react';
import { View, TouchableOpacity, StatusBar, SafeAreaView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LabelComponent from '../../components/LableComponent';
import OTPTextInput from 'react-native-otp-textinput';
import TextfieldComponent from '../../components/TextfieldComponent';
import RactangularButton from '../../components/RectangularButton';
import { styles } from './Styles';
import Toast from 'react-native-toast-message';

interface VerifyOTPProps {
  navigation: NativeStackNavigationProp<any>;
}

const VerifyOTPPage = ({ navigation }: VerifyOTPProps) => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerifyAndReset = () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter OTP');
      return;
    }
    if (!newPassword.trim()) {
      Alert.alert('Error', 'Please enter the new password');
      return;
    }
    if (!confirmPassword.trim()) {
      Alert.alert('Error', 'Please enter the confirm password');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New Password and Confirm Password do not match');
      return;
    }
    
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Password set successfully',
    });
    
    setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
      <LabelComponent value='Verify OTP' style={styles.titleText} />
      <View style={styles.titleContainer}>
        <OTPTextInput
          inputCount={6}
          handleTextChange={setOtp}
          tintColor="#3D5CFF"
          textInputStyle={styles.otpInputBox}
        />
        <TextfieldComponent label='New Password' placeholder='Enter New Password' value={newPassword} onChangeText={setNewPassword} style={styles.textField} secureTextEntry={true} />
        <TextfieldComponent label='Confirm Password' placeholder='Confirm New Password' value={confirmPassword} onChangeText={setConfirmPassword} style={styles.textField} secureTextEntry={true} />
        
        <RactangularButton title={'Verify & Reset'} onPress={handleVerifyAndReset} style={styles.loginButton} />
        
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LabelComponent value='Back to Login' style={styles.footerText2} />
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default VerifyOTPPage;
