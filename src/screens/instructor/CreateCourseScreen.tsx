import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import Video from 'react-native-video';
import {useAppDispatch, useAppSelector} from '../../state/hooks';
import {RootState} from '../../state/store';
import {
  createCourse,
  getCategories,
  updateCourse,
  uploadFiles,
} from '../../state/courses/reducer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextStyles} from '../../constants/textstyle';
import {Colors} from '../../constants/colors';
import Toast from 'react-native-toast-message';
import {useNavigation, useRoute} from '@react-navigation/native';
import TextfieldComponent from '../../components/TextfieldComponent';
import LabelComponent from '../../components/LableComponent';

interface FileType {
  uri: string;
  name: string;
  type: string;
}

export const CreateCourseScreen = ({route}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [welcomeMsg, setWelcomeMsg] = useState('');
  const [bannerImage, setBannerImage] = useState<FileType | null>(null);
  const [introVideo, setIntroVideo] = useState<FileType | null>(null);
  const [categories, setCategories] = useState<
    {label: string; value: string}[]
  >([]);
  const [loading, setLoading] = useState(false);

  const {loading: apiLoading} = useAppSelector(
    (state: RootState) => state.coursesReducer,
  );
  const { courseId, isUpdate} = route.params;



  useEffect(() => {
    getCategoriesAPICall();
  }, []);

  const getCategoriesAPICall = async () => {
    setLoading(true);
    dispatch(getCategories())
      .unwrap()
      .then(response => {
        setLoading(false);
        if (response) {
          const categoryOptions = response.data.map(
            (cat: {id: string; name: string}) => ({
              label: cat.name,
              value: cat.id,
            }),
          );
          setCategories(categoryOptions);
        }
      })
      .catch(() => setLoading(false));
  };

  const pickFile = async (
    setFile: React.Dispatch<React.SetStateAction<FileType | null>>,
    mediaType: 'photo' | 'video',
  ) => {
    launchImageLibrary(
      {mediaType, selectionLimit: 1},
      (response: ImagePickerResponse) => {
        if (response.assets && response.assets.length > 0) {
          const file: Asset = response.assets[0];
          setFile({
            uri: file.uri || '',
            name: file.fileName || '',
            type: file.type || '',
          });
        }
      },
    );
  };

  const handleFileUpload = async () => {
    if (!bannerImage || !introVideo)
      return Toast.show({type: 'error', text1: 'Please select files'});

    setLoading(true);
    const formData = new FormData();
    formData.append('banner_image', bannerImage);
    formData.append('intro_video', introVideo);

    dispatch(uploadFiles({formData}))
      .unwrap()
      .then(response => {
        const {banner_image, intro_video} = response.data;
        handleCourseSave(banner_image, intro_video);
      })
      .catch(() => setLoading(false));
  };

   const handleCourseSave = (
    bannerImageUrl: string,
    introVideoUrl: string,
  ) => {
    const courseData = {
      title,
      description,
      category_id: categoryId,
      price: parseFloat(price),
      welcome_msg: welcomeMsg,
      banner_image: bannerImageUrl,
      intro_video: introVideoUrl,
    };

    const action = isUpdate
      ? updateCourse({ courseId, courseData })
      : createCourse(courseData);

    dispatch(action as any)
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: `Course ${isUpdate ? 'updated' : 'created'} successfully!`,
        });
        navigation.goBack();
      })
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       <StatusBar
                    backgroundColor={'transparent'}
                    barStyle={'light-content'}
                    translucent={true}
                  />
     <View style={styles.header}>
        <LabelComponent value='Courses' style={styles.headerText}/>
      </View>

      <TextfieldComponent
        label="Title"
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        style={styles.textField}
      />
      <TextfieldComponent
        label="Description"
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.dropdownContainer}>
        <LabelComponent value="Select Category" style={styles.label} />
        <Dropdown
          data={categories}
          selectedTextStyle={styles.selectedText}
          labelField="label"
          valueField="value"
          value={categoryId}
          onChange={item => setCategoryId(item.value)}
             renderItem={item => (
                           <View style={styles.dropdownItem}>
                             <Text style={styles.dropdownItemText}>{item.label}</Text>
                           </View>
                         )}
          style={styles.dropdown}
        />
      </View>

      <TextfieldComponent
        label="Price"
        placeholder="Enter price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.textField}
      />
      <TextfieldComponent
        label="Welcome Message"
        placeholder="Enter welcome message"
        value={welcomeMsg}
        onChangeText={setWelcomeMsg}
      />

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => pickFile(setBannerImage, 'photo')}>
          <Text style={styles.buttonText}>Select Banner Image</Text>
        </TouchableOpacity>
        {bannerImage && (
          <Image source={{uri: bannerImage.uri}} style={styles.previewImage} />
        )}
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => pickFile(setIntroVideo, 'video')}>
          <Text style={styles.buttonText}>Select Intro Video</Text>
        </TouchableOpacity>
        {introVideo && (
          <Video
            source={{uri: introVideo.uri}}
            style={styles.previewVideo}
            controls
          />
        )}
      </View>

      <TouchableOpacity
        style={[styles.createButton, loading && styles.disabledButton]}
        onPress={handleFileUpload}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="Colors.primary" />
        ) : (
          <Text style={styles.createButtonText}>Create Course</Text>
        )}
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background, padding: wp('4%')},
  header: {
    marginVertical: hp('3%'),
  },
  headerText: {
    fontFamily: TextStyles.veryextraBoldText,
    fontSize: wp('8%'),
    fontWeight: '700',
    color: Colors.secondary,
  },
  input: {marginBottom: hp('2%')},
  card: {
    borderRadius: 10,
    padding: hp('2%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: hp('2%'),
    borderRadius: 8,
    alignItems: 'center',
  },
  textField:{
    marginBottom:hp("2%")
  },
  buttonText: {fontSize: 16, color: Colors.secondary, fontWeight: 'bold'},
  previewImage: {
    width: '100%',
    height: hp('25%'),
    borderRadius: 10,
    marginTop: hp('2%'),
  },
  previewVideo: {
    width: '100%',
    height: hp('25%'),
    borderRadius: 10,
    marginTop: hp('2%'),
  },
  createButton: {
    backgroundColor: Colors.primary,
    padding: hp('2%'),
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: hp('3%'),
  },
  createButtonText: {fontSize: 18, color: Colors.secondary, fontWeight: 'bold'},
  disabledButton: {backgroundColor: '#888'},
  dropdownContainer: {
    marginVertical:hp("2%"),
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
  dropdown: {
    marginLeft: wp('5%'),
    flex: 1,
    fontFamily: TextStyles.mediumText,
    fontSize: 16,
    color: Colors.secondary,
  },
  selectedText: {
    flex: 1,
    fontFamily: TextStyles.mediumText,
    fontSize: 16,
    color: Colors.secondary,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000', 
    fontFamily: TextStyles.mediumText,
  },
});

export default CreateCourseScreen;
