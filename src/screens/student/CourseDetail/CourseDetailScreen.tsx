import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Video from 'react-native-video';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CourseType, getCourseDetail } from '../../../state/courses/reducer';
import { useAppDispatch } from '../../../state/hooks';
import { image } from '../../../constants/images';
import { Colors } from '../../../constants/colors';
import { styles } from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addToCart } from '../../../state/cart/reducer';
import Toast from 'react-native-toast-message';
import Snackbar from 'react-native-snackbar';

interface CourseDetailProps {
  navigation: NativeStackNavigationProp<any>;
  route:any;
}
const CourseDetailScreen = ({ route,navigation }:CourseDetailProps) => {
 
  const { courseId } = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [course, setCourse] = useState<CourseType | null>(null);
  const [paused, setPaused] = useState(false);
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      getCourseDetailAPICall();
      hasFetched.current = true;
    }
   // loadCartData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setPaused(true); // 👈 Pause video when leaving screen
      };
    }, [])
  );

  const getCourseDetailAPICall = async () => {
    setLoading(true);
    const action = getCourseDetail(courseId);
    dispatch(action)
      .unwrap()
      .then(response => {
        setLoading(false);
        if (response) {
          setCourse(response.data);
        } else {
          console.log('Error: No response data');
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('Error fetching course details:', error);
      });
  };

  // const loadCartData = async () => {
  //   try {
  //     const savedCart = await AsyncStorage.getItem('cart');
  //     if (savedCart) {
  //       setCart(JSON.parse(savedCart));
  //     }
  //   } catch (error) {
  //     console.log('Error loading cart:', error);
  //   }
  // };

  const handleBuyNow = async () => {
    if (!course) return;

    try {
      // Retrieve existing cart data
      const storedCart = await AsyncStorage.getItem('cart');
      const cart = storedCart ? JSON.parse(storedCart) : [];

      // Prevent duplicates
      if (!cart.some((item: CourseType) => item.id === course.id)) {
        const updatedCart = [...cart, course]; // Add new course to the cart
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        console.log('Cart updated:', updatedCart);
        
        Snackbar.show({ text: 'Course added to cart', duration: Snackbar.LENGTH_SHORT });
      } else {
        Snackbar.show({ text: 'Course is already in the cart', duration: Snackbar.LENGTH_SHORT });
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (!course) {
    return <Text style={styles.errorText}>Course not found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.underContainer}>
      <Image source={course.banner_image ? { uri: course.banner_image } : image.NOIMAGE} style={styles.banner} />
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.instructor}>Instructor: {course.Instructor.full_name}</Text>
      <Text style={styles.category}>Category: {course.Category.name}</Text>
      <Text style={styles.price}>Price: ${course.price}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <Text style={styles.welcomeMsg}>{course.welcome_msg}</Text>
     

      {course.intro_video ? (
        <Video source={{ uri: course.intro_video }} style={styles.video} controls resizeMode="cover"  paused={paused}/>
      ) : (
        <View style={[styles.video, styles.placeholderVideo]}>
          <Text style={styles.placeholderText}>No Video Available</Text>
        </View>
      )}

      <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
        <Text style={styles.buyText}>Buy Now</Text>
      </TouchableOpacity>
      </View>
    

    
    </ScrollView>
  );
};

export default CourseDetailScreen;
