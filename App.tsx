import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HomeStack} from './src/Navigation/HomeStack';
import {NavigationContainer} from '@react-navigation/native';
import {AppColors} from './src/Utils/AppConstants';

const App = () => {
  return (
    <View style={styles.cont}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
});
