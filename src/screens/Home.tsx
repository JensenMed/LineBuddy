import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, Animated, Button} from 'react-native';
import images from '../components/images';
// import { Keyframe } from 'react-native-reanimated'
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';

// type StackParamList = {
//   Home: { foo: string, onBar: () => void }
//   About: 
// }

// type NavigationProps = StackNavigationProp<StackParamList>

;


type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'Home'>;
  navigate: any;
};
/**
 * Home component for LineBuddy Welcome page
 * @returns Home component
 */


const Home = () => {
  // const navigation = useNavigation<Props>();
  // const keyframe = new Keyframe({
  //   from: {
  //     transform: [{ rotate: '0deg' }],
  //   },
  //   to: {
  //     transform: [{ rotate: '45deg' }],
  //   },
  // })

    


  
    let timerCounter = 0;
    let myTimer:any = null
    const [moveUp,setMoveUp] = useState("text-7xl font-bold text-LineBuddyBlue object-none object-center inset-x-12 bottom-24 absolute");
    // 


    // function that moves up Welcome text after a certain time
    const moveText = () => {

      if(timerCounter < 5){
        timerCounter ++;
        console.log("dkjskdjsdskj")
      }else{
        console.log("dkjddd")
        // setMoveUp("text-7xl font-bold text-LineBuddyBlue object-none object-center inset-x-12 transition-color bottom-24 absolute")
        clearInterval(myTimer)
      }
    }

    // myTimer = setInterval(moveText, 1000);
  


    // let myVar = setInterval(myTimer, 1000);
    // function myTimer() {
    // const d = new Date();
    // console.log("dkjskdksj");
    // }

    // useEffect(() => {
      // if(timerCounter < 5){
      //   let myTimer = setInterval(moveText
      // }
    
    // })


  return (
    <View>
      <View className="bg-white h-full">
        <Image  className="object-none object-center w-4/5 h-80 top-60 inset-x-10 animate-spin" source= {images.LineBuddyIcon}></Image>
        <Animated.Text  className={moveUp}>Welcome</Animated.Text>
        <Button title='nextButton' ></Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  test:{
    // animation: [heartbeat 1s infinite]
    // @keyframes example {[ 0%   {background-color:red; left:0px; top:0px;}
    //   25%  {background-color:yellow; left:200px; top:0px;}
    //   50%  {background-color:blue; left:200px; top:200px;}
    //   75%  {background-color:green; left:0px; top:200px;}
    //   100% {background-color:red; left:0px; top:0px;}]
    // }

  }

})
export default Home;
