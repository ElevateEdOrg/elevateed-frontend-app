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
    alignItems:'center',
    backgroundColor:'#2F2F42',
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    paddingHorizontal:hp('3%'),
      paddingTop:hp('5%')
    
  },
  textField:{
    alignItems:'center',
    marginBottom:hp('3%')
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
  info:{
    fontSize:14,
    fontFamily:TextStyles.mediumText,
    color: '#B8B8D2',
  },
  infoContainer:{
    flexDirection:'row',
    width:'100%',
   
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
