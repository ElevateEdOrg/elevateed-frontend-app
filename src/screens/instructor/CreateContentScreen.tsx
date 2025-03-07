import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Video from 'react-native-video';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch } from '../../state/hooks';
import { createLecture, uploadLectureFile } from '../../state/courses/reducer';
import TextfieldComponent from '../../components/TextfieldComponent';
import LabelComponent from '../../components/LableComponent';
import Toast from 'react-native-toast-message';
import { Colors } from '../../constants/colors';
import { TextStyles } from '../../constants/textstyle';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface FileType {
  uri: string;
  name: string;
  type: string;
}

const CreateCourseContentScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<FileType | null>(null);
  const [pdfFile, setPdfFile] = useState<FileType | null>(null);

  const pickVideo = async () => {
    launchImageLibrary({ mediaType: 'video' }, (response: ImagePickerResponse) => {
      if (response.assets && response.assets.length > 0) {
        const file: Asset = response.assets[0];
        setVideoFile({ uri: file.uri || '', name: file.fileName || '', type: file.type || '' });
      }
    });
  };

  const pickPDF = async () => {
    try {
      const result = await DocumentPicker.pickSingle({ type: DocumentPicker.types.pdf });
      setPdfFile({ uri: result.uri, name: result.name || '', type: result.type || 'application/pdf' });
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', 'Failed to pick PDF file');
      }
    }
  };

  const handleUploadAndCreateLecture = async () => {
    if (!videoFile || !pdfFile) {
      return Alert.alert('Error', 'Please select both video and PDF files');
    }

    const formData = new FormData();
    formData.append('video_path', videoFile);
    formData.append('pdf_path', pdfFile);

    try {
      const uploadResponse = await dispatch(uploadLectureFile(formData)).unwrap();
      const lectureData = {
        title,
        description,
        video_path: uploadResponse.data.video_path,
        pdf_path: uploadResponse.data.pdf_path,
      };

      await dispatch(createLecture(lectureData)).unwrap();
      Toast.show({ type: 'success', text1: 'Lecture created successfully!' });
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create lecture');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       <StatusBar
              backgroundColor={'transparent'}
              barStyle={'light-content'}
              translucent={true}
            />
      <View style={styles.header}>
        <LabelComponent value="Create Lecture" style={styles.headerText} />
      </View>

      <TextfieldComponent label="Lecture Title" placeholder="Enter title" value={title} onChangeText={setTitle} style={{marginBottom:hp('2%')}}/>
      <TextfieldComponent label="Description" placeholder="Enter description" value={description} onChangeText={setDescription} multiline />

      <TouchableOpacity style={styles.button} onPress={pickVideo}>
        <Text style={styles.buttonText}>{videoFile ? 'Video Selected' : 'Select Video'}</Text>
      </TouchableOpacity>
      {videoFile && <Video source={{ uri: videoFile.uri }} style={styles.previewVideo} controls resizeMode="contain" />}

      <TouchableOpacity style={styles.button} onPress={pickPDF}>
        <Text style={styles.buttonText}>{pdfFile ? pdfFile.name : 'Select PDF'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createButton} onPress={handleUploadAndCreateLecture}>
        <Text style={styles.createButtonText}>Create Lecture</Text>
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: wp('4%') },
  header: { marginVertical: hp('3%') ,marginBottom:hp('5%')},
  headerText: { fontFamily: TextStyles.veryextraBoldText, fontSize: wp('8%'), fontWeight: '700', color: Colors.secondary },
  button: { backgroundColor: Colors.primary, padding: hp('2%'), borderRadius: 8, alignItems: 'center', marginVertical: hp('2%'), },
  buttonText: { fontSize: 16, color: '#FFFFFF', fontFamily: TextStyles.mediumText },
  previewVideo: { width: '100%', height: hp('25%'), borderRadius: 10, marginTop: hp('2%') },
  createButton: { backgroundColor: Colors.primary, padding: hp('2%'), borderRadius: 30, alignItems: 'center', marginVertical: hp('3%') },
  createButtonText: { fontSize: 18, color: '#FFFFFF', fontWeight: 'bold' },
});

export default CreateCourseContentScreen;