import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

interface TopInstructorCardProps {
  image: ImageSourcePropType;
  name: string;
  totalCourses: number;
  rating: number;
}

const TopInstructorCard: React.FC<TopInstructorCardProps> = ({ image, name, totalCourses, rating }) => {
  return (
    <View style={styles.card}>
     
      <Image source={image} style={styles.instructorImage} />


      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.courses}>Total Courses: {totalCourses}</Text>

        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            defaultRating={rating ?? 0}
            size={14}
            showRating={false} 
            isDisabled={true}
            selectedColor="gold"
          />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2E2E45',
    borderRadius: 12,
    padding: hp("2%"),
    marginVertical: hp("1%"),

    width: 160,
    alignItems: 'center',
  },
  instructorImage: {
    width: wp("22%"),
    height:hp("11%"),
    borderRadius: 40,
    marginBottom: hp("1%"),
    resizeMode:'cover'
  },
  details: {
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  courses: {
    fontSize: 12,
    color: '#bbb',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 6,
  },
});

export default TopInstructorCard;
