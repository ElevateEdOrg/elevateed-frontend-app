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
       paddingBottom:hp("13%")
    
  },
  header: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: hp('5%'),
  },
  headerText: {
    fontFamily: TextStyles.veryextraBoldText,
    fontSize: wp('8%'),
    fontWeight: '700',
    color: Colors.secondary,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
    marginTop: 50,
  },
  card: {
    backgroundColor: '#2E2E45',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  courseImage: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  cardContent: {
    marginTop: 10,
    flex: 1,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 5,
  },
  instructorName: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginVertical: 4,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D5CFF',
    elevation:6
  },
  removeButton: {
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#FF4D4D',
justifyContent:'center',
paddingHorizontal:wp('2%'),
    borderRadius: 8,
   height:hp('5%'),
    marginRight: 10,
    alignItems: 'center',
  },
  proceedButton: {
    backgroundColor: '#3D5CFF',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  backButton: {
    padding: 10,
    marginLeft: 10,
  },
});



