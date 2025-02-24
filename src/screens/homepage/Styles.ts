import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextStyles} from '../../constants/textstyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flexDirection: 'row',
    height: hp('26%'),
    backgroundColor: '#3D5CFF',
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: wp('4%'),
    top: hp('5%'),
  },
  header1: {
    fontFamily: TextStyles.veryextraBoldText,
    fontSize: 28,
    fontWeight: '800',
    color: Colors.secondary,
  },
  header2: {
    fontFamily: TextStyles.boldText,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.secondary,
  },
  carousalTitle: {
    fontFamily: TextStyles.boldText,
    fontWeight: 800,
    fontSize: 20,
    color: Colors.secondary,
  },
  carousalTitle1: {
    fontFamily: TextStyles.boldText,
    fontWeight: 800,
    fontSize: 20,
    color: Colors.secondary,
  },
  profilePerson: {
    top: hp('5%'),
    width: wp('14%'),
    height: hp('9%'),
    marginHorizontal: wp('4%'),
  },
  bottomHalf: {
    flex: 1,
    paddingTop: hp('10%'),
    backgroundColor: Colors.background,
  },
  card: {
    position: 'absolute',
    top: hp('17%'),
    alignSelf: 'center',
    width: wp('90%'),
    height: hp('12%'),
    backgroundColor: '#E9E9E9',

    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: wp('4%'),
    elevation: 16,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 15},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
   
  },
  cardText: {
    fontFamily:TextStyles.veryextraBoldText,
    fontSize: 12,
    fontWeight:600,
    color: '#1F1F39',
  },
  cardText1: {
    fontFamily:TextStyles.boldText,
    fontSize: 20,
    fontWeight:'bold',
    color: '#1F1F39',
  },
  progressContainer: {
    marginTop: 10,
    width: '100%',
  },
});
