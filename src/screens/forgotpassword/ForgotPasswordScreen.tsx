import React, {useState} from 'react';
import {View, TouchableOpacity, StatusBar, SafeAreaView} from 'react-native';



import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import LabelComponent from '../../components/LableComponent';
import TextfieldComponent from '../../components/TextfieldComponent';
import RactangularButton from '../../components/RectangularButton';
import { styles } from './Styles';

interface ForgotPasswordProps {
  navigation: NativeStackNavigationProp<any>;
}

const ForgotPasswordPage = ({navigation}: ForgotPasswordProps) => {
  const [text, setText] = useState<string>('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent = {true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <LabelComponent value='Forgot Password?' style={styles.titleText}/>
      <View style={styles.titleContainer}>
        <TextfieldComponent label='Your Email' placeholder={'Enter Your Email...'} value={text} onChangeText={setText} style={styles.textField}/>
        <View style={styles.infoContainer}>
        <LabelComponent value="*" style={[styles.info, {color:'#3D5CFF'}]}/>
        <LabelComponent value="Check your email" style={styles.info}/>
        </View>
       

     <RactangularButton title={'Submit'} onPress={()=>navigation.navigate('VerifyOTPPage')} style={styles.loginButton}/>
        
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
