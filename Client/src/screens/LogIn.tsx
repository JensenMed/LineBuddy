import React, { useState } from 'react';
import {View, Text, Image, Button, TouchableOpacity, TextInput, Alert} from 'react-native';
import images from '../components/images';
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'LogIn'>;
  navigate: any;
};





const LogIn = () => {
  const navigation = useNavigation<Props>();
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const dbUrl = 'https://f1c2-2607-fea8-2b83-b500-350e-7f34-7ac-86ff.ngrok-free.app'


  const handleLogin = async (emailVal, passwordVal) => {
    try{
      //Check if email is in database and if so if the password is correct

      //Check to make sure user actually inputted something
      let emailValFormatted = emailVal.split(' ').join('')
      let passwordValFormatted = passwordVal.split(' ').join('')
      if(passwordValFormatted !== ''){
         //First check if user is in db
        if(emailValFormatted !== ''){
          const checkUser = await axios.get(dbUrl + '/api/' + emailVal)
          // If user is found then check is password is correct
          if(checkUser){

            // Now were going to check the password
            const userData = {email:emailValFormatted, password: passwordValFormatted}
            const checkUserPassword = await axios.post(dbUrl + '/verifyUser', {data: userData})
            
            if(checkUserPassword.data == true){
              //User has been validated now go to the search screen
              navigation.navigate('Search')
            }
            if(checkUserPassword.data == false){
              //User may have entered the wrong password or it just doesnt work
              Alert.alert('Attention!', 'The user could not be signed in at the moment. Please make sure your password is correct or try again later.')

            }


          }else{
            Alert.alert("Invalid email address")
          }

        }else{
          Alert.alert("Please input an email value")
        }
      }else {
        Alert.alert("Please input a password value")
      }

      //First check if user is in db
      
      // const checkUser = await axios.get(dbUrl + '/api/' + emailVal)
      // // If user is found then check is password is correct
      // if(checkUser){

      // }else{
      //   Alert.alert("Invalid email address")
      // }

    }catch(e){
      console.log(e)

    }
    


    

  }









  return(
    <View className = 'bg-LineBuddyGray h-full'>
      <View className = 'bg-white h-1/4 rounded-bl-[20px] rounded-br-[20px]'>
        <Image source = {images.LineBuddyBalloon} className='h-40 w-40 rotate-180 -top-20 -left-10'></Image>
        <Text className = 'text-5xl font-bold text-LineBuddyBlue flex text-center -top-1/4'>Login</Text>
      </View>

      <View className ='h-2/3 w-4/5 relative inset-x-10 inset-y-12' >
        <View className= 'inset-y-10 relative mb-6'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Email</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11' value={email} onChangeText={setEmail}/>
        </View>
        <View className = 'inset-y-10 relative'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Password</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11' value={password} onChangeText={setPassword}/>
        </View>
      </View>
      <View className = '-inset-y-52'>
        {/* <TouchableOpacity className = 'justify-center inset-x-10 text-center bg-LineBuddyBlue w-4/5 h-16 rounded-full' onPress={() => navigation.navigate('Search')}> */} 
        {/* When login is all good add this in to direct to Serach page */}
        <TouchableOpacity className = 'justify-center inset-x-10 text-center bg-LineBuddyBlue w-4/5 h-16 rounded-full' onPress={() => handleLogin(email, password)}>
            <Text className = 'text-lg text-white text-center'>Login</Text>
        </TouchableOpacity>
        <Text className = 'text-white text-center mt-4'>
            Don't have an Account? <TouchableOpacity onPress = {() => navigation.navigate("SignUp")}><Text className = 'text-LineBuddyPink underline text-align top-1'>Sign Up</Text></TouchableOpacity>
        </Text>
        
      </View>
    </View>
  )
};

export default LogIn;
