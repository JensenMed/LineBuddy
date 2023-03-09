import React, {useEffect, useState, useRef} from 'react'
import {StyleSheet, Text, View, PermissionsAndroid, Button, Platform, Alert} from 'react-native';


import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
// import Geolocation from '@react-native-community/geolocation';

const Search = () => {

  //init geolocation cordinates
  const[location, setLocation] = useState();

  //Creates Map
  const initMap = () => {
    // const 
  }

  // useEffect(() => {
  //   if (hasLocationPermission) {
  //     Geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log(position);
  //         },
  //         (error) => {
  //           // See error code charts below.
  //           console.log(error.code, error.message);
  //         },
  //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );
  //   }
  // })
  // console.log(Geolocation.getCurrentPosition)
  
  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.hasLocationPermission,
  //       {
  //         title: 'Cool Photo App Camera Permission',
  //         message:
  //           'Cool Photo App needs access to your camera ' +
  //           'so you can take awesome pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

  // useEffect(() => {
    

  // })

  const requestLocationPermission = async () => {

    // if (Platform.OS === 'ios') {
    //   Geolocation.setRNConfiguration({
    //     authorizationLevel: 'whenInUse'
    //   })

    //   Geolocation.requestAuthorization()
    //   // IOS permission request does not offer a callback :/
    //   return null
    // } else if (Platform.OS === 'android') {
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    //     )
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   }catch(e){
    //     console.log("kdskdjsj")
    //   }
    // Geolocation.requestAuthorization()
  

    // Geolocation.getCurrentPosition(info => console.log(info));
    // if(Platform.OS == 'ios'){
    //   console.log('djsdjks')
    // }else if(Platform.OS == 'android'){
    //   console.log('android')
    // }
  }

  // if (hasLocationPermission) {
    // Geolocation.getCurrentPosition(
    //     (position) => {
    //       console.log(position);
    //     },
    //     (error) => {
    //       // See error code charts below.
    //       console.log(error.code, error.message);
    //     },
    //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // );
  // }

  // useEffect(() => {
    // Geolocation.requestAuthorization()
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log(position);
  //     },
  //     (error) => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  // );
  // })


  const requestCameraPermission = async () => {

    // check permissions for Android devices
    if(Platform.OS == 'android'){

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
          
        } else {
          console.log('Camera permission denied');
        }
      } catch (e) {
        console.log("Error: " + e);
      }

    }
    // check permissions on IOS devices
    if(Platform.OS == 'ios'){
        try{
          const grantedIOS = await Geolocation.requestAuthorization("whenInUse");
          if (grantedIOS === 'granted') {
            Geolocation.getCurrentPosition(
              (position) => {
                console.log(position);
              },
              (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
          } else {
            console.log('Camera permission denied');
          }
        }catch(e){
          console.log("Error: " + e)
        }
    
    }
}



  return (

    
    <View className = "h-screen w-screen">
      {/* <Text>Hello</Text> */}
      {/* <GooglePlacesAutocomplete
       placeholder="Type a place"
       onPress={(data, details = null) => console.log(data, details)}
       query={{key: 'AIzaSyBK8hTEOjILN7q70ARVrHMIflOXHSJs1J4'}}
       fetchDetails={true}
       onFail={error => console.log(error)}
       onNotFound={() => console.log('no results')}
       currentLocation={true}
       currentLocationLabel="Your location!" // add a simple label
      /> */}
      {/* <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
      currentLocation={true}
      currentLocationLabel='Current location'
    /> */}
    <View className = 'h-40 justify-center top-20'>
      <Button title='press me' onPress={requestCameraPermission}></Button>

    </View>
      

      

{/* <GooglePlacesAutocomplete
      apiKey="AIzaSyBK8hTEOjILN7q70ARVrHMIflOXHSJs1J4"
    /> */}
      
      {/* <MapView

  style={styles.map}

  initialRegion={{
    latitude: 42.9851,
    longitude: -81.2429,
    latitudeDelta: 0.04,
    longitudeDelta: 0.20,
  }}
/> */}
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