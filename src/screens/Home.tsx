import React from 'react';
import {Text, View, Image} from 'react-native';
import images from '../components/images';

/**
 * Home component for LineBuddy Welcome page
 * @returns Home component
 */
const Home = () => {
  return (
    <View>
      <View className="bg-white h-full">
        <Image className = "object-none object-center w-4/5 h-80 top-60 inset-x-10 " source= {images.LineBuddyIcon}></Image>
        <Text className = "text-7xl font-bold text-LineBuddyBlue object-none object-center inset-x-12 bottom-20 absolute">Welcome</Text>
      </View>
    </View>
  );
};
export default Home;
