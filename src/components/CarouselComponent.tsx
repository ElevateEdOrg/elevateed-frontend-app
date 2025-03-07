import React from "react";
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated from "react-native-reanimated";
import { image } from "../constants/images";
import { useSharedValue } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
interface CarousalComponentProps {

  style?:object
  data: { id: string; image: { uri: string }; title: string }[];
}


const CarouselComponent : React.FC<CarousalComponentProps> = ({ style,data}) =>  {
  const navigation = useNavigation();
  const progress = useSharedValue<number>(0);

  const handlePress = (id: string) => {
    navigation.navigate("CourseDetailScreen", { courseId: id });
  };

  return (
    <View style={[styles.container,style]}>
      
      <Carousel
        loop
        width={wp('95%')}
        height={250}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <View style={styles.card}>
              <Image
                source={item.image && item.image.uri ? { uri: item.image.uri } : require('../assets/image/placeholder_noimage.png')}
                style={styles.image}
              />
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("30%"),
  },
  card: {
    marginHorizontal: wp("2%"),
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden", // Ensures overlay stays inside the image
  },
  image: {
    width: "100%",
    height: hp("30%"),
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    padding: 10,
    borderRadius: 5,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CarouselComponent;
