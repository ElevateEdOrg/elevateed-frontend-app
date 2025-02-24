import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {  TextStyles } from '../constants/textstyle';
import { Colors } from '../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface RectangularButtonProps {
  title: string;
  onPress: () => void;
  style?:object
}

const RactangularButton: React.FC<RectangularButtonProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: hp('6.30%'),
    width: wp('90%'),
    borderRadius: 16,
    backgroundColor: '#3D5CFF', 
    
    paddingHorizontal: 20,
  
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    fontFamily:TextStyles.extraBoldText,
    color:Colors.secondary,
    fontSize:16
  }
 
  
});

export default RactangularButton;