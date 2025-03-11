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
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
  headerText: {
    fontFamily: TextStyles.veryextraBoldText,
    fontSize: wp('5.5%'),
    fontWeight: '700',
    color: Colors.secondary,
    maxWidth: wp("100%"),
    overflow: 'hidden',
  textAlign: 'left',
  },
  addButton: {
    backgroundColor:  Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
},
addButtonText: {
    color: 'white',
    fontWeight: 'bold',
},
  courseTitle: {
    fontFamily: TextStyles.veryextraBoldText,
    fontSize: hp('2.5%'),
    fontWeight: '800',
    color: Colors.primary,
    marginTop: hp('2%'),
  },
  courseDescription: {
    fontFamily: TextStyles.regularText,
    fontSize: hp('2%'),
    color: Colors.secondary,
    marginTop: hp('4%'),
    marginVertical: hp('1%'),
  },
  instructorText: {
    fontFamily: TextStyles.boldText,
    fontSize: hp('2.2%'),
    color: '#FF6B00',
    marginBottom: hp('2%'),
  },
  sendMessageButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    paddingHorizontal:wp("5%"),
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  sendMessageButtonText: {
    color: Colors.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  instructorSectionTitle: {
    fontFamily: TextStyles.boldText,
    fontSize: hp('2.4%'),
    color: Colors.primary,
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  lectureContainer: {
    backgroundColor: Colors.card_background,
    padding: hp('2%'),
    borderRadius: hp('1.5%'),
    marginVertical: hp('1%'),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  lectureTitle: {
    fontFamily: TextStyles.boldText,
    fontSize: hp('2.2%'),
    color: Colors.secondary,
  },
  lectureDescription: {
    fontFamily: TextStyles.regularText,
    fontSize: hp('1.8%'),
    color: '#A0A0B0',
    marginTop: hp('0.5%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  navButton: {
    backgroundColor: Colors.primary,
    paddingVertical: hp('1.5%'),
    borderRadius: hp('1.2%'),
    alignItems: 'center',
    width: wp('40%'),
  },
  rateButton: {
    backgroundColor: Colors.primary,
    marginTop:hp("2%"),
    paddingVertical: hp('1.5%'),
    borderRadius: hp('1.2%'),
    alignItems: 'center',
    width: wp('40%'),
  },
  navButtonText: {
    fontFamily: TextStyles.boldText,
    fontSize: hp('2%'),
    color: Colors.secondary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
});