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
  },
  titleText: {
    paddingTop: hp('10%'),
    fontWeight: '800',
    fontSize: 36,
    color: Colors.secondary,
    textAlign: 'center',
  },
  titleContainer: {
    flex: 1,
    marginTop: hp('2%'),
    alignItems: 'center',
    backgroundColor: '#2F2F42',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: hp('3%'),
    paddingTop: hp('5%'),
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp('2%'),
    backgroundColor: '#3D3D5C',
    marginVertical: hp('1%'),
    borderRadius: 10,
    width: wp('90%'),
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: wp('5%'),
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
