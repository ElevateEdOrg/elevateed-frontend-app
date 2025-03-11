import React, {useState} from 'react';
import {View, TouchableOpacity, StatusBar, SafeAreaView} from 'react-native';



import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import LabelComponent from '../../components/LableComponent';
import TextfieldComponent from '../../components/TextfieldComponent';
import RactangularButton from '../../components/RectangularButton';
import { styles } from './Styles';
import Snackbar from 'react-native-snackbar';
import { useAppDispatch } from '../../state/hooks';
import { forgotPassword, login } from '../../state/auth/reducer';

interface ForgotPasswordProps {
  navigation: NativeStackNavigationProp<any>;
}

const ForgotPasswordPage = ({navigation}: ForgotPasswordProps) => {
  const dispatch = useAppDispatch();
  const [email, setEmailText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Snackbar.show({ text: 'Email is required', duration: Snackbar.LENGTH_SHORT, backgroundColor: 'red' });
      return;
    }
    if (!isValidEmail(email)) {
      Snackbar.show({ text: 'Enter a valid email', duration: Snackbar.LENGTH_SHORT, backgroundColor: 'red' });
      return;
    }

    setLoading(true);
    try {
      const response = await dispatch(forgotPassword({ email })).unwrap();
      setLoading(false);

      if (response && response.status === 'success') {
        Snackbar.show({ text: 'OTP sent successfully', duration: Snackbar.LENGTH_SHORT, backgroundColor: 'green' });
        navigation.replace('VerifyOTPScreen', { email: response.user.email });
      } else {
        Snackbar.show({ text: response.message || 'Failed to send OTP', duration: Snackbar.LENGTH_SHORT, backgroundColor: 'red' });
      }
    } catch (error) {
      setLoading(false);
      Snackbar.show({ text: 'Error occurred. Try again!', duration: Snackbar.LENGTH_SHORT, backgroundColor: 'red' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent = {true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <LabelComponent value='Forgot Password?' style={styles.titleText}/>
      <View style={styles.titleContainer}>
        <TextfieldComponent label='Your Email' placeholder={'Enter Your Email...'} value={email} onChangeText={setEmailText} style={styles.textField} keyboardType='email-address'/>
        <View style={styles.infoContainer}>
        <LabelComponent value="*" style={[styles.info, {color:Colors.primary}]}/>
        <LabelComponent value="Check your email" style={styles.info}/>
        </View>
       

     <RactangularButton  title={loading ? '' : 'Submit'}    onPress={handleForgotPassword} loading={loading}  disabled={loading} style={styles.loginButton} />
      
     
        
     <View style={styles.footer}>
      
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <LabelComponent value="Back to Login" style={styles.footerText2}/>
        </TouchableOpacity>
        
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordPage;
