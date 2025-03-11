import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextStyles } from '../constants/textstyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { image } from '../constants/images';
import { Colors } from '../constants/colors';

interface CourseCardComponentProps {
  images: string;
  instructor: string;
  title: string;
  description: string;
  price: string;
  onBuy: () => void;
  onPress: () => void;
}

const CourseCardComponent: React.FC<CourseCardComponentProps> = ({ 
  images, 
  instructor, 
  title, 
  description, 
  price, 
  onBuy, 
  onPress 
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image 
        source={images ? { uri: images } : image.NOIMAGE} 
        style={styles.courseImage}
      />

      <View style={styles.cardContent}>
        {/* Instructor */}
        <View style={styles.instructorContainer}>
          <FontAwesome name="user" size={14} color="#aaa" style={styles.icon} />
          <Text style={styles.instructorName}>{instructor}</Text>
        </View>

        {/* Title & Description */}
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.price}>₹{price}</Text>
          <TouchableOpacity style={styles.buyButton} onPress={onBuy}>
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2C2C3E',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: hp('1.5%'),
    marginHorizontal: wp('4%'),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  courseImage: {
   
    height: hp('18%'),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: hp('2%'),
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 6,
  },
  instructorName: {
    fontSize: 13,
    color: '#aaa',
    fontWeight: '500',
  },
  courseTitle: {
    fontSize: 17,
    fontFamily: TextStyles.veryextraBoldText,
    color: Colors.secondary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#bbb',
    marginBottom: 10,
    lineHeight: 18,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  buyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginLeft:10
  },
  buyText: {
    color: Colors.secondary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CourseCardComponent;
