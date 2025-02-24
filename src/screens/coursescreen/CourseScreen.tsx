import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCourses } from '../../state/courses';
import { useAppDispatch } from '../../state/hooks';

const CourseScreen = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

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
        source={item.banner_image ? { uri: item.banner_image } : require('../../assets/image/person.png')} 
        style={styles.bannerImage} 
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.instructor}>Instructor: {item.Instructor.full_name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3D5CFF" />
      ) : (
        // <FlatList 
        //   data={courses} 
        //   keyExtractor={item => item.id} 
        //   renderItem={renderItem} 
        // />
        <Text>
        hellooooooo
      </Text>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  instructor: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default CourseScreen;
