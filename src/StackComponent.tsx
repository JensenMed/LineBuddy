import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import SignUp from './screens/SignUp';



// export type StackParamList = {
//     Home:undefined;
//     SignUp:undefined;
// }

const Stack = createNativeStackNavigator();

const StackComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackComponent;