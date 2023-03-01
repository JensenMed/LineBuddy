import React from 'react'
import {StyleSheet, Text, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const Search = () => {
  return (
    <View className = "h-screen w-screen">
      
      <MapView

  style={styles.map}

  initialRegion={{
    latitude: 42.9851,
    longitude: -81.2429,
    latitudeDelta: 0.04,
    longitudeDelta: 0.20,
  }}
/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 500,
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

})
export default Search