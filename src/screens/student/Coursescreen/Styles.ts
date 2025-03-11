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
  header: {
    marginTop: hp('5%'),
  },
  headerText: {
    fontFamily: TextStyles.veryextraBoldText,
    fontSize: wp('8%'),
    fontWeight: '700',
    color: Colors.secondary,
  },
  row: {
    justifyContent: 'space-between', // Ensures equal spacing between cards
    paddingHorizontal: wp('3%'), // Adds padding to avoid sticking to edges
  },
  cardContainer:{
    marginBottom:hp('10%')
  },
  card: {
    width: wp('44%'), // Adjust card width to fit two columns with spacing
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center', // Center content inside card
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode:'cover'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    textAlign: 'center',
  },
  instructor: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
