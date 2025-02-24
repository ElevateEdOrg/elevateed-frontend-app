import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import LabelComponent from '../../components/LableComponent';
import { styles } from './Styles';
import { image } from '../../constants/images';
import CarouselComponent from '../../components/CarouselComponent';

const { width } = Dimensions.get('window');


const HomePage = () => {
  const progress = 46 / 60;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.header}>
          <LabelComponent value="Hi, Jay" style={styles.header1} />
          <LabelComponent value="Let's start learning" style={styles.header2} />
        </View>
        <Image source={image.PROFILEPERSON} style={styles.profilePerson}/>
      </View>

      <ScrollView style={styles.bottomHalf}>
      <View style={{ alignItems: 'center' }}>
    <LabelComponent value="Most Viewed Courses" style={styles.carousalTitle} />
</View>
<CarouselComponent/>
<View >
    <LabelComponent value="Most Viewed Courses" style={styles.carousalTitle} />
</View>

        
      </ScrollView>
      <View style={styles.card}>
       <View style={styles.cardContent}>
       <LabelComponent value="Learned Today" style={styles.cardText}/>
       <LabelComponent value="My Courses" style={[styles.cardText,{color:'#3D5CFF'}]}/>
       </View>
       <View style={{flexDirection:'row', alignItems:'baseline'}}>
       <LabelComponent value="46min" style={[styles.cardText1]}/>
       <LabelComponent value="/60min" style={[styles.cardText1,{fontSize:12,fontWeight:400}]}/>
       </View>
       {/* <View style={styles.progressContainer}>
        <Progress.Bar 
          progress={progress} 
          width={null} 
          height={8} 
          color="#3D5CFF" 
          borderRadius={5} 
          unfilledColor="#E0E0E0"
          borderWidth={0}
        />
      </View> */}
       
          
       
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
