import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextStyles} from '../../../constants/textstyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.background
  },
  topHalf: {
    flexDirection: 'row',
    height: hp('18%'),
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
  carousalComponent:{
    marginBottom:hp("3%")
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
    paddingTop: hp('3%'),
   
    paddingHorizontal:wp('3%'),

  },
  categoryButton: {
    backgroundColor: "#2E2E45",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 8,
    marginVertical: 10,
  },
  selectedCategory: {
    backgroundColor: "#3D5CFF",
  },
  categoryText: {
    color: "#A0A0B0",
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedCategoryText: {
    color: "#FFF",
  },
  browseCourseCard:{
    marginBottom:hp("6%")
  },

  rvContainer:{
    marginBottom:hp("3%")
  },
  rcContainer:{
    marginBottom:hp("3%"),
   
  },
});
