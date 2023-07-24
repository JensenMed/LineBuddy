

import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import SignUp from './screens/SignUp';
import Search from './screens/Search';
import Admin from './screens/Admin';
import Settings from './screens/Settings';
import Admin_Settings from './screens/Admin_Settings';
import StackComponent from './StackComponent';
import LogIn from './screens/LogIn';

// const Test = require('react-navigation__native');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Stack = createNativeStackNavigator();

const Component = () => {
  return (
    <View className = "h-screen ">
      <StackComponent />
      {/* <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Settings"
          component={Settings}
          // options={{title: 'Welcome'}}
        />
      </Stack.Navigator>
    </NavigationContainer> */}
      {/* <Home/> */}
      {/* <SignUp/> */}
      {/* <Search/> */}
      {/* <Admin/> */}
      {/* <Admin_Settings/> */}
      {/* <LogIn/> */}
    </View>
  )
}

export default Component;