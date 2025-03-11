import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextStyles } from '../../constants/textstyle';
import { Colors } from '../../constants/colors';



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.background,
  },
  card: {
    alignItems: 'center',
  },
image:{
height:hp("32.80"),
width:wp("73.25%")
},
  lableTitleText: {
    fontFamily:TextStyles.extraBoldText,
textAlign:'center',
    fontSize: 22,
    color: '#EAEAFF',
    marginBottom:hp('1.5%')
  },
  descriptionText: {
    fontFamily:TextStyles.regularText,
    fontSize: 16,
    color: '#F4F3FD',
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#858597',
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 40,
    backgroundColor: Colors.primary,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,

    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: hp("6%"),
    paddingHorizontal: 10,
  },
  pageCount: {
    fontSize: 18,
    fontFamily:TextStyles.boldText,
    color: Colors.secondary
  },
  skipText: {
    fontSize: 18,
    fontFamily:TextStyles.boldText,
    color: Colors.secondary,
  },

  buttonText: {
    fontSize: 18,
    fontFamily:TextStyles.boldText,
    color:Colors.secondary
  },
  disabledText: {
    color: Colors.background,
  },
  stepIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
