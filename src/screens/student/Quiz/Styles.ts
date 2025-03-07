import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextStyles } from '../../../constants/textstyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    justifyContent: 'center',
  },
  questionText: {
    fontFamily: TextStyles.veryextraBoldText,
    fontSize: hp('2.5%'),
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: hp('2%'),
  },
  optionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: hp('2%'),
    borderRadius: hp('1%'),
    marginVertical: hp('1%'),
    alignItems: 'center',
  },
  optionText: {
    fontFamily: TextStyles.boldText,
    fontSize: hp('2%'),
    color: '#FFF',
  },
  resultContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  resultTitle: {
    fontFamily: TextStyles.veryextraBoldText,
    fontSize: hp('3%'),
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: hp('2%'),
  },
  resultText:{
    fontFamily: TextStyles.boldText,
    fontSize: hp('4%'),
    color: Colors.secondary,
    marginBottom: hp('3%'),
  },
  resultScore: {
    fontFamily: TextStyles.boldText,
    fontSize: hp('2.5%'),
    color: Colors.secondary,
    marginBottom: hp('3%'),
  },
  doneButton: {
    backgroundColor: Colors.primary,
    paddingVertical: hp('1.8%'),
    borderRadius: hp('1.2%'),
    width: wp('40%'),
    alignItems: 'center',
  },
  doneButtonText: {
    fontFamily: TextStyles.boldText,
    fontSize: hp('2%'),
    color: '#FFF',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: TextStyles.regularText,
    fontSize: wp('4%'),
    color: 'red',
    textAlign: 'center',
    marginVertical: hp('2%'),
  },
});
