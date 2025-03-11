import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import {styles} from './Styles';
import RactangularButton from '../../../components/RectangularButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LabelComponent from '../../../components/LableComponent';
import {image} from '../../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextfieldComponent from '../../../components/TextfieldComponent';
import {updateProfile} from '../../../state/profile/reducer';
import Snackbar from 'react-native-snackbar';
import Toast from 'react-native-toast-message';
import { useAppDispatch } from '../../../state/hooks';


interface ProfilePageProps {
  navigation: NativeStackNavigationProp<any>;
}

const ProfileScreen = ({navigation}: ProfilePageProps) => {
  // const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(
    image.PROFILEPERSON,
  );
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setFullName(parsedUser.full_name || 'User');
          setEmail(parsedUser.email || '');
          setRole(parsedUser.role || '');
          setProfileImage(
            parsedUser.avatar ? {uri: parsedUser.avatar} : image.PROFILEPERSON,
          );
          console.log('User Data:', parsedUser.avatar);
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.setItem('userSignedIn', 'false');

      console.log('User logged out successfully');

      // Navigate to Login Screen
      navigation.replace('LoginScreen');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to select images.',
            buttonPositive: 'OK',
          },
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

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage: Asset = response.assets[0];

        if (selectedImage.fileSize && selectedImage.fileSize > 5 * 1024 * 1024) {
          Snackbar.show({
            text: 'Upload Image Less than 5MB',
            duration: Snackbar.LENGTH_SHORT,
          });
          return;
        }

        const allowedFormats = ['image/jpeg', 'image/png', 'image/svg+xml'];
        if (!allowedFormats.includes(selectedImage.type ?? '')) {
          Snackbar.show({
            text: 'Only JPG, PNG, and SVG files are allowed',
            duration: Snackbar.LENGTH_SHORT,
          });
          return;
        }

        setProfileImage({uri: selectedImage.uri ?? ''});
        setImageUri(selectedImage.uri ?? null);
      }
    });
  };

  const handleEditProfile = async () => {
    setLoading(true); 
    const formData = new FormData();
    formData.append('email', email);
    formData.append('full_name', fullName);

    if (imageUri) {
      formData.append('avatar', {
        uri: imageUri,
        name: 'profile.jpg',
        type: 'image/jpeg',
      } as any);
    }

    const result = await dispatch(updateProfile({formData}));
    if (updateProfile.fulfilled.match(result)) {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {

        const user = JSON.parse(storedUser);    
        user.full_name = fullName;
        user.avatar = imageUri;
        await AsyncStorage.setItem('user', JSON.stringify(user));
  
        console.log('User Name Updated Successfully');
      } else {
        console.log('No user found');
      }
      // Snackbar.show({
      //   text: 'Profile Updated Successfully',
      //   duration: Snackbar.LENGTH_SHORT,
      // });
      Toast.show({
        type: 'success',
        text1: 'Profile Updated Successfully',
        visibilityTime: 3000,
        position: 'top',
      });
    } else {
      Snackbar.show({
        text: 'Failed to Update Profile',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    setLoading(false); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LabelComponent value="Account" style={styles.headerText} />
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="log-out-outline" size={26} color="#fff" />
        </TouchableOpacity>
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
        <TextfieldComponent
          label={'Full Name'}
          placeholder={''}
          value={fullName}
          onChangeText={setFullName}
          style={styles.textField}
        />
        <TextfieldComponent
          label={'Email'}
          placeholder={''}
          value={email}
          editable={false}
          onChangeText={() => {}}
          style={styles.textField}
        />
        <TextfieldComponent
          label={'Role'}
          placeholder={''}
          value={role}
          editable={false}
          onChangeText={() => {}}
        />
      </View>

      <View style={styles.logoutContainer}>
        <RactangularButton
          title={'Edit Profile'}
          onPress={handleEditProfile}
          style={styles.logoutButton}
          loading={loading}
          disabled={loading}
        />
      </View>
 
      <Toast />
    </SafeAreaView>


  );
};

export default ProfileScreen;
