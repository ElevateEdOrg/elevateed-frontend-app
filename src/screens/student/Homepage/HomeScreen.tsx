import React, {useEffect, useCallback, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LabelComponent from '../../../components/LableComponent';
import {styles} from './Styles';
import {image} from '../../../constants/images';
import CarouselComponent from '../../../components/CarouselComponent';
import CourseCardComponent from '../../../components/CourseCardComponent';

import courses, {
  CourseType,
  getCategories,
  getCourses,
  getRecommandedCourses,
  getTopInstructor,
  getUserCourse,
  InstructorType,
} from '../../../state/courses';
import RecentCourseCard from '../../../components/RecentCourseCarsComponent';
import TopInstructorCard from '../../../components/TopInstructorComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '../../../state/hooks';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RootState} from '../../../state/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
interface HomePageProps {
  navigation: NativeStackNavigationProp<any>;
}
const HomePage = ({ navigation }: HomePageProps) => {

  const dispatch = useAppDispatch();
  const [userRole, setUserRole] = useState('');
  const [fullName, setFullName] = useState<string | null>('');
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [recommandedCourses, setRecommandedCourses] = useState<CourseType[]>(
    [],
  );
  const [instructors, setInstructors] = useState<InstructorType[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userCourses, setUserCourses] = useState<CourseType[]>([]);
    const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState({
    user: true,
    courses: true,
    recommended: true,
    instructors: true,
    categories: true,
  });

  const {userCourseData} = useAppSelector(
    (state: RootState) => state.coursesReducer,
  );
  const enrolledCourses = userCourseData?.data.EnrolledCourses || [];

  useEffect(() => {
    fetchData();
  }, []);


  useFocusEffect(
    useCallback(() => {
      console.log("Fetching courses on back navigation...");
      fetchCourses(); 

      if (userCourseData) {
        console.log("Enrolled Courses: ", enrolledCourses);
        setUserCourses(enrolledCourses); // Set Enrolled Courses State
      }
  
     
    }, [userCourseData])
  );


  const fetchData = async () => {
    try {
      setRefreshing(true); // Start Refreshing

      await fetchUserData();
      await fetchCourses();
      await fetchTopInstructors();
      await fetchCategories();
      await dispatch(getUserCourse());

      if (userRole === 'student') {
        await fetchRecommendedCourses();
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false); // Stop Refreshing
    }
  };

  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setFullName(parsedUser.full_name || 'User');
        setUserRole(parsedUser.role);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(prev => ({...prev, user: false}));
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await dispatch(getCourses()).unwrap();
await dispatch(getUserCourse());
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(prev => ({...prev, courses: false}));
    }
  };

  const fetchRecommendedCourses = async () => {
    try {
      const response = await dispatch(getRecommandedCourses()).unwrap();
      setRecommandedCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching recommended courses:', error);
    } finally {
      setLoading(prev => ({...prev, recommended: false}));
    }
  };

  const fetchTopInstructors = async () => {
    try {
      const response = await dispatch(getTopInstructor()).unwrap();
      setInstructors(response.data || []);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    } finally {
      setLoading(prev => ({...prev, instructors: false}));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await dispatch(getCategories()).unwrap();
      setCategories(['All', ...response.data.map((item: { name: any; }) => item.name)]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(prev => ({...prev, categories: false}));
    }
  };
  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter(course => course.Category.name === selectedCategory);
      const latestCourses = [...courses]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
      console.log("latestCourses", latestCourses.map((course) => ({
        id: course.id,
        image: { uri: course.banner_image }, 
        title: course.title
      })));
      
  // console.log('Enrolled Courses:', enrolledCourses);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent={true}
      />
      <View style={styles.topHalf}>
        <View style={styles.header}>
          <LabelComponent value={`Hi, ${fullName}`} style={styles.header1} />
          {userRole == 'student' ? (
            <LabelComponent
              value="Let's start learning"
              style={styles.header2}
            />
          ) : (
            <LabelComponent
              value="Let's create new course"
              style={styles.header2}
            />
          )}
        </View>
        <Image source={image.PROFILEPERSON} style={styles.profilePerson} />
      </View>

      <ScrollView
        style={styles.bottomHalf}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} /> // Pull to Refresh
        }
        >
        <View>
          <LabelComponent value="Newest Courses" style={styles.carousalTitle} />
        </View>
        {loading.courses ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <CarouselComponent
            style={styles.carousalComponent}
            data={latestCourses.map((course) => ({
              id: course.id,
              image: { uri: course.banner_image }, 
              title: course.title
            }))}
          />
        )}

        <TouchableOpacity
          style={styles.myCoursesContainer}
          onPress={() => navigation.navigate('UserCoursesScreen')}>
          <LabelComponent value="My Courses" style={styles.mycourseText} />
          <FontAwesome name="arrow-right" size={24} color="#fff" />
        </TouchableOpacity>

        {userRole === 'student' && (
          <View style={styles.rvContainer}>
            <LabelComponent
              value="Recent Course"
              style={styles.carousalTitle1}
            />
            {loading.courses ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <FlatList
                data={userCourses}
                nestedScrollEnabled={true}
                keyExtractor={item => item.id?.toString() || Math.random().toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CourseContentScreen', {
                        courseId: item.id,
                      })
                    }>
                    <RecentCourseCard
                      image={item.banner_image}
                      instructor={item.Instructor.full_name}
                      title={item.title}
                      description={item.description}
                      progress={item.Enrollment.progress}
                    />
                  </TouchableOpacity>
                )}
                removeClippedSubviews={true}
              />
            )}
          </View>
        )}
        {userRole === 'student' && (
          <View style={styles.rcContainer}>
            <LabelComponent
              value="Recommanded for You"
              style={styles.carousalTitle1}
            />{loading.recommended ? (
              <ActivityIndicator size="large" color="#fff" />
            ) :    <FlatList
            data={recommandedCourses}
            horizontal
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
     
            renderItem={({item}) => (
              <CourseCardComponent
                key={item.id}
                images={item.banner_image}
                instructor={item.Instructor.full_name}
                title={item.title}
                description={item.Category.name}
                price={item.price}
                onBuy={() => console.log(`Buying ${item.title}`)}
                onPress={() =>
                  navigation.navigate('CourseDetailScreen', {
                    courseId: item.id,
                  })
                }
              />
            )}
            removeClippedSubviews={true}
          />}
         
          </View>
        )}

        <View style={styles.rcContainer}>
          <LabelComponent
            value="Top Instructor"
            style={styles.carousalTitle1}
          />
          {loading.instructors ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <FlatList
              data={instructors}
              horizontal
              nestedScrollEnabled={true} // ✅ Allows FlatList inside ScrollView
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <View style={{width: wp('4%')}} />}
              renderItem={({item}) => (
                <TopInstructorCard
                  images={item.avatar}
                  name={item.full_name}
                  totalCourses={item.total_courses}
                  totalEnrollments={item.total_enrollments}
                />
              )}
              removeClippedSubviews={true}
            />
          )}
        </View>
        <View style={styles.browseCourseCard}>
          <LabelComponent value="Browse Course" style={styles.carousalTitle1} />
          {loading.categories ?(
            <ActivityIndicator size="large" color="#fff" />
          ) : <FlatList
          data={categories}
          horizontal
          nestedScrollEnabled={true} // ✅ Allows FlatList inside ScrollView
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(item)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.selectedCategoryText,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          removeClippedSubviews={true}
        />}
          

          <View style={styles.browseCourseCard}>
            {filteredCourses.map(course => (
              <CourseCardComponent
                key={course.id}
                images={course.banner_image}
                instructor={course.Instructor.full_name}
                title={course.title}
                description={course.description}
                price={course.price}
                onBuy={() => console.log(`Buying ${course.title}`)}
                onPress={() =>
                  navigation.navigate('CourseDetailScreen', {
                    courseId: course.id,
                  })
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
