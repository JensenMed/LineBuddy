import React, {useState} from 'react';
import {View, Text, Image, Button, TouchableOpacity, StyleSheet} from 'react-native';
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

const Admin = () => {
  const navigation = useNavigation<Props>();

  //value of slider
  const[sliderValue, setSliderValue] = useState();
  // final value of slider
  const[finalValue, setFinalValue] = useState();
  // const navigation = useNavigation<Props>();
  return(
    <View className = 'bg-LineBuddyGray h-full'>
      <View className = 'bg-white h-2/6 rounded-bl-[20px] rounded-br-[20px]'>
        <Image source = {images.LineBuddyBalloon} className='h-40 w-40 rotate-180 -top-20 left-3/4'></Image>
        <Text className = 'text-7xl font-bold text-LineBuddyBlue flex text-center -top-1/4'>Admin</Text>
        <TouchableOpacity className = "z-10 h-10 w-1/6 bg-black rounded-r-md justify-center absolute" onPress ={() => navigation.navigate('Search', {isAdminValue:true})}>
          <Text className="text-center font-bold text-white">Back</Text>
        </TouchableOpacity>
      </View>
      <View className="h-20 inset-y-8">
        <Text className ="text-center text-xl text-LineBuddyPink font-bold">Jacks bar and Grill</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        trackStyle={{backgroundColor: '#000000' }}
        step = {1}
        thumbStyle={{ height: 25, width: 25}}
        value = {sliderValue}
        onValueChange={
          (sliderValue) => setSliderValue(sliderValue)
        }
        thumbTintColor = "#FFFFFF"
        />
        <Text className = "inset-x-4 inset-y-14 text-lg flex text-left text-white">Not Busy</Text>
        <Text className = "-inset-x-4 inset-y-6 text-lg text-right flex text-white">Very Busy</Text>
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
export default Admin;
