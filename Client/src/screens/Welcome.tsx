import React from 'react';
import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import images from '../components/images';
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'Welcome'>;
  navigate: any;
};

const Welcome = () => {
  const navigation = useNavigation<Props>();
  return(
    <View className = 'bg-LineBuddyGray h-full'>
      <View className = 'bg-white h-2/6 rounded-bl-[20px] rounded-br-[20px]'>
        <Image source = {images.LineBuddyBalloon} className='h-40 w-40 rotate-180 -top-20 -left-10'></Image>
        <Text className = 'text-7xl font-bold text-LineBuddyBlue object-none object-center absolute inset-x-2/6 top-32 left-10'>Welcome</Text>
      </View>
      <Text className = 'text-white text-center text-lg inset-y-14'>LineBuddy is the best way to skip the line without paying a cent. Search for you favorite place and you’ll never be waiting in line ever again.</Text>
      <TouchableOpacity className = 'inset-y-40 justify-center inset-x-10 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full' onPress={() => navigation.navigate('SignUp')}>
        <Text className = 'text-lg text-white text-center'>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity className = 'inset-y-48 justify-center inset-x-10 text-center bg-LineBuddyBlue w-4/5 h-16 rounded-full' onPress={() => navigation.navigate('LogIn')}>
        <Text className = 'text-lg text-white text-center'>Sign In</Text>
      </TouchableOpacity>
      
        
    </View>
  )
};

export default Welcome;
