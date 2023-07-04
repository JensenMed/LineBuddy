import React, {useState} from 'react';
import {View, Text, Image, Button, TouchableOpacity, TextInput, Alert} from 'react-native';
import images from '../components/images';
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'LogIn'>;
  navigate: any;
};

const SignUp = () => {
  // Sets user password
  const[password, setPassword] = useState();
  const[isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation<Props>();

  const handleSave = () => {

    try{
      if (password.length < 4) {
        Alert.alert("Your password needs a minimum of four characters")
      } else if (password.search(/[a-z]/) < 0) {
        Alert.alert("Your password needs a lower case letter")
      } else if(password.search(/[A-Z]/) < 0) {
        Alert.alert("Your password needs an upper case letter")
      } else if (password.search(/[0-9]/) < 0) {
        Alert.alert("Your password needs a number")
      } else if (password.search(/[,!,%,^,&,*,),*,@,(,]/) < 0) {
        Alert.alert("Your password needs at least one of these !,%,^,&,*,),*,@,( special characters");
      } else {
        Alert.alert("Test")
        // add password to database but first check if email alreday exists and does not belong to same user
      }
    }catch(error){
      Alert.alert("Please make sure your password inludes the following. Password length must be at least 4 characters long, includes a lower case letter, inludes a upper case letter, includes a number and finally one of the following special charcters [,!,%,^,&,*,),*,@,(,] ")
    }


  }


  return(
    <View className = 'bg-LineBuddyGray h-full'>
      <View className = 'bg-white h-1/4 rounded-bl-[20px] rounded-br-[20px]'>
        <Image source = {images.LineBuddyBalloon} className='h-40 w-40 rotate-180 -top-20 -left-10'></Image>
        <Text className = 'text-5xl font-bold text-LineBuddyBlue flex text-center -top-1/4'>Let's get started</Text>
      </View>

      <View className ='h-2/3 w-4/5 relative inset-x-10 inset-y-12' >
        <View className= 'inset-y-10 relative mb-6'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Name</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11'/>
        </View>
        <View className= 'inset-y-10 relative mb-6'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Email</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11'/>
        </View>
        <View className = 'inset-y-10 relative'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Password</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11' value ={password} onChangeText={setPassword}/>
        </View>
        <View className = "relative inset-y-16 p-1">
          <CheckBox
          className = "h-8 w-8 bg-white"
            onValueChange={() => setIsAdmin(!isAdmin)}
            value={isAdmin}
          />
          <Text className = "text-xl text-white -inset-y-7 inset-x-12 font-bold">User is an Admin</Text>
        </View>
      </View>
      <View className = '-inset-y-24'>
        <TouchableOpacity className = 'justify-center inset-x-10 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full' onPress={() => handleSave()}>
            <Text className = 'text-lg text-white text-center'>Sign Up</Text>
        </TouchableOpacity>
        <Text className = 'text-white text-center mt-4'>
            Already have an account? <TouchableOpacity onPress = {() => navigation.navigate("LogIn")}><Text className = 'text-LineBuddyBlue underline text-align top-1'> Log in</Text></TouchableOpacity>
        </Text>
        
      </View>
    </View>
  )
};

export default SignUp;
