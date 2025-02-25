import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCourses } from '../../state/courses';
import { useAppDispatch } from '../../state/hooks';
import Config from 'react-native-config';
import { image } from '../../constants/images';
import { styles } from './Styles';
import LabelComponent from '../../components/LableComponent';

const CourseScreen = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
// console.log('hiiiiiiiii: {Config.BASE_URL}',Config.BASE_URL)
  useEffect(() => {
   
    getCoursesAPICall();
  }, []);


// function fetchCourse(){
//     axios.get('http://192.168.10.49:8000/api/courses/getcourses')
//     .then(response => {
//       setCourses(response.data.data);
//       setLoading(false);
//     })
//     .catch(error => {
//       console.error('Error fetching courses:', error);
//       setLoading(false);
//     });
// }

const getCoursesAPICall = async () => {

  setLoading(true);
  const action = getCourses();
  dispatch(action)
    .unwrap()
    .then(async response => {
      console.log('RESPONSEEE GET COURSESSSSSSSS', response);
      
      setLoading(false);
      if (response) {
        setCourses(response.data);
      } else {
       console.log('ERORRRR');
      }
    })
    .catch(error => {
      setLoading(false);
      console.log('Error fetching courses:', error);
    });
};

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image 
        source={item.banner_image ? { uri: item.banner_image } : image.NOIMAGE} 
        style={styles.bannerImage} 
        
        
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.instructor}>Instructor: {item.Instructor.full_name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LabelComponent value='Courses' style={styles.headerText}/>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#3D5CFF" />
      ) : (
        <FlatList 
          data={courses} 
          keyExtractor={item => item.id.toString()} 
          renderItem={renderItem} 
          numColumns={2}
        columnWrapperStyle={styles.row} 
        style={styles.cardContainer}
        />
     
      )}
      
    </SafeAreaView>
  );
};



export default CourseScreen;
