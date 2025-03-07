import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { RootState } from '../../../state/store';
import { getUserCourse } from '../../../state/courses/reducer';
import CourseCard from '../../../components/CourseCard';
import { styles } from './Styles';
import LabelComponent from '../../../components/LableComponent';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface LoginPageProps {
  navigation: NativeStackNavigationProp<any>;
}
const UserCourseScreen = ({ navigation }: LoginPageProps) => {
  const dispatch = useAppDispatch();
  const { userCourseData, getUserCourseLoading, getUserCourseError } = useAppSelector(
    (state: RootState) => state.coursesReducer
  );
   const [userRole, setUserRole] = useState('');

  // useEffect(() => {
  //   dispatch(getUserCourse());
  // }, []);

    useEffect(() => {
      const fetchUserName = async () => {
        try {
          const storedUser = await AsyncStorage.getItem('user');
    
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserRole(parsedUser.role);
          
            
          }
        } catch (error) {
          console.error('Error fetching user name:', error);
        }
      };
    
      fetchUserName();
          dispatch(getUserCourse());
       
          return () => {
             dispatch({ type: 'courses/getUserCourse' });
          };
       }, []);

  // Handle loading state
  if (getUserCourseLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Handle error state
  if (getUserCourseError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {getUserCourseError}</Text>
      </View>
    );
  }

  // Extract enrolled courses safely
  const enrolledCourses = userRole === 'student' 
  ? userCourseData?.data?.EnrolledCourses ?? [] 
  : userCourseData?.data?.courses ?? [];
 

  // console.log('Enrolled Courses:', enrolledCourses.courses.length);

  return (
    <View style={styles.container}>
     <View style={styles.header}>
      
          <LabelComponent value="My Courses" style={styles.headerText} />
       
        </View>

      {enrolledCourses.length === 0 ? (
        <Text style={styles.noCoursesText}>You have not enrolled in any courses yet.</Text>
      ) : (
        <FlatList
          data={enrolledCourses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>navigation.navigate('CourseContentScreen', { courseId: item.id }) }>
              <CourseCard course={item} userRole={userRole}/>
            </TouchableOpacity>
          )}
          removeClippedSubviews={false}  // Prevent issues with removing items

          contentContainerStyle={styles.listContainer}
        
        />
      )}
    </View>
  );
};



export default UserCourseScreen;
