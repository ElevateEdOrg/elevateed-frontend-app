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
       paddingVertical: hp('1%'),
       paddingHorizontal: wp('3%'),
    
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
  },
  headerText: {
    fontFamily: TextStyles.veryextraBoldText,
    fontSize: wp('8%'),
    fontWeight: '700',
    color: Colors.secondary,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noCoursesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});



