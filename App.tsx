import React from 'react';
import Component from './src/Component';
import {View} from 'react-native';
import StackComponent from './src/StackComponent';

/**
 * 
 * @returns App component
 */
function App(){
  return (
    <View>
      <StackComponent/>
    </View>
  );
}

export default App;
