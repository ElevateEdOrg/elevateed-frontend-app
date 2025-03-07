import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const SearchScreen = () => {
   const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { searchResults, searchLoading } = useAppSelector((state: RootState) => state.coursesReducer);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setCourses([]);
        setQuery('');
      };
    }, [])
  );
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
      key={item.id}
      images={item.banner_image}
      instructor={item.Instructor.full_name}
      title={item.title}
      description={item.description}
      price={item.price}
      onBuy={() => console.log(`Buying ${item.title}`)}
      onPress={()=>navigation.navigate('CourseDetailScreen',{courseId:item.id})}
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
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
        data={courses}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `fallback-key-${index}`)}
        renderItem={renderCourse}
        removeClippedSubviews={false}
        ListEmptyComponent={<Text style={styles.noResults}>No Courses Found</Text>}
      />
      )}
      </View>
    
    </View>
  );
};



export default SearchScreen;
