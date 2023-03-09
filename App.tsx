import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = styles[isDarkMode ? 'dark' : 'light'];

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SafeAreaView style={backgroundStyle}>
        <BottomTabNavigator />
        {/* <SafeAreaView style={backgroundStyle}>
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
        <Text>Test</Text>
        </View>
        </ScrollView>
      </SafeAreaView> */}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: '#000',
    flex: 1,
  },
  light: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default App;
