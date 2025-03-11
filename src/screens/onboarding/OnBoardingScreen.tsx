import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

import LabelComponent from '../../components/LableComponent';

import { image } from '../../constants/images';
import { styles } from './Styles';
import { RootStackParamList } from '../../navigation/AppNavigator';
import TextfieldComponent from '../../components/TextfieldComponent';


const steps = [
  {
    id: 1,
    image: image.ONBOARDING1,
   style: styles.image,

   lable: 'Numerous Free\ntrial courses',
   discription:'Free courses for you to\nfind your way to learning'
  },
  {
    id: 2,
    image: image.ONBOARDING2,
    style: styles.image,
     lable: 'Quick and easy\nlearning',
   discription:'Easy and fast learning at\nany time to help you\nimprove various skills'
  },
  {
    id: 3,
    image: image.ONBOARDING3,
    style: styles.image,
     lable: 'Create your own\nstudy plan',
   discription:'Study according to the\nstudy plan, make study\nmore motivated'
  },
];

export default function OnBoardingScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentStep, setCurrentStep] = useState(0);
  const [text, setText] = useState<string>('');

  const completeWalkthrough = async () => {
    await AsyncStorage.setItem('hasSeenWalkthrough', 'true');
    navigation.navigate('LoginScreen');
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeWalkthrough();
    }
  };

  const handleSkip = () => {
    completeWalkthrough();
  };

  const distanceThreshold = 100;
  const velocityThreshold = 0.2;
  
  const handleSwipe = ({ nativeEvent }: any) => {
    const { translationX, velocityX, state } = nativeEvent;
  
    if (state !== State.END) return; 
  
    if (translationX < -distanceThreshold && velocityX < -velocityThreshold) {
      handleNext(); 
    } else if (translationX > distanceThreshold && velocityX > velocityThreshold) {
      setCurrentStep((prev) => Math.max(0, prev - 1)); 
    }
  };

  return (
    
    <GestureHandlerRootView style={styles.container}>
     <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} translucent={true}  />
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.pageCount}>{`${currentStep + 1} `}</Text>
          <Text
            style={[
              styles.pageCount,
              {color: 'white'},
            ]}>{`/ ${steps.length} `}</Text>
        </View>

        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <PanGestureHandler onHandlerStateChange={handleSwipe}>
        <View style={styles.card}>
          <Image
            source={steps[currentStep].image}
            style={steps[currentStep].style}
          />
         <LabelComponent value={steps[currentStep].lable}  style={styles.lableTitleText}/>
         <LabelComponent value={steps[currentStep].discription} style={styles.descriptionText}/>
        
        </View>
      </PanGestureHandler>

      <View style={styles.footerContainer}>
       
        <TouchableOpacity
          disabled={currentStep === 0}
          onPress={() => setCurrentStep(currentStep - 1)}
          
        >
          <Text style={[styles.buttonText, currentStep === 0 && styles.disabledText ]}>Prev</Text>
        </TouchableOpacity>

        
        <View style={styles.indicatorContainer}>
  {steps.map((_, index) => (
    <View 
      key={index} 
      style={[
        styles.indicator,
        currentStep === index && styles.activeIndicator,
      ]}
    />
  ))}
</View>
        <TouchableOpacity onPress={handleNext} >
          <Text style={[styles.buttonText]}>
            {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

