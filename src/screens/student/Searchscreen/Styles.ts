import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextStyles} from '../../../constants/textstyle';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop:hp("7%"),
        paddingHorizontal:wp("3%"),
       
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.card_background,
        borderRadius: 10,
        marginBottom: hp("1.5%"),
      },
      searchInput: {
        flex: 1,
        padding: 12,
        color: Colors.secondary,
      },
      clearButton: {
        padding: 12,
      },
      courseContainer:{
       paddingBottom: hp("7%"),
      },
            loadingText: {
        color: Colors.secondary,
        textAlign: 'center',
        marginVertical: 20,
      },
      noResults: {
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
      },
});
