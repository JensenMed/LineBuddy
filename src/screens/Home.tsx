import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import images from '../components/images';

/**
 * Home component for LineBuddy Welcome page
 * @returns Home component
 */



const Home = () => {

    let timerCounter = 0;
    let myTimer:any = null
    const [moveUp,setMoveUp] = useState("text-7xl font-bold text-LineBuddyBlue object-none object-center inset-x-12 bottom-24 absolute");


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
        <Image className="object-none object-center w-4/5 h-80 top-60 inset-x-10 animate-spin" source= {images.LineBuddyIcon}></Image>
        <Text className={moveUp}>Welcome</Text>
      </View>
    </View>
  );
};
export default Home;
