import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import HomePage from '../screens/student/Homepage/HomeScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors} from '../constants/colors';

import CourseScreen from '../screens/student/Coursescreen/CourseScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchScreen from '../screens/student/Searchscreen/SearchScreen';
import ProfileScreen from '../screens/student/Profilescreen/ProfilePage';
import Contact from '../screens/student/Contactscreen/Contact';
import { RootStackParamList } from '../navigation/AppNavigator';
import MessageScreen from '../screens/student/Message/MessageScreen';

const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();
const MessageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
// const MessageStack = ({ navigation, route }) => {
//   React.useLayoutEffect(() => {
//     const routeName = getFocusedRouteNameFromRoute(route);
//     if (routeName === "MessageScreen") {
//       navigation.setOptions({ tabBarStyle: { display: "none" } });
//     } 
//     else {
//       navigation.setOptions({ tabBarStyle: { display: "none" } });
//     }
//   }, [navigation, route]);

//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
//       <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   );
// };
const FloatingSearchButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={styles.fab}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Search')}>
      <View style={styles.fabInner}>
        <Icon name="search-outline" size={28} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
};

const BottomNavigation: React.FC = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
          headerShown: false,
        }}>
        <Tab.Screen
          name="HomePage"
          component={HomePage}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  focused && styles.tabBarLabelFocused,
                ]}>
                Home
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={focused ? '#3D5CFF' : '#B8B8D2'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Course"
          component={CourseScreen}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  focused && styles.tabBarLabelFocused,
                ]}>
                Course
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'book' : 'book-outline'}
                size={24}
                color={focused ? '#3D5CFF' : '#B8B8D2'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarButton: () => <FloatingSearchButton />,
            tabBarIcon: ({focused}) => (
              <Icon
                name="search"
                size={24}
                color={focused ? '#FF1493' : '#B8B8D2'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Message"
          component={MessageStack}
          options={({ route }) => ({

            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
              console.log(routeName)
              if (routeName === 'MessageScreen') {
                return { display: "none" }
              }else{
                return {backgroundColor: Colors.background,
                  position: 'absolute',
                  height: hp('10%'),
                  borderWidth: 0,
                  borderColor: 'transparent',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20}
              }
            })(route),
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  focused && styles.tabBarLabelFocused,
                ]}>
                Message
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'chatbubble' : 'chatbubble-outline'}
                size={24}
                color={focused ? '#3D5CFF' : '#B8B8D2'}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  focused && styles.tabBarLabelFocused,
                ]}>
                Profile
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'person' : 'person-outline'}
                size={24}
                color={focused ? '#3D5CFF' : '#B8B8D2'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background,
    position: 'absolute',
    height: hp('10%'),
    borderWidth: 0,
    borderColor: 'transparent',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  fab: {
    width: 54,
    height: 56,
    borderRadius: 50,
    backgroundColor: '#3D5CFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    elevation: 6,
    shadowColor: '#3D5CFF',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3D5CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#B8B8D2',
  },
  tabBarLabelFocused: {
    color: '#3D5CFF',
    fontWeight: 'bold',
  },
});

export default BottomNavigation;
