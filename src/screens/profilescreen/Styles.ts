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
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
  },
  header: {
 
    marginBottom: hp('2%'),
  },
  headerText: {
    fontFamily: TextStyles.veryextraBoldText,
    fontSize: wp('8%'),
    fontWeight: '700',
    color: Colors.secondary,
  },
  profileSection: {

    alignItems: 'center',
   marginTop:hp("3%"),
   position: 'relative',
  },
  editIcon: {
    position: 'absolute',
  
    right: 125,
    backgroundColor: '#3D5CFF',
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileImage: {
   
    width: wp('28%'),
    height: hp('14%'),
    borderRadius: wp('14%'), 
    resizeMode: 'cover',
  },
 
  name: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: Colors.secondary,
    marginTop: hp('1%'),
  },
  email: {
    fontSize: wp('4%'),
    color: Colors.secondary,
  },
  editButton: {
    marginTop: hp('1.5%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: Colors.primary,
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  settingsSection: {
    marginTop: hp('2%'),
  },
  settingItem: {
 
height:hp("5%"),
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginVertical: hp('2%'),
    paddingHorizontal:wp('3%')

  },
  settingText: {
    fontFamily:TextStyles.veryextraBoldText,
    fontSize: 16,
    color: Colors.secondary,
  },
  logoutContainer:{
    
    alignItems: 'center',

  },
  logoutButton: {
    width:"50%",
      marginVertical:hp('5%')
   
  },

});
