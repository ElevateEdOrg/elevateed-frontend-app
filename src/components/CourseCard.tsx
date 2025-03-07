import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { CourseType, deleteCourse, getUserCourse } from '../state/courses/reducer';
import { useAppDispatch } from '../state/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';


interface CourseCardProps {
  course: CourseType;
  userRole:string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course,userRole }) => {
  const dispatch = useAppDispatch();
const navigation = useNavigation();
  const handleDeleteCourse = async () => {
    Alert.alert(
      'Delete Course',
      'Are you sure you want to delete this course?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              console.log('Deleting course:', course.id);
              
              await dispatch(deleteCourse(course.id)).unwrap();
              dispatch(getUserCourse()); // Refresh course list
            } catch (error) {
              console.error('Error deleting course:', error);
              Alert.alert('Error', 'Failed to delete the course.');
            }
          },
        },
      ]
    );
  };
  const handleEditCourse = () => {
    navigation.navigate('CreateCourseScreen', {
      courseId: course.id,
      isUpdate: true,
    });
  };
  return (
    <View style={styles.card}>
      <Image source={{ uri: course.banner_image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{course.title}</Text>
       {/* {userRole=='student'?<Text style={styles.instructor}>Instructor: {course.Instructor.full_name}</Text>:<Text style={styles.instructor}>Description: {course.description}</Text>}  */}
      </View>
      {userRole === 'instructor' && (
         <View style={styles.iconContainer}>
         <TouchableOpacity style={styles.iconButton} onPress={handleEditCourse}>
           <Icon name="pencil" size={24} color="blue" />
         </TouchableOpacity>
         <TouchableOpacity style={styles.iconButton} onPress={handleDeleteCourse}>
           <Icon name="trash" size={24} color="red" />
         </TouchableOpacity>
       </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#2E2E45',
   borderRadius: 12,
      padding: hp("1.5%"),
      marginVertical: hp("1%"),
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    marginHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  instructor: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  deleteButton: { marginTop: 10,  padding: 8, borderRadius: 5 },
  deleteButtonText: { color: 'white', textAlign: 'center' },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default CourseCard;
