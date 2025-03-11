import {StyleSheet} from 'react-native';

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
  titleText:{
    paddingTop:hp('15%'),
fontWeight:800,
fontSize:36,
color:Colors.secondary
  },
  titleContainer:{
    flex:1,
    marginTop:hp('2%'),
   
    backgroundColor:'#2F2F42',
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    paddingHorizontal:hp('3%'),
      paddingTop:hp('3%')
    
  },
  fullName:{
    flexDirection:'row'
  },
  firstName:{
    marginHorizontal:wp('2%'),
    width:wp('41.5%'),
    marginBottom:hp('3%')
   
  },
  textField:{
    alignItems:'center',
    marginBottom:hp('3%'),
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: '#3E3E55',
  },
  label: {
    fontFamily: TextStyles.regularText,
    fontSize: 14,
    color: '#858597',
  },
  dropdown: {
    marginLeft:wp('35%'),
    flex: 1,
    fontFamily: TextStyles.mediumText,
    fontSize: 16,
    color: Colors.secondary,
  },
  selectedText:{
    flex: 1,
    fontFamily: TextStyles.mediumText,
    fontSize: 16,
    color: '#FFFFFF',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000', 
    fontFamily: TextStyles.mediumText,
  },
  forgotPasswordText:{
    fontFamily:TextStyles.mediumText,
    fontSize:14,
    color:'#B8B8D2',
    textAlign:'right'
  },
  loginButton:{
    marginVertical:hp('5%')
  },
  footer:{
    flexDirection:'row',
  },
  footerText1:{
    fontFamily:TextStyles.mediumText,
    fontSize:14,
    color:'#B8B8D2',
  },
  footerText2:{
    fontFamily:TextStyles.mediumText,
    fontSize:14,
    color:'#3D5CFF',
    textDecorationLine: 'underline'
  }
});
