import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { AppDispatch, RootState } from '../../../state/store';
import { getCourses, searchCourse } from '../../../state/courses/reducer';
import CourseCardComponent from '../../../components/CourseCardComponent';
import { image } from '../../../constants/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Colors } from '../../../constants/colors';
import { styles } from './Styles';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';


const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { searchResults, searchLoading } = useAppSelector((state: RootState) => state.coursesReducer);
  useEffect(() => {
    getCoursesAPICall();
  }, []);

  useEffect(() => {
    if (query.trim() !== '') {
      dispatch(searchCourse(query));
    }
  }, [query, dispatch]);

  useEffect(() => {
    if (query === '') {
      getCoursesAPICall();
    } else if (searchResults) {
      setCourses(Array.isArray(searchResults) ? searchResults : []);
    }
  }, [query, searchResults]);


  const getCoursesAPICall = async () => {
    setLoading(true);
    const action = getCourses();
    dispatch(action)
      .unwrap()
      .then(async response => {
        setLoading(false);
        if (response) {
          setCourses(response.data);
        } else {
          console.log('ERROR');
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('Error fetching courses:', error);
      });
  };

  const renderCourse = ({ item }: any) => (
    <CourseCardComponent
      image={item.banner_image ? { uri: item.banner_image } : image.NOIMAGE}
      instructor={item.Instructor.full_name}
      title={item.title}
      description={item.description}
      price={item.price}
      onBuy={() =>{}}
    />
  );
  const clearSearch = () => {
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Courses..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
        />
        {query !== '' && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <FontAwesome name="close" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.courseContainer}>
      {loading || searchLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={renderCourse}
      
          ListEmptyComponent={<Text style={styles.noResults}>No Courses Found</Text>}
        />
      )}
      </View>
    
    </View>
  );
};



export default SearchScreen;
