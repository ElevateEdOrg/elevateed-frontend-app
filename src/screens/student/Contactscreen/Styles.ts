import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../../../constants/colors';
import { TextStyles } from '../../../constants/textstyle';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
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
  card: {
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },

  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#777',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },

});
