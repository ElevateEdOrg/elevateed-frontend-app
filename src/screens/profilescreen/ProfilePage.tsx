import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType, PermissionsAndroid, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary, ImagePickerResponse, ImageLibraryOptions, Asset } from 'react-native-image-picker';
import { styles } from './Styles';
import RactangularButton from '../../components/RectangularButton';

import LabelComponent from '../../components/LableComponent';
import { image } from '../../constants/images';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(image.PROFILEPERSON);
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to select images.',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };
  
  const handleImagePicker = async () => {
    const hasPermission = await requestStoragePermission();
    // if (!hasPermission) {
    //   Alert.alert('Permission Denied', 'Storage access is required to select an image.');
    //   return;
    // }
  
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };
  
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
        Alert.alert('Error', response.errorMessage || 'Something went wrong.');
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage: Asset = response.assets[0];
        setProfileImage({ uri: selectedImage.uri });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LabelComponent value="Account" style={styles.headerText} />
      </View>

      {/* Profile Image Section */}
      <View style={styles.profileSection}>
        <Image source={profileImage} style={styles.profileImage} />
        <TouchableOpacity style={styles.editIcon} onPress={handleImagePicker}>
          <FontAwesome name="camera" size={10} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsSection}>
     
        <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Account</Text>
          <FontAwesome name="angle-right" size={30} color="#858597" />
         
        </TouchableOpacity>
     
       
        <TouchableOpacity style={styles.settingItem}>
        
          <Text style={styles.settingText}>Notifications</Text>
          
          <FontAwesome name="angle-right" size={30} color="#858597" />
         
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
    
          <Text style={styles.settingText}>Privacy</Text>
          <FontAwesome name="angle-right" size={30} color="#858597" />
        </TouchableOpacity>
      </View>
<View style={styles.logoutContainer}>
<RactangularButton title={'Log Out'} onPress={()=>{}} style={styles.logoutButton}/>
</View>
      
      
    </SafeAreaView>
  );
};

export default ProfileScreen;
