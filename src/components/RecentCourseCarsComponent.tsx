import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ProgressView } from '@react-native-community/progress-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../constants/colors';

interface RecentCourseCardProps {
  image: any;
  instructor: string;
  title: string;
  description: string;
  progress: string; // Value between 0 and 1 (e.g., 0.5 for 50%)
}

const RecentCourseCard: React.FC<RecentCourseCardProps> = ({
  image,
  instructor,
  title,
  description,
  progress,
}) => {

  const numericProgress = parseFloat(progress)/100; 
console.log("image: " + image);

  return (
    <View style={styles.card}>

      <Image source={{uri: image}} style={styles.courseImage} />


      <View style={styles.cardContent}>

        <View style={styles.instructorRow}>
          <FontAwesome name="user" size={14} color="#888" style={styles.icon} />
          <Text style={styles.instructorName}>{instructor}</Text>
        </View>

  
        <Text style={styles.courseTitle}>{title}</Text>

     
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

   
        <ProgressView
          progress={isNaN(numericProgress) ? 0 : numericProgress}
          progressTintColor="#3D5CFF"
          trackTintColor="#555"
          style={styles.progressBar}
        />

        {/* Progress Percentage */}
        <Text style={styles.progressText}>
        {`${(isNaN(numericProgress) ? 0 : numericProgress * 100).toFixed(2)}% Completed`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card_background,
    borderRadius: 12,
    padding: hp("1.5%"),
    marginVertical: hp("1%"),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseImage: {
    width: wp("24%"),
    height:hp("13%"),
    borderRadius: 10,
    marginRight: wp("3%"),
    resizeMode:'cover'
  },
  cardContent: {
    flex: 1,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  instructorName: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginVertical: 4,
  },
  progressBar: {
    width: '100%',
    height: hp("1%"),
    borderRadius: 5,
    marginVertical: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: hp('0.2%'),
  },
});

export default RecentCourseCard;
