import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IntroScreen from './src/IntroScreen';
import MainScreen from './src/MainScreen';


export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  setTimeout(() => {
    setIsLoaded(true);
  }, 2000)
  return (
    <View>
      <StatusBar style="auto" />
      {/* {isLoaded ? <MainScreen /> : <IntroScreen />} */}
      <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});