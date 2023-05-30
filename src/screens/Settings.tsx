import React, {useState} from 'react';
import {View, Text, Image, Button, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import images from '../components/images';
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
// import Slider from '@react-native-community/slider';
import SliderText from 'react-native-slider-text';
import { Slider } from 'react-native-elements';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'SignUp'>;
  navigate: any;
};

const Settings = () => {


  //value of slider
  const[sliderValue, setSliderValue] = useState();
  // final value of slider
  const[finalValue, setFinalValue] = useState();
  // const navigation = useNavigation<Props>();
  const [response, setResponse] = useState(null);
  const handleImages = async () => {
    var options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };

      ImagePicker.launchImageLibrary(options, (response) => {console.log(response)})
    // // const res = await launchImageLibrary(options?);
    // launchCamera
    // try{
    //     // const res = await launchImageLibrary(options?)
    //     launchImageLibrary(options, response => {
    //         console.log({ response }))

    // }catch(e){
    //     console.log(e)
    // }
  }

  return(
    <View className = 'bg-LineBuddyGray h-full'>
        <TouchableOpacity onPress={() => handleImages()}>
          <View className = "h-3/6 w-3/6 bg-white rounded-full inset-x-24 flex inset-y-20">
             <Image className = "h-3/6 w-3/6 relative inset-y-12 inset-x-12"source={images.CameraIcon}/>
            {/* <Text>Click me</Text> */}


          </View>
        </TouchableOpacity>

        <View className ='h-2/3 w-4/5 inset-x-10 -inset-y-32' >
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
      <View className ="h-1/2 w-screen absolute top-3/4">
        <View className ="pb-2">
        <TouchableOpacity className = 'justify-center inset-x-10 text-center bg-LineBuddyBlue w-4/5 h-16 rounded-full' onPress={() => setFinalValue(sliderValue)} >
            <Text className = 'text-lg text-white text-center'>Save</Text>
          </TouchableOpacity>

        </View>
        <View className ="pt-4">
        <TouchableOpacity className = 'justify-center inset-x-10 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full'>
          <Text className = 'text-lg text-white text-center'>Submit</Text>
        </TouchableOpacity>

        </View>

      </View>

     
      {/* <View className = "-inset-y-20 h-1/2 w-1/2 bg-red-400"> */}


      {/* </View> */}
      
        
    </View>
  )
};
const styles = StyleSheet.create({
  camera:{
    // display:'block',


  }

})
export default Settings;
