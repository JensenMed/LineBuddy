import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Home from './screens/Home';
import {View, Text, Button} from 'react-native'
import SignUp from './screens/SignUp';
import Welcome from './screens/Welcome';
import Admin_Settings from './screens/Admin_Settings';
import Admin from './screens/Admin';
import Search from './screens/Search';
import Settings from './screens/Settings';
import LogIn from './screens/LogIn';
import SearchAdmin from './screens/SearchAdmin';


export type StackParamList = {
    Home:undefined;
    SignUp:undefined;
    Welcome:undefined;
    LogIn:undefined;
    Search:undefined;
    Admin_Settings:undefined;
    Settings:undefined;
    SearchAdmin:undefined;
}

const Stack = createNativeStackNavigator();

const StackComponent = () => {
  return (

    <NavigationContainer>
    <Stack.Navigator  
    screenOptions={{
    headerShown: false
      }}>
    {/* <Stack.Screen
        name="Home"
        component={Home}
      /> */}
      <Stack.Screen
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <Button title="Update count" />
          ),
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        name="Admin"
        component={Admin}
      />
      <Stack.Screen
        name="Admin Settings"
        component={Admin_Settings}
      />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
      />
       <Stack.Screen
        name="Search Admin"
        component={SearchAdmin}
        headerShown = {false}
      />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
    // <NavigationContainer>
    //  <Stack.Navigator>
    //    <Stack.Screen
    //       name="Home"
    //       component={Home}
    //     />
    //    {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
    //    </Stack.Navigator>
    // </NavigationContainer>
  );
};
export default StackComponent;