import React, { useEffect, useRef, useState } from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LabelComponent from '../../../components/LableComponent';
import { styles } from './Styles';
import { image } from '../../../constants/images';
import CarouselComponent from '../../../components/CarouselComponent';
import CourseCardComponent from '../../../components/CourseCardComponent';
import { categories, courseData, instructorData, recentCourses } from '../../../constants/coursecarddata';
import courses from '../../../state/courses';
import RecentCourseCard from '../../../components/RecentCourseCarsComponent';
import TopInstructorCard from '../../../components/TopInstructorComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');


const HomePage = () => {
  const progress = 46 / 60;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredCourses =
    selectedCategory === "All"
      ? courseData
      : courseData.filter((course) => course.category === selectedCategory);
      const [fullName, setFullName] = useState<string | null>('');

      
      useEffect(() => {
        const fetchUserName = async () => {
          try {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
              const parsedUser = JSON.parse(storedUser);
              setFullName(parsedUser.full_name || 'User');  // Fallback to 'User' if name is missing
            }
          } catch (error) {
            console.error('Error fetching user name:', error);
          }
        };
    
        fetchUserName();
      }, []);

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} translucent={true}  />
      <View style={styles.topHalf}>
        <View style={styles.header}>
        <LabelComponent value={`Hi, ${fullName}`} style={styles.header1} />
          <LabelComponent value="Let's start learning" style={styles.header2} />
        </View>
        <Image source={image.PROFILEPERSON} style={styles.profilePerson}/>
      </View>

      <ScrollView style={styles.bottomHalf} showsVerticalScrollIndicator={false}>
      <View>
    <LabelComponent value="Newest Courses" style={styles.carousalTitle} />
</View>
<CarouselComponent style={styles.carousalComponent}/>
<View style={styles.rvContainer}>
<LabelComponent value="Recent Course" style={styles.carousalTitle1} />
<FlatList
        data={recentCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecentCourseCard
            image={item.image}
            instructor={item.instructor}
            title={item.title}
            description={item.description}
            progress={item.progress}
          />
        )}
      />
</View>
<View style={styles.rcContainer}>
<LabelComponent value="Recommanded for You" style={styles.carousalTitle1} />
<FlatList
  data={courseData.slice(0, 2)}
  horizontal
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item) => item.id.toString()}
  ItemSeparatorComponent={() => <View style={{ width: wp('4%') }} />}
  renderItem={({ item }) => (
    <CourseCardComponent
      key={item.id}
      image={item.image}
      instructor={item.instructor}
      title={item.title}
      description={item.description}
      price={item.price}
      onBuy={() => console.log(`Buying ${item.title}`)}
    />
  )}
/>
</View>
<View style={styles.rcContainer}>
<LabelComponent value="Top Instructor" style={styles.carousalTitle1} />
<FlatList
        data={instructorData}
        horizontal
        showsHorizontalScrollIndicator={false} 
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ width: wp('4%') }} />}
        renderItem={({ item }) => (
          <TopInstructorCard
            image={item.image}
            name={item.name}
            totalCourses={item.totalCourses}
            rating={item.rating}
          />
        )}
     
      />
</View>
<View style={styles.browseCourseCard}>

    <LabelComponent value="Browse Course" style={styles.carousalTitle1} />
    <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.selectedCategoryText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

<View style={styles.browseCourseCard}>
        {filteredCourses.map((course) => (
          <CourseCardComponent
            key={course.id}
            image={course.image}
            instructor={course.instructor}
            title={course.title}
            description={course.description}
            price={course.price}
            onBuy={() => console.log(`Buying ${course.title}`)}
          />
        ))}
      </View>
 
</View>


        
      </ScrollView>
      {/* <View style={styles.card}>
       <View style={styles.cardContent}>
       <LabelComponent value="Learned Today" style={styles.cardText}/>
       <LabelComponent value="My Courses" style={[styles.cardText,{color:'#3D5CFF'}]}/>
       </View>
       <View style={{flexDirection:'row', alignItems:'baseline'}}>
       <LabelComponent value="46min" style={[styles.cardText1]}/>
       <LabelComponent value="/60min" style={[styles.cardText1,{fontSize:12,fontWeight:400}]}/>
       </View>
      </View> */}
    </SafeAreaView>
  );
};

export default HomePage;
