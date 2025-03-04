import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HomeStack} from './src/Navigation/HomeStack';
import {NavigationContainer} from '@react-navigation/native';
import {AppColors} from './src/Utils/AppConstants';
import AppLoader from './src/Ui/Components/AppLoader';
import {useSelector} from 'react-redux';
import {AppRootStore} from './src/Redux/store/AppStore';

const App = () => {
  const selector: any = useSelector(
    (state: AppRootStore) => state.SliceReducer,
  );

  return (
    <View style={styles.cont}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
      {selector?.isLoaderStart && (
        <AppLoader visible={selector?.isLoaderStart} />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
});
