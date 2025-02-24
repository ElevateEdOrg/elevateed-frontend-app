import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextStyles } from '../constants/textstyle';
import { Colors } from '../constants/colors';
import LabelComponent from './LableComponent';
import { icons } from '../constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface TextfieldComponentProps extends TextInputProps {
  label:string,
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: object;
  keyboardType?: TextInputProps["keyboardType"];
}

const TextfieldComponent: React.FC<TextfieldComponentProps> = ({ 
 label,
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false, 
  keyboardType = "default",
  style 
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);  

  return (
    <View>
      <LabelComponent value={label} style={styles.label} />
      <View style={[styles.inputContainer, style]}>
        <TextInput
          style={[styles.input]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible} 
          keyboardType={keyboardType}
          placeholderTextColor={'#858597'}
        />
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={() => {
              setIsPasswordVisible((prev) => !prev);
              console.log("Toggled Visibility:", !isPasswordVisible);
            }}
          >
        <Icon
  name={isPasswordVisible ?   "eye-outline":"eye-off-outline"}
  size={24}
  color={Colors.secondary}
  style={styles.eyeIcon}
/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: '#3E3E55',
  },
  label: {
    fontFamily: TextStyles.regularText,
    fontSize: 14,
    color: '#858597',
  },
  input: {
    flex: 1,
    fontFamily: TextStyles.mediumText,
    fontSize: 13,
    color: Colors.secondary,
  },
  eyeIcon: {
    marginLeft: 10,
  },
});

export default TextfieldComponent;
