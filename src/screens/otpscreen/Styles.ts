import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextStyles } from '../../constants/textstyle';
import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleText: {
    paddingTop: hp('15%'),
    fontWeight: '800',
    fontSize: 36,
    color: Colors.secondary,
  
  },
  titleContainer: {
    flex: 1,
    marginTop: hp('2%'),
    alignItems: 'center',
    backgroundColor: '#2F2F42',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: hp('3%'),
    paddingTop: hp('5%'),
  },
  textField: {
    width: '100%',
    marginBottom: hp('3%'),
  },
  otpInputBox: {
    width: wp('12%'),
    height: hp('7%'),
    marginBottom: hp('3%'),
    backgroundColor: '#3E3E55',
    fontSize: 20,
    color: Colors.secondary,
    textAlign: 'center',
    borderRadius: 8,
    marginHorizontal: wp('1%'),
  },
  forgotPasswordText:{
    fontFamily:TextStyles.mediumText,
    fontSize:14,
    color:'#3E3E55',
    textAlign:'right'
  },
  loginButton: {
    marginVertical: hp('5%'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText2: {
    fontFamily: TextStyles.mediumText,
    fontSize: 14,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});
