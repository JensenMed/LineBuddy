import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button, TouchableOpacity, TextInput, Alert} from 'react-native';
import images from '../components/images';
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import axios from 'axios';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'LogIn'>;
  navigate: any;
};

const SignUp = () => {
  // use own adrress not adress if emulator settings-> wifi 
  // const dbUrl = 'http://192.168.86.38:3000'
  const dbUrl = 'https://b989-2607-fea8-2b83-b500-b9e8-6c45-ea2f-a66.ngrok-free.app'
  // Sets user password
  const[password, setPassword] = useState();
  const[isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation<Props>();
  const[email, setEmail] = useState('')
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('')
  // const auth = require('connect-auth')



  const checkPassword = (passwordValue) => {

    if (passwordValue.length < 4) {
      Alert.alert("Your password needs a minimum of four characters")
      return false;
    } else if (passwordValue.search(/[a-z]/) < 0) {
      Alert.alert("Your password needs a lower case letter")
      return false;
    } else if(passwordValue.search(/[A-Z]/) < 0) {
      Alert.alert("Your password needs an upper case letter")
      return false;
    } else if (passwordValue.search(/[0-9]/) < 0) {
      Alert.alert("Your password needs a number")
      return false;
    } else if (passwordValue.search(/[,!,%,^,&,*,),*,@,(,]/) < 0) {
      Alert.alert("Your password needs at least one of these !,%,^,&,*,),*,@,( special characters");
      return false;
    } else if (passwordValue.includes(' ')) {
      Alert.alert("Your password cannot contain any whitespace");
      return false;
    }else if (passwordValue.length > 16) {
      Alert.alert("Your password cannot be greater than 15 characters");
      return false;
    }else {
      return true;
    }

    
  }
  // const handleStuff = async () => {
  //   try{
  //     // let test = 'mongodb://127.0.0.1:27017'
  //     const res = await axios.get("http://192.168.86.38:3000/api/4")
  //     console.log(res.data)
  
  //   }catch(e){
  //     console.log(e)
  //   }
  // }

  const handleMove = async (emailVal, passwordVal, isAdminVal, formattedFirstName, formattedLastName) => {
      try{

        const newUserData = { 
          firstName: formattedFirstName,
          lastName:formattedLastName,
          email: emailVal,
          password: passwordVal,
          isAdmin: isAdminVal}
      const addUser = await axios.post(dbUrl + '/addUser', {data : newUserData})
      if(addUser.data == false){
        Alert.alert('Attention', 'The user could not be added at this time. Please try again later.')
      }


      }catch(e){
        console.log(e)

      }




  }


  const handleSave = async (emailVal, passwordVal, isAdminVal, firstNameVal, lastNameVal) => {

      try{
        // const [continueForward, setContinueForward] = useState(false)
        // console.log(emailVal)
        // const res = await axios.get('https://2211-2607-fea8-2b83-b500-6414-9b66-6e28-82e0.ngrok-free.app/api/jensenmed2@gmail.com')
        // console.log("pppp")
        // console.log("Hello")
        // console.log(JSON.stringify(res.data))
      
        // var config = {
        //   method: 'get',
        //   url: 'https://2211-2607-fea8-2b83-b500-6414-9b66-6e28-82e0.ngrok-free.app/api/jensenmed2@gmail.com',
        //   headers: { }
        // };
        // axios.defaults.h

    

        // First will check if the email the user entered is valid then will check the database to see if that email alreday exist
        let userInDb = false;
        let validPassword = false;
        // Regex expression to chck if email is valid 
        let isValidEmail = emailVal.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if(isValidEmail !== null){
          //Check if user in database
          const res = await axios.get(dbUrl + '/api/' + emailVal)
          if(res.data){
            userInDb = true
            Alert.alert("This user is alreday in use")
          }else{
            validPassword = checkPassword(passwordVal)
            //Will check if they have a valid password
            if(validPassword){

              // if the user meets all critea then they will be aded into the database
              if(validPassword && res.data == false && isValidEmail){

                //Check if first name and last name are not null

                //First check first name
                if(firstNameVal.includes(' ')){
                  Alert.alert("Please remove any whitespace characters")
                }else{
                  let formattedFirstName = firstNameVal.split(' ').join('')
                  if(formattedFirstName == ''){
                    Alert.alert("Please enter your first name")
                  }else{

                    // Now check if last name is Good

                    if(lastNameVal.includes(' ')){
                      Alert.alert("Please remove any whitespace characters")
                    }else{
                      let formattedLastName = lastNameVal.split(' ').join('')
                      if(formattedLastName == ''){
                        Alert.alert("Please enter your last name")
                      }else{
                        if(isAdminVal == false){
                          Alert.alert('Attention', 'You will not be able to change your Admin value prior to this!', [
                            {
                              text: 'Cancel',
                              onPress: () => {},
                              style: 'cancel',
                            },
                            {text: 'OK', onPress: () =>  handleMove(emailVal, passwordVal, isAdminVal, formattedFirstName, formattedLastName)},
                          ]);


                        }else{
                          handleMove(emailVal, passwordVal, isAdminVal, formattedFirstName, formattedLastName)

                        }
                      }
                    } 

                  }
                } 
                // let formattedFirstName = firstNameVal.split(' ').join('')
                // if(formattedFirstName == ''){
                //   console.log("dhjsjdks")
                // }
                // try{

                // }catch(err){
                //   Alert.alert("Failed to add user t")
                // }

                // Check
                // const newUserData = { 
                // Name: "Jensen",
                // Email: emailVal,
                // Password: passwordVal}

                // const addUser = await axios.post(dbUrl + '/addUser', {data : newUserData})
                // console.log(addUser)

              }

            }

          }
        }else{
          Alert.alert("Invalid email")
        }
        

        //Check Password

        // if(validPassword && isValidEmail && res.data)
        // Add user in database with password and if they are an admin
        // let addUser = await axios.post(dbUrl + '
    


    }catch(err){
      console.log(err)
    }
  }
//   useEffect(() => {
//     handleStuff()
//     // try{
//     //   fetch("/api").then(
//     //     response => response.json()
//     //     ).then(
//     //       data =>{
//     //         console.log(data)
//     //       } 
//     //     )
//     // }catch(e){
//     //   console.log(e)
//     // }

// }, [])


  //to verufy that user is admin check to make sure that after te @ there is no gmail, yahoo, outlook.. etc

  return(
    <View className = 'bg-LineBuddyGray h-full'>
      <View className = 'bg-white h-1/4 rounded-bl-[20px] rounded-br-[20px]'>
        <Image source = {images.LineBuddyBalloon} className='h-40 w-40 rotate-180 -top-20 -left-10'></Image>
        <Text className = 'text-5xl font-bold text-LineBuddyBlue flex text-center -top-1/4'>Let's get started</Text>
      </View>

      <View className ='h-2/3 w-4/5 relative inset-x-10 inset-y-0' >
        <View className= 'inset-y-10 relative mb-6'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>First Name</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11' value={firstName} onChangeText={setFirstName}/>
        </View>
        <View className= 'inset-y-10 relative mb-6'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Last Name</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11' value={lastName} onChangeText={setLastName}/>
        </View>
        <View className= 'inset-y-10 relative mb-6'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Email</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11' value ={email} onChangeText={setEmail}/>
        </View>
        <View className = 'inset-y-10 relative'>
            <Text className= 'inset-x-0.5 left-2 text-sm text-white text-left mb-0.5'>Password</Text>
            <TextInput className ='bg-white top-90 relative rounded-full h-11' value ={password} onChangeText={setPassword}/>
        </View>
        <View className = "relative inset-y-16 p-1">
          <CheckBox
          className = "h-8 w-8 bg-white"
            onValueChange={() => { {isAdmin ? setIsAdmin(!isAdmin):  Alert.alert('Attention', 'This is reserved for business owners only!! You will be asked to verify your business prior to business advertising', [
              {
                text: 'Cancel',
                onPress: () => {setIsAdmin(false)},
                style: 'cancel',
              },
              {text: 'OK', onPress: () =>  setIsAdmin(true)},
            ]);}}
             }
            value={isAdmin}
          />
          <Text className = "text-xl text-white -inset-y-7 inset-x-12 font-bold">User is an Admin</Text>
        </View>
      </View>
      <View className = '-inset-y-24'>
        {/* add this value in after on press navigation.navigate("Search", {isAdminValue:isAdmin})} */}
        <TouchableOpacity className = 'justify-center inset-x-10 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full' onPress={() => {handleSave(email, password, isAdmin, firstName, lastName)}}>
            <Text className = 'text-lg text-white text-center'>Sign Up</Text>
        </TouchableOpacity>
        <Text className = 'text-white text-center mt-4'>
            Already have an account? <TouchableOpacity onPress = {() => navigation.navigate("LogIn", {isAdmin})}><Text className = 'text-LineBuddyBlue underline text-align top-1'> Log in</Text></TouchableOpacity>
        </Text>
        
      </View>
    </View>
  )
};

export default SignUp;
