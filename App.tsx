import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

import store from './src/redux/store';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = styles[isDarkMode ? 'dark' : 'light'];

  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <SafeAreaView style={backgroundStyle}>
          <BottomTabNavigator />
        </SafeAreaView>
      </Provider>
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
