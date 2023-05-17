import React from 'react';
import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import images from '../components/images';
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'SignUp'>;
  navigate: any;
};

const Admin = () => {
  // const navigation = useNavigation<Props>();
  return(
    <View className = 'bg-LineBuddyGray h-full'>
      <View className = 'bg-white h-2/6 rounded-bl-[20px] rounded-br-[20px]'>
        <Image source = {images.LineBuddyBalloon} className='h-40 w-40 rotate-180 -top-20 -left-10'></Image>
        <Text className = 'text-7xl font-bold text-LineBuddyBlue object-none object-center absolute inset-x-2/6 top-32 left-10 justify-items-center'>Admin</Text>
      </View>

      <Slider
        style={{width: 200, height: 40, top:40, left: 80}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        />

      <TouchableOpacity className = 'inset-y-40 justify-center inset-x-10 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full'>
        <Text className = 'text-lg text-white text-center'>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity className = 'inset-y-48 justify-center inset-x-10 text-center bg-LineBuddyBlue w-4/5 h-16 rounded-full'>
        <Text className = 'text-lg text-white text-center'>Submit</Text>
      </TouchableOpacity>
      
        
    </View>
  )
};

export default Admin;
