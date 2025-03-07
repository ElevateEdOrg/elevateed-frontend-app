import React, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./Styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { image } from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "SplashScreen">;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    const checkWalkthrough = async () => {
      const hasSeenWalkthrough = await AsyncStorage.getItem("hasSeenWalkthrough");
      const isUserLogin = await AsyncStorage.getItem("userSignedIn");
      console.log("isUserLogin",isUserLogin);
      console.log("hasSeenWalkthrough",hasSeenWalkthrough);
      
      
      if(isUserLogin=='true'){
        
    navigation.replace('Dashboard');
      }else{
        if (hasSeenWalkthrough) {
// navigation.replace('Contact');
          navigation.replace("LoginScreen");
          // navigation.replace('MessageScreen', { receiverId:"04b8bbab-e20f-4b6e-9020-e8c51dad9a43", userId:"37a8f2de-3df3-4d13-a32c-0ea0c64de833",name:"vraj patel"});
        } else {
          navigation.replace("OnBoardingScreen");
        }
      }
     
    };

    setTimeout(checkWalkthrough, 2000);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} translucent={true}  />
      <Image source={image.LOGO} style={styles.image} />
    </SafeAreaView>
  );
};



export default SplashScreen;
