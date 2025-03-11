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


import BottomNavigation from '../../../components/BottomMenuComponent';
import { styles } from './Styles';

// interface DashboardProps {
//   navigation: NativeStackNavigationProp<any>;
// }

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} />

     <BottomNavigation />
    </SafeAreaView>
  );
};

export default Dashboard;
