import React, {useState} from 'react';
import {View, TouchableOpacity, StatusBar, SafeAreaView} from 'react-native';



import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import LabelComponent from '../../components/LableComponent';
import TextfieldComponent from '../../components/TextfieldComponent';
import RactangularButton from '../../components/RectangularButton';
import { styles } from './Styles';

interface SignupPageProps {
  navigation: NativeStackNavigationProp<any>;
}

const SignupPage = ({navigation}: SignupPageProps) => {
  const [text, setText] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
      <LabelComponent value='Sign Up' style={styles.titleText}/>
      <View style={styles.titleContainer}>
        <View style={styles.fullName}>
        <TextfieldComponent label='First Name' placeholder={'First Name'} value={firstname} onChangeText={setFirstname} style={styles.firstName}/>
        <TextfieldComponent label='Last Name' placeholder={'Last Name'} value={lastname} onChangeText={setLastname} style={styles.firstName}/>
        </View>
        <TextfieldComponent label='Your Email' placeholder={'Enter Your Email...'} value={text} onChangeText={setText} style={styles.textField}/>
        <TextfieldComponent label='Password' placeholder={'Enter Your Password...'} value={password} onChangeText={setPassword} secureTextEntry={true}/>
        
          <TouchableOpacity onPress={()=>navigation.navigate('ForgotPasswordPage')} style={{ width: '100%', alignItems: 'flex-end' }}>
          <LabelComponent value="Forgot password?" style={styles.forgotPasswordText} />
          </TouchableOpacity>
  


     <RactangularButton title={'Create account'} onPress={()=>{}} style={styles.loginButton}/>
        <View style={styles.footer}>
        <LabelComponent value="Already have an account?   " style={styles.footerText1}/>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <LabelComponent value="Log In" style={styles.footerText2}/>
        </TouchableOpacity>
        
        </View>
     
      </View>
    </SafeAreaView>
  );
};

export default SignupPage;
