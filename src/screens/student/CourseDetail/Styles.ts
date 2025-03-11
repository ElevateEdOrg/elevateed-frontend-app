


   import { StyleSheet } from 'react-native';
   
   import {
     widthPercentageToDP as wp,
     heightPercentageToDP as hp,
   } from 'react-native-responsive-screen';
   import { TextStyles } from '../../../constants/textstyle';
   import { Colors } from '../../../constants/colors';
   
   export const styles = StyleSheet.create({
    container: {
        flex: 1,
            backgroundColor: Colors.background,
            paddingTop:hp("8%"),
         
            paddingHorizontal: wp('3%'),
       },
       underContainer:{
marginBottom:hp("21%")
       },
       banner: {
         width: '100%',
         height: hp('25%'),
         borderRadius: 10,
         marginBottom: hp('2%'),
       },
       title: {
         fontSize: 20,
         fontWeight: 'bold',
         color: Colors.secondary,
         marginBottom: 10,
       },
       instructor: {
         fontSize: 14,
         color: '#888',
         marginBottom: 5,
       },
       category: {
         fontSize: 14,
         color: Colors.primary,
         marginBottom: 5,
       },
       price: {
         fontSize: 18,
         fontWeight: 'bold',
         color: Colors.primary,
         marginBottom: 10,
       },
       description: {
         fontSize: 14,
         color: '#ccc',
         marginBottom: 20,
       },
       welcomeMsg: {
         fontSize: 16,
         color: Colors.secondary,
         marginBottom: 20,
       },
       video: {
         width: '100%',
         height: hp('20%'),
         backgroundColor: '#000',
         marginBottom: 20,
         borderRadius: 10,
         justifyContent: 'center',
         alignItems: 'center',
       },
       placeholderVideo: {
         backgroundColor: '#333',
       },
       placeholderText: {
         color: '#888',
         fontSize: 16,
       },
       buyButton: {
         backgroundColor: Colors.primary,
         padding: 12,
         borderRadius: 10,
         alignItems: 'center',
         marginTop: 20,
         
       },
       buyText: {
         color: Colors.secondary,
         fontWeight: 'bold',
         fontSize: 16,
       },
       loadingText: {
         textAlign: 'center',
         color: Colors.secondary,
         marginTop: 20,
       },
       errorText: {
         textAlign: 'center',
         color: 'red',
         marginTop: 20,
       },
       cartButton: { backgroundColor: 'green', padding: 12, alignItems: 'center', marginVertical: 10, borderRadius: 5 },
  cartText: { color: Colors.secondary, fontSize: 16 },
   });
   