import React from 'react';
import {View, Text, Image, Button, TouchableOpacity, TextInput} from 'react-native';
import images from '../components/images';
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'SignUp'>;
  navigate: any;
};

const SignUp = () => {
  // const navigation = useNavigation<Props>();
  return(
    <View className = 'bg-LineBuddyGray h-full'>
      <View className = 'bg-white h-1/4 rounded-bl-[20px] rounded-br-[20px]'>
        <Image source = {images.LineBuddyBalloon} className='h-40 w-40 rotate-180 -top-20 -left-10'></Image>
        <Text className = 'text-center text-5xl font-bold text-LineBuddyBlue object-none absolute object-center top-32 left-10 inset-y-26'>Let's get started</Text>
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
            <TextInput className ='bg-white top-90 relative rounded-full h-11'/>
        </View>
      </View>
      <View className = '-inset-y-36'>
        <TouchableOpacity className = 'justify-center inset-x-10 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full'>
            <Text className = 'text-lg text-white text-center'>Sign Up</Text>
        </TouchableOpacity>
        <Text className = 'text-white text-center mt-4'>
            Already have an account? <Text className = 'text-LineBuddyBlue underline'>Log in</Text>
        </Text>
        
      </View>
    </View>
  )
};

export default SignUp;
