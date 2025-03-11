import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { TextStyles } from '../constants/textstyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
interface CourseCardComponentProps {
  image: ImageSourcePropType;
  instructor: string;
  title: string;
  description: string;
  price: string;
  onBuy: () => void;
}

const CourseCardComponent: React.FC<CourseCardComponentProps> = ({ image, instructor, title, description, price, onBuy }) => {
  return (
    <View style={styles.card}>

      <Image source={image} style={styles.courseImage} />

  
      <View style={styles.cardContent}>
      <View style={styles.instructorContainer}>
      <FontAwesome name="user" size={14} color="#888" style={styles.icon} />
          <Text style={styles.instructorName}>{instructor}</Text>
        </View>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.price}>${price}</Text>
          <TouchableOpacity style={styles.buyButton} onPress={onBuy}>
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
  
    backgroundColor: '#2E2E45',
    borderRadius: 12,
    padding: hp("1%"),
    marginVertical: hp("1%"),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  courseImage: {
    width: '100%',
    height: hp('16%'),
    borderRadius: 10,
    marginRight: 12,
    resizeMode:'stretch'
  },
  cardContent: {
    marginTop:hp('1%'),
    flex: 1,
    marginLeft:wp("3%")
  },
  instructorName: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 5,
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: TextStyles.veryextraBoldText,
  
    color: '#fff',
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginVertical: 4,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3D5CFF',
  },
  buyButton: {
    backgroundColor: '#3D5CFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CourseCardComponent;
