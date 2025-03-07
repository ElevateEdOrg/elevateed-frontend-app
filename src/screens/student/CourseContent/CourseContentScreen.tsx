import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import {RootState} from '../../../state/store';
import {
  deleteCourseContent,
  getCourseContent,
  updateCourseRating,
  updateLectureStatus,
} from '../../../state/courses/reducer';
import {useAppDispatch, useAppSelector} from '../../../state/hooks';
import LabelComponent from '../../../components/LableComponent';
import {styles} from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../../constants/colors';
import { TextStyles } from '../../../constants/textstyle';
import {Rating} from 'react-native-ratings';
import Toast from 'react-native-toast-message';

interface LoginPageProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}
const CourseContentScreen = ({navigation, route}: LoginPageProps) => {
  const {courseId} = route.params;
  const dispatch = useAppDispatch();
  const {courseContent} = useAppSelector(
    (state: RootState) => state.coursesReducer,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [isRatingModalVisible, setRatingModalVisible] = useState(false);
    const [rating, setRating] = useState(0);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserId(parsedUser.id);
          setUserRole(parsedUser.role);
          console.log('user iddddddd: ', parsedUser.id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    // dispatch(getCourseContent(courseId));

    return () => {
      dispatch({type: 'courses/clearCourseContent'});
    };
  }, [courseId]);
  useFocusEffect(
    useCallback(() => {
      dispatch(getCourseContent(courseId));

      return () => {
        dispatch({type: 'courses/clearCourseContent'});
      };
    }, [dispatch, courseId]),
  );

  if (!courseContent) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const lectures = courseContent?.data.course.Lectures || [];
  const currentLecture = lectures[currentIndex];

  const handleNextLecture = () => {
    if (currentLecture && userRole === 'student') {
      console.log('Updating lecture status:', currentLecture.id);

      dispatch(updateLectureStatus(currentLecture.id));
    }
    if (currentIndex < lectures.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };
  const handleDeleteLecture = (lectureId: string) => {
    dispatch(deleteCourseContent(lectureId)).then(() => {
      dispatch(getCourseContent(courseId));
    });
  };
  const submitRating = () => {
    if (rating > 0) {
        dispatch(
          updateCourseRating({
            course_id: courseId,
            rating: rating,
        
          }),
        );
        setRatingModalVisible(false);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Please select a rating!',
        });
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headerText}>
          {courseContent.data.course.title}
        </Text>
        {/* <LabelComponent value={courseContent.data.course.title} style={styles.headerText} /> */}
        {userRole === 'instructor' && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate('CreateCourseContentScreen', {courseId})
            }>
            <Text style={styles.addButtonText}>Create Lecture</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Course Details */}
      {/* <Text style={styles.courseTitle}>{courseContent.data.course.title}</Text> */}
  <ScrollView>
  <Text style={styles.courseDescription}>
        {courseContent.data.course.description}
      </Text>

      {userRole === 'student' && (
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
             <Text style={styles.instructorText}>
          Instructor: {courseContent.data.course.Instructor.full_name}
        </Text>
        <TouchableOpacity
        style={styles.sendMessageButton}
        onPress={() =>
          navigation.navigate('MessageScreen', {
            receiverId: courseContent.data.course.Instructor.id,
            userId: userId,
            name: courseContent.data.course.Instructor.full_name,
          })
        }>
        <Text style={{fontFamily:TextStyles.veryextraBoldText, color:"#fff", fontSize:14, fontWeight:700}}>{"Send Message"}</Text>
      </TouchableOpacity>
        </View>
       
      )}
     

      {/* Lecture Display */}
      <View style={styles.lectureContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.lectureTitle}>{currentLecture.title}</Text>
            <Text style={styles.lectureDescription}>
              {currentLecture.description}
            </Text>
          </View>

          {userRole === 'instructor' && (
            <TouchableOpacity
              onPress={() => handleDeleteLecture(currentLecture.id)}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
          )}
        </View>

        {/* Video Section */}
        {currentLecture.video_path ? (
          <Video
            source={{uri: currentLecture.video_path}}
            style={{width: '100%', height: 200, marginTop: 10}}
            controls
            resizeMode="contain"
          />
        ) : (
          <Text style={{color: 'white', marginTop: 10}}>
            No video available
          </Text>
        )}

        {/* PDF Section */}
        {currentLecture.pdf_path ? (
          <View style={{marginTop: 10, height: 300}}>
            <Text>{currentLecture.pdf_path}</Text>
            <Pdf
              source={{uri: currentLecture.pdf_path, cache: true}}
              style={{
                flex: 1,
                width: Dimensions.get('window').width - 40,
                height: 300,
              }}
            />
          </View>
        ) : (
          <Text style={{color: 'white', marginTop: 10}}>No PDF available</Text>
        )}
      </View>

      {/* Pagination Buttons */}
      <View style={styles.buttonContainer}>
        {currentIndex > 0 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentIndex(prev => prev - 1)}>
            <Text style={styles.navButtonText}>Back</Text>
          </TouchableOpacity>
        )}

        {currentIndex < lectures.length - 1 ? (
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNextLecture}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          userRole === 'student' && (
            <View>
                 <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                if (currentLecture) {
                  console.log('Updating lecture status:', currentLecture.id);

                  dispatch(updateLectureStatus(currentLecture.id));
                }
                navigation.navigate('QuizScreen', {courseId});
              }}>
              <Text style={styles.navButtonText}>Start Assessment</Text>
            </TouchableOpacity>
            
            </View>
           
          )
        )}
      </View>
      {currentIndex === lectures.length - 1 && (
  <TouchableOpacity style={styles.rateButton} onPress={() => setRatingModalVisible(true)}>
    <Text style={styles.navButtonText}>Rate Course</Text>
  </TouchableOpacity>
)}
      
  </ScrollView>
     

      <Modal visible={isRatingModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{color: '#fff', fontSize: 18, marginBottom: 10}}>Rate this Course</Text>

            <Rating
              type="star"
              ratingCount={5}
              imageSize={40}
              showRating
              startingValue={0}
              onFinishRating={(value:any) => setRating(value)}
        tintColor={"#333"}
            // ratingBackgroundColor='red'
            />

            <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
              <Text style={{color: '#fff', fontSize: 16}}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRatingModalVisible(false)}>
              <Text style={{color: 'red', marginTop: 10}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Toast/>
    </View>
  );
};

export default CourseContentScreen;
