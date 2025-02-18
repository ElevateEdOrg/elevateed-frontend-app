
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}      />
     <Text style={styles.titleText}>ElevateED</Text>
     <Text style={styles.titleText1}> Virtual Learning</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container:{
flex:1,
justifyContent:'center',
alignItems:'center',
 },
 titleText:{
  fontSize: 20,
  color: 'white'
 },
 titleText1:{
  fontSize: 16,
  color: 'white'
 }
});

export default App;
