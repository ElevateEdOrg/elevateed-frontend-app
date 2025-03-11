import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import { Colors } from '../../../constants/colors';
import LabelComponent from '../../../components/LableComponent';
import { styles } from './Styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../state/hooks';
import { makePayment } from '../../../state/payment/reducer';
import { useStripe } from '@stripe/stripe-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const CartScreen = () => {
  const dispatch = useAppDispatch();
    const [cart, setCart] = useState<any[]>([]);
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
  
    const navigation = useNavigation();
    useFocusEffect(
        useCallback(() => {
          loadCartData();
        }, [])
      );
    const handleGoBack = () => {
        setTimeout(() => {
          navigation.goBack();
        }, 100); // Small delay to allow state updates to settle
      };
  
    const loadCartData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        console.log('storedCart', storedCart);
        
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
  
    const handleRemoveItem = async (id: string) => {
        try {
          const updatedCart = cart.filter(item => item.id !== id);
          await AsyncStorage.setItem('cart', JSON.stringify(updatedCart)); // Ensure AsyncStorage update is completed
          setCart(updatedCart);
          Snackbar.show({ text: 'Course removed from cart', duration: Snackbar.LENGTH_SHORT });
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      };
  
      const handleClearCart = async () => {
        try {
          await AsyncStorage.removeItem('cart'); // Ensure the cart is fully cleared
          setCart([]); // Then update state
          Snackbar.show({ text: 'Cart cleared', duration: Snackbar.LENGTH_SHORT });
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      };
  
      const handleProceedToPayment = async () => {
        if (cart.length === 0) {
          Snackbar.show({ text: 'Cart is empty', duration: Snackbar.LENGTH_SHORT });
          return;
        }
      
        const courseIds = cart.map(item => item.id); // Extract course IDs
        console.log('Course IDs:', courseIds);
      
        try {
          const response = await dispatch(makePayment({ courseIds })).unwrap(); // Dispatch Redux action
          console.log('Payment Response:', response);
      
          if (response?.success && response?.data) {
            const paymentUrl = response.data;
            console.log('Opening Payment URL:', paymentUrl);
      
            // Open Stripe Checkout URL
            Linking.openURL(paymentUrl);

            //initialize the payment sheet
            // const initResponse = await initPaymentSheet({
            //   merchantDisplayName: 'notJust.dev',
            //   paymentIntentClientSecret: response.data.session_id
            // });
            // if(initResponse.error){
            //   console.log(initResponse.error);
            //   Alert.alert("Something went wrong");
            //   return;
            // }
            // // Present the payment sheet from stripe
            // await presentPaymentSheet();
          } else {
            Snackbar.show({ text: 'Failed to initiate payment', duration: Snackbar.LENGTH_SHORT });
          }
        } catch (error) {
          console.error('Payment Error:', error);
          Snackbar.show({ text: 'Error processing payment', duration: Snackbar.LENGTH_SHORT });
        }
      };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        
          <LabelComponent value="Cart" style={styles.headerText} />
          <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
  
        {cart.length > 0 ? (
  <FlatList
    data={cart}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Image source={{ uri: item.banner_image }} style={styles.courseImage} />
        <View style={styles.cardContent}>
          <View style={styles.instructorContainer}>
            <FontAwesome name="user" size={14} color="#888" style={styles.icon} />
            <Text style={styles.instructorName}>{item.Instructor?.full_name || 'Unknown Instructor'}</Text>
          </View>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.bottomSection}>
            <Text style={styles.price}>₹{item.price}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.id)}>
              <Icon name="trash" size={18} color={Colors.secondary}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}
  />
) : (
  <Text style={styles.emptyText}>Your cart is empty.</Text>
)}
  
        {cart.length > 0 && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToPayment}>
              <Text style={styles.buttonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
};



export default CartScreen;
