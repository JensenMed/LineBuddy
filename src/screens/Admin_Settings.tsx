import React, {useState} from 'react';
import {View, Text, Image, Button, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import images from '../components/images';
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
// import Slider from '@react-native-community/slider';
import SliderText from 'react-native-slider-text';
import { Slider } from 'react-native-elements';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'SignUp'>;
  navigate: any;
};

const Admin_Settings = () => {

  //value of slider
  const[sliderValue, setSliderValue] = useState();
  // final value of slider
  const[finalValue, setFinalValue] = useState();
  // const navigation = useNavigation<Props>();
  return(
    <View className = 'bg-LineBuddyGray h-full'>
      <View className = 'bg-white h-2/6 rounded-bl-[20px] rounded-br-[20px]'>
        <Image source = {images.LineBuddyBalloon} className='h-40 w-40 rotate-180 -top-20 -left-10'></Image>
        <Text className = 'text-7xl font-bold text-LineBuddyBlue flex text-center -top-1/4'>Admin</Text>
      </View>
      <View className="h-20 inset-y-8">
        <Text className ="text-center text-2xl text-white font-bold">Jacks bar and Grill</Text>
      </View>



      <View className ='h-2/3 w-4/5 inset-x-10 -inset-y-12' >
        <View className= 'inset-y-10 relative mb-4'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Name</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11'/>
        </View>
        <View className= 'inset-y-10 relative mb-4'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Email</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11'/>
        </View>
        <View className = 'inset-y-10 relative'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Password</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11'/>
        </View>
      </View>
      <View className ="h-1/2 w-screen absolute top-3/4">
        <View className ="pb-2">
        <TouchableOpacity className = 'justify-center inset-x-10 text-center bg-LineBuddyBlue w-4/5 h-16 rounded-full' onPress={() => setFinalValue(sliderValue)} >
            <Text className = 'text-lg text-white text-center'>Save</Text>
          </TouchableOpacity>

        </View>
        <View className ="pt-2">
        <TouchableOpacity className = 'justify-center inset-x-10 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full'>
          <Text className = 'text-lg text-white text-center'>Submit</Text>
        </TouchableOpacity>

        </View>

      </View>



     

      <TouchableOpacity className = 'inset-y-40 justify-center inset-x-10 text-center bg-LineBuddyBlue w-4/5 h-16 rounded-full' onPress={() => setFinalValue(sliderValue)}>
        <Text className = 'text-lg text-white text-center'>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity className = 'inset-y-48 justify-center inset-x-10 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full'>
        <Text className = 'text-lg text-white text-center'>Submit</Text>
      </TouchableOpacity>
      
        
    </View>
  )
};
const styles = StyleSheet.create({
  slider:{
    width: '70%',
    height: 40, 
    top: 40,
    flex: 1,
    left:'14%',
    justifyContent: 'center',
  }

})
export default Admin_Settings;
