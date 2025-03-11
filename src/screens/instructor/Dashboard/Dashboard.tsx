import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  FlatList,
  Image,
  Text,
  ImageSourcePropType,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';


import { styles } from './Styles';
import BottomNavigation from '../../../components/InstructorBottomMenuComponent';


// interface DashboardProps {
//   navigation: NativeStackNavigationProp<any>;
// }

const InstructorDashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} />

     <BottomNavigation />
    </SafeAreaView>
  );
};

export default InstructorDashboard;
