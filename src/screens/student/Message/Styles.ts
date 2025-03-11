import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextStyles } from '../../../constants/textstyle';
import { Colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal:wp("4%")
  },
  header: {
    marginTop: hp('5%'),
    
      marginBottom: hp('2%'),
     },
     headerText: {
        fontFamily: TextStyles.veryextraBoldText,
        fontSize: wp('8%'),
        fontWeight: '700',
        color: Colors.secondary,
      },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3D5CFF',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    maxWidth: '70%',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2E2E45',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    maxWidth: '70%',
  },
  messageText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 8,
    color: '#ccc',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  footerText: {
    textAlign: 'center',
    margin: 10,
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
   marginHorizontal:wp('4%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  input: {
    width: wp("75%"),
    height:hp('7%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    marginRight: wp('3%'),
    marginBottom:hp('2%')
  },
  sendButton: {
    width: wp('15%'),
    height:hp('7%'),
    backgroundColor: '#3D5CFF',
  
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
