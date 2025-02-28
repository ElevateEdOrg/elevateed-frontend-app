import React, {useState} from 'react';
import {View, TouchableOpacity, StatusBar, SafeAreaView} from 'react-native';

import Snackbar from 'react-native-snackbar';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './Styles';
import LabelComponent from '../../components/LableComponent';
import TextfieldComponent from '../../components/TextfieldComponent';
import RactangularButton from '../../components/RectangularButton';
import { useAppDispatch } from '../../state/hooks';
import { login } from '../../state/auth/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginPageProps {
  navigation: NativeStackNavigationProp<any>;
}

const LoginPage = ({navigation}: LoginPageProps) => {
  const dispatch = useAppDispatch();
  const [email, setEmailText] = useState<string>('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle Login with validation
  const handleSignIn = async () => {
    // Check if fields are empty
    // if (!email.trim()) {
    //   Snackbar.show({ text: 'Email is required', duration: Snackbar.LENGTH_SHORT });
    //   return;
    // }
    // if (!isValidEmail(email)) {
    //   Snackbar.show({ text: 'Enter a valid email', duration: Snackbar.LENGTH_SHORT });
    //   return;
    // }
    // if (!password.trim()) {
    //   Snackbar.show({ text: 'Password is required', duration: Snackbar.LENGTH_SHORT });
    //   return;
    // }
    // if (password.length < 6) {
    //   Snackbar.show({ text: 'Password must be at least 6 characters', duration: Snackbar.LENGTH_SHORT });
    //   return;
    // }

 
    // const dataObj = { email, password };

    // setLoading(true);

    // try {
    //   const response = await dispatch<any>(login(dataObj)).unwrap();
    //   setLoading(false);

    //   if (response && response.status === 'success') {
    //     Snackbar.show({ text: 'Login Successful', duration: Snackbar.LENGTH_SHORT });
    //     await AsyncStorage.setItem('userSignedIn', 'true');

    //     if (response.access_token) {
    //       await AsyncStorage.setItem('accessToken', response.access_token);
    //     }
    //     if(response.user){
    //       await AsyncStorage.setItem('user', JSON.stringify(response.user));
    //     }
        
    //     navigation.replace('Dashboard');
    //   } else if (response.status === 'error') {
    //     Snackbar.show({ text: 'Email not verified. OTP sent to mail.', duration: Snackbar.LENGTH_SHORT });
    //   } else {
    //     Snackbar.show({ text: response.message || 'Login failed', duration: Snackbar.LENGTH_SHORT });
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   Snackbar.show({ text: 'Error logging in. Try again!', duration: Snackbar.LENGTH_SHORT });
    //   console.error('Login Error:', error);
    // }
            navigation.replace('Dashboard');

  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent = {true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <LabelComponent value='Log In' style={styles.titleText}/>
      <View style={styles.titleContainer}>
        <TextfieldComponent label='Your Email' placeholder={'Enter Your Email...'} value={email} onChangeText={setEmailText} style={styles.textField}/>
        <TextfieldComponent label='Password' placeholder={'Enter Your Password...'} value={password} onChangeText={setPassword} secureTextEntry={true}/>
        <TouchableOpacity onPress={()=>navigation.navigate('ForgotPasswordPage')} style={{ width: '100%', alignItems: 'flex-end' }}>
          <LabelComponent value="Forgot password?" style={styles.forgotPasswordText} />
          </TouchableOpacity>

     <RactangularButton title={'Log in'} onPress={handleSignIn} style={styles.loginButton} loading={loading} disabled={loading}/>
        <View style={styles.footer}>
        <LabelComponent value="Don't have an account?" style={styles.footerText1}/>
        <TouchableOpacity onPress={()=>navigation.navigate('SignupScreen')}>
        <LabelComponent value="Sign Up" style={styles.footerText2}/>
        </TouchableOpacity>
        
        </View>
     
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
