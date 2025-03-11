import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

// interface DashboardProps {
//   navigation: NativeStackNavigationProp<any>;
// }

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        setUserRole(role);
        console.log('Fetched user role:', role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} />

     <BottomNavigation userRole={userRole}/>
    </SafeAreaView>
  );
};

export default Dashboard;
