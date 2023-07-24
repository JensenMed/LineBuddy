import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button, TouchableOpacity, StyleSheet, TextInput, PermissionsAndroid, Platform, Alert, SafeAreaView,FlatList} from 'react-native';
import images from '../components/images';
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
// import Slider from '@react-native-community/slider';
import SliderText from 'react-native-slider-text';
import { Slider } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input'
// import REACT_APP_API_KEY from '.env'
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'expo-checkbox';
import axios from 'axios';
// import Placesearch from 'react-native-placesearch';
import MapView, { Marker } from "react-native-maps";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Geolocation from '@react-native-community/geolocation';
import Triangle from 'react-native-triangle';


type Props = {
  navigation: NativeStackNavigationProp<StackParamList, "Admin Settings">;
  navigate: any;
};

const Admin_Settings = ({route}) => {

  const navigation = useNavigation<Props>();

  //Value if user selects business they own.
  const[businessSelected, setBusinessSelected] = useState([]);

  // value if user selects a business they own boolean
  // const[usersBusiness, setUsersBusiness] = useState(false)
  const{usersBusinessVal, busyValue} = route.params
  // if(usersBusinessVal === undefined){
  //   console.log("kkkkk")
  // }
  // console.log(usersBusinessVal)
  console.log(busyValue)
  //value of slider
  const[sliderValue, setSliderValue] = useState();
  // final value of slider
  const[finalValue, setFinalValue] = useState();
  // const navigation = useNavigation<Props>();
  
  
  // if(usersBusiness !== undefined){
    // const{usersBusinessVal} = route.params
    // console.log(usersBusinessVal)
  // }

  //businesPage opened
  const[pageOpened, setPageOpened] = useState(false);


  //Handles pop up when user clicks on setting business
   const handleClick = () => {
    setPageOpened(true)
   }

   useEffect(() => {
    console.log(businessSelected)
    // console.log(setUsersBusiness)

   }, [businessSelected])
  return(
    <View className = 'bg-LineBuddyGray h-full'>

     {/* When they clicj button will tak ethem to Search Admin page where they will fill out their business info and data */}

      {/* {pageOpened &&<View className = 'bg-LineBuddyGray h-full'>


        
        
        </View>} */}

      <View className = 'bg-white  rounded-bl-[20px] rounded-br-[20px]'>
        <Image source = {images.LineBuddyBalloon} className='h-40 w-40 rotate-180 -top-20 left-3/4'></Image>
        <Text className = 'text-7xl font-bold text-LineBuddyBlue flex text-center -top-1/4'>Admin</Text>
        <TouchableOpacity className = "z-10 h-10 w-1/6 bg-black rounded-r-md justify-center absolute" onPress ={() => navigation.navigate('Search', {isAdminValue: true})}>
          <Text className="text-center font-bold text-white">Back</Text>
        </TouchableOpacity>
      </View>
      <View>

      <View>
        {usersBusinessVal !== undefined &&  <View><TouchableOpacity onPress={() => navigation.navigate('Admin', {usersBusinessVal:usersBusinessVal})} className="justify-center bg-LineBuddyBlue rounded-full h-12 inset-y-3 w-3/4 flex items-center inset-x-12 ">
            <Text className="text-white text-center text-lg">Edit your business</Text>
          </TouchableOpacity>
          <Text className = "text-white text-lg font-bold flex text-center inset-y-6">Your business has been selected.</Text></View>}
          {usersBusinessVal === undefined && <View><TouchableOpacity onPress={() => navigation.navigate('Search Admin')} className="justify-center bg-LineBuddyPink rounded-full h-12 inset-y-6 w-3/4 flex items-center inset-x-12 z-20">
            <Text className="text-white text-center text-lg">Please select your business</Text>
          </TouchableOpacity></View>}
        </View>
      </View>

      <View className ='h-2/3 w-4/5 inset-x-10 -inset-y-4' >
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



     

      <TouchableOpacity className = 'inset-y-32 justify-center inset-x-10 text-center bg-LineBuddyBlue w-4/5 h-16 rounded-full' onPress={() => setFinalValue(sliderValue)}>
        <Text className = 'text-lg text-white text-center'>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity className = 'inset-y-28 justify-center inset-x-10 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full'>
        <Text className = 'text-lg text-white text-center'>Submit</Text>
      </TouchableOpacity>
 
        {/* <Text className ="text-center text-2xl text-white font-bold">Jacks bar and Grill</Text> */}

        {/* {pageOpened && 
        <View className ="h-screen bg-white w-screen">


        
        
        </View>} */}
  


      

      
        
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
