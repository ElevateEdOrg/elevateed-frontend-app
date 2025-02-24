import React, {useState} from 'react';
import {View, TouchableOpacity, StatusBar, SafeAreaView} from 'react-native';



import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './Styles';
import LabelComponent from '../../components/LableComponent';
import TextfieldComponent from '../../components/TextfieldComponent';
import RactangularButton from '../../components/RectangularButton';

interface LoginPageProps {
  navigation: NativeStackNavigationProp<any>;
}

const LoginPage = ({navigation}: LoginPageProps) => {
  const [text, setText] = useState<string>('');
  const [password, setPassword] = useState('');
  const checkgetStart = async () => {
    // const hasSeenGetStarted = await AsyncStorage.getItem('hasSeenGetStarted');
    // if (hasSeenGetStarted) {
    //   navigation.replace('Dashboard');
    // } else {
    //   navigation.navigate('GetStartPage');
    // }
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
        <TextfieldComponent label='Your Email' placeholder={'Enter Your Email...'} value={text} onChangeText={setText} style={styles.textField}/>
        <TextfieldComponent label='Password' placeholder={'Enter Your Password...'} value={password} onChangeText={setPassword} secureTextEntry={true}/>
        <TouchableOpacity onPress={()=>navigation.navigate('ForgotPasswordPage')} style={{ width: '100%', alignItems: 'flex-end' }}>
          <LabelComponent value="Forgot password?" style={styles.forgotPasswordText} />
          </TouchableOpacity>

     <RactangularButton title={'Log in'} onPress={()=>navigation.navigate('Dashboard')} style={styles.loginButton}/>
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
