import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../Utils/Routes';
import CalenderScreen from '../Ui/Sections/Calender/Screens/CalenderScreen';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home.CalenderScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.Home.CalenderScreen}
        component={CalenderScreen}
      />
    </Stack.Navigator>
  );
};
