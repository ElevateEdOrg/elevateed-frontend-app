import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated from "react-native-reanimated";
import { image } from "../constants/images";
import { useSharedValue } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get("window");
interface CarousalComponentProps {

  style?:object
}
const data = [
  {
    id: "1",
    title: "Card 1",
    image: image.CAROUSEL1
  },
  {
    id: "2",
    title: "Card 2",
    image: image.CAROUSEL1
  },
  {
    id: "3",
    title: "Card 3",
    image: image.CAROUSEL1
  },
  {
    id: "4",
    title: "Card 4",
    image: image.CAROUSEL1
  },
  {
    id: "5",
    title: "Card 5",
    image: image.CAROUSEL1
  },
];

const CarouselComponent : React.FC<CarousalComponentProps> = ({ style }) =>  {
  const progress = useSharedValue<number>(0);

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
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
           
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   height:hp("30%"),
    // alignItems: "center",
    // justifyContent: "center",
    // flex: 1,
    // backgroundColor: "yellow",

  },
  card: {
  
    marginHorizontal:wp('2%'),
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: hp("30%"),
    borderRadius: 10,
  

  },

});

export default CarouselComponent;
