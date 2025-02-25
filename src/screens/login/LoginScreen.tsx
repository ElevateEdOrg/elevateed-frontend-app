import React, {useState} from 'react';
import {View, TouchableOpacity, StatusBar, SafeAreaView} from 'react-native';



import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './Styles';
import LabelComponent from '../../components/LableComponent';
import TextfieldComponent from '../../components/TextfieldComponent';
import RactangularButton from '../../components/RectangularButton';
import { useAppDispatch } from '../../state/hooks';
import { login } from '../../state/auth/reducer';

interface LoginPageProps {
  navigation: NativeStackNavigationProp<any>;
}

const LoginPage = ({navigation}: LoginPageProps) => {
  const dispatch = useAppDispatch();
  const [email, setEmailText] = useState<string>('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
    // const handleSignIn = async () => {
    //   let valid = true;
  
  
    //   if (valid) {
    //     const dataObj = {
    //       email: email,
    //       password: password
         
    //     };
  
    
        // setLoading(true);
  
    //     const action = login(dataObj);
    //     dispatch<any>(action)
    //       .unwrap()
    //       .then(async response => {
    //         setLoading(false);
    //         if (response) {
    //           if (response.status === 200) {
    //             Snackbar.show({
    //               text: 'login Successfull',
    //               duration: Snackbar.LENGTH_SHORT,
    //             });
    //             await AsyncStorage.setItem('userSignedIn', 'true');
    //             if (response.data.access_token) {
    //               await AsyncStorage.setItem(
    //                 'accessToken',
    //                 response.data.access_token,
    //               );
    //             }
    //             if (
    //               response.data.user &&
    //               response.data.user.name &&
    //               response.data.user.email &&
    //               response.data.user.mobile &&
    //               response.data.user.image_full_path
    //             )
            
       
    //           } else if (response.status === 204) {
    //             const requestData = JSON.parse(response.config.data);
    //             Snackbar.show({
    //               text: 'Email not verified verification OTP sent to mail',
    //               duration: Snackbar.LENGTH_SHORT,
    //             });
              
    //           } else {
    //             Snackbar.show({
    //               text: response.data.message,
    //               duration: Snackbar.LENGTH_SHORT,
    //             });
    //           }
    //         }
    //       })
    //       .catch((error: any) => {
    //         setLoading(false);
    //         console.log('Fetch login Deatils Error' + JSON.stringify(error));
    //       });
    //   }
    // };
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
