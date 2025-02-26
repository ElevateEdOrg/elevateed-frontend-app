import React, {useState} from 'react';
import {View, TouchableOpacity, StatusBar, SafeAreaView, Text, Alert, ScrollView} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Snackbar from 'react-native-snackbar';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import LabelComponent from '../../components/LableComponent';
import TextfieldComponent from '../../components/TextfieldComponent';
import RactangularButton from '../../components/RectangularButton';
import { styles } from './Styles';
import { useAppDispatch } from '../../state/hooks';
import { register } from '../../state/auth/reducer';

interface SignupPageProps {
  navigation: NativeStackNavigationProp<any>;
}

const SignupPage = ({navigation}: SignupPageProps) => {
    const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<string>('student'); 
  const [loading, setLoading] = useState(false);


  const roleData = [
    { label: 'Student', value: 'student' },
    { label: 'Instructor', value: 'instructor' },
  ];
 
  const validateInputs = () => {
    if (!firstname.trim()) {
      Snackbar.show({ text: 'First name is required', duration: Snackbar.LENGTH_SHORT, backgroundColor: 'red' });
      return false;
    }
    if (!lastname.trim()) {
      Snackbar.show({ text: 'Last name is required', duration: Snackbar.LENGTH_SHORT, backgroundColor: 'red' });
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Snackbar.show({ text: 'Enter a valid email', duration: Snackbar.LENGTH_SHORT, backgroundColor: 'red' });
      return false;
    }
    if (password.length < 6) {
      Snackbar.show({ text: 'Password must be at least 6 characters', duration: Snackbar.LENGTH_SHORT, backgroundColor: 'red' });
      return false;
    }
    if (password !== confirmPassword) {
      Snackbar.show({ text: 'Passwords do not match', duration: Snackbar.LENGTH_SHORT, backgroundColor: 'red' });
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    const full_name = `${firstname} ${lastname}`;
    const dataObj = { full_name, email, password, role };

    setLoading(true);
    dispatch(register(dataObj))
      .unwrap()
      .then((response) => {
        setLoading(false);
        if (response.status) {
          Snackbar.show({ text: response.message, duration: Snackbar.LENGTH_LONG, backgroundColor: 'green' });
          navigation.navigate('LoginScreen');
        } else {
          Snackbar.show({ text: response.message, duration: Snackbar.LENGTH_LONG, backgroundColor: 'blue' });
        }
      })
      .catch((error) => {
        setLoading(false);
        Snackbar.show({ text: error.message, duration: Snackbar.LENGTH_SHORT, backgroundColor: 'red' });
      });
  };
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
      <ScrollView style={styles.titleContainer}>
        <View style={styles.fullName}>
        <TextfieldComponent label='First Name' placeholder={'First Name'} value={firstname} onChangeText={setFirstname} style={styles.firstName}/>
        <TextfieldComponent label='Last Name' placeholder={'Last Name'} value={lastname} onChangeText={setLastname} style={styles.firstName}/>
        </View>
        <TextfieldComponent label='Your Email' placeholder={'Enter Your Email...'} value={email} onChangeText={setEmail} style={styles.textField} keyboardType='email-address'/>
        <TextfieldComponent label='Password' placeholder={'Enter Your Password...'} value={password} onChangeText={setPassword} secureTextEntry={true}  style={styles.textField} />
        <TextfieldComponent label='Confirm Password' placeholder={'Confirm Your Password...'} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true}  style={styles.textField}/>
        <View style={styles.dropdownContainer}>
          <LabelComponent value="Select Role" style={styles.label} />
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={styles.selectedText}
            data={roleData}
            labelField="label"
            valueField="value"
            placeholder="Select Role"
            value={role}
            onChange={item => setRole(item.value)}
            renderItem={item => (
              <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </View>
            )}
          />
        </View>

         
  


     <RactangularButton title={'Create account'} onPress={handleSignUp} style={styles.loginButton}/>
        <View style={styles.footer}>
        <LabelComponent value="Already have an account?   " style={styles.footerText1}/>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <LabelComponent value="Log In" style={styles.footerText2}/>
        </TouchableOpacity>
        
        </View>
     
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupPage;
