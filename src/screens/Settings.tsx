import React, {useState} from 'react';
import {View, Text, Image, Button, TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native';
import images from '../components/images';
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
// import Slider from '@react-native-community/slider';
import SliderText from 'react-native-slider-text';
import { Slider } from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-picker';

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
  // sets user profile picture
  const[profilePicture, setProfilePicture] = useState(null);
  // Sets user password
  const[password, setPassword] = useState();



  const handleSave = () => {

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
      // add password to database but first check if email alreday exists and does not belong to same user
    }


  }

  const handleImages = async () => {
    //Options to handle image data
    let options = {
      mediaType: 'photo',
      maxWidth: 50,
      maxHeight:50,
    };
    try {
      const result = await launchImageLibrary(options);
      setProfilePicture(result.assets);

    }catch(error){
      console.log(error);
    }
  }

  return(
    <View className = 'bg-LineBuddyGray h-full'>
        <TouchableOpacity onPress={() => handleImages()}>
          <View className = {profilePicture == null? "h-3/6 w-3/6 bg-white rounded-full inset-x-24 flex inset-y-20": "h-3/6 w-3/6 bg-transparent rounded-full inset-x-24 flex inset-y-20"} >
            {profilePicture && (profilePicture == null ? <Image className = "h-3/6 w-3/6 relative inset-y-12 inset-x-12" source={images.CameraIcon}/>:
            <Image className = "h-full w-full relative inset-y-0 inset-x-0 rounded-full" source={profilePicture}/>)}
          </View>
        </TouchableOpacity>

        <View className ='h-2/3 w-4/5 inset-x-10 -inset-y-32' >
        <View className= 'inset-y-10 relative mb-6'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Name</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11' placeholder=' Jensen Medeiros'/>
        </View>
        <View className= 'inset-y-10 relative mb-6'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Email</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11' placeholder=' ie., example@example.com'/>
        </View>
        <View className = 'inset-y-10 relative'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Password</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11' value ={password} onChangeText={setPassword} placeholder=' Password'/>
        </View>
      </View>
      <View className ="h-1/2 w-screen absolute top-3/4">
        <View className ="pb-2">
        <TouchableOpacity className = 'justify-center inset-x-10 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full' onPress={() => handleSave()} >
            <Text className = 'text-lg text-white text-center'>Save</Text>
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
