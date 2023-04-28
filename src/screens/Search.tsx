import React, {useEffect, useState, useRef} from 'react'
import {StyleSheet, Text, View, PermissionsAndroid, Button, Platform, Alert, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
// import REACT_APP_API_KEY from '.env'
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'expo-checkbox';
import axios from 'axios';
import Autocomplete from 'react-native-autocomplete-input'
// import Placesearch from 'react-native-placesearch';
import MapView, { Marker } from "react-native-maps";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Geolocation from '@react-native-community/geolocation';
import Triangle from 'react-native-triangle';

// interface nearbyPlacesNames ={
//   nearbyPlacesNames: string[];
// }

// type 


const Search = () => {
  // const latitude = 37.773972;
  // const longitude = -122.431297;
  let radius = 50000;


  // const url =
  // "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=" + radius + "&key=" +









  //Users latitude information
  const[userLatitude, setuserLatitude] = useState();
  //Users longitude information
  const[userLongitude, setUserLongitude] = useState();
  // Nearby places objects
  let nearbyPlacesObjs = [];
  // let nearbyPlacesNames = [];
  // Nearby places object names used for search
  let nearbyPlacesNames: never[] = [];
  // console.log(process.env.REACT_APP_API_KEY);

  // const[buttonPressed, setButtonPressed] = useState();

  //Places selcted by user from list
  let placesSelectedArr = []
  const [placesSelected, setPlacesSelected] = useState([]);
  
  const[mapOpened, setMapOpened] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});

  const requestPermissions = async () => {
    // Check permissions for Android devices
    if (Platform.OS == 'android') {
      try {
        // Checks if permissions for geolocation are granted
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        // If permissions are granted then grab users latitude and longitude
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              // Sets the latitude and longitude
              // console.log(position.coords.latitude)
              setuserLatitude(position.coords.latitude);
              setUserLongitude(position.coords.longitude);
            },
            error => {
              // Permission was granted but there was an error retreiving data
              console.log(error.code, error.message);
            },
            // High accuracy on Android geolocation services enabled
            // {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
          return true;
        } else {
          // Permission denied
          console.log('Location permissions denied');
          return false;
        }
      } catch (e) {
        // There was an error requesting
        console.log('Error: ' + e);
        return false;
      }
    }
    // Check permissions on IOS devices
    if (Platform.OS == 'ios') {
      try {
        const grantedIOS = await Geolocation.requestAuthorization('always');
        // If gelocation is granted then gets user latitude and longitude
        if (grantedIOS === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              // Sets the latitude and longitude
              // console.log(position.coords.latitude)
              setuserLatitude(position.coords.latitude);
              setUserLongitude(position.coords.longitude);
            },
            error => {
              // Permission was granted but there was an error retreiving data
              console.log(error.code, error.message);
            },
            // High accuracy on Android geolocation services enabled
            // {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
          return true;
        } else {
          // Permission denied
          console.log('Location permissions denied');
          return false;
        }
      } catch (e) {
        // There was an error requesting
        console.log('Error: ' + e);
        return false;
      }
    }
  };
  const getPlacesData = async (url: string, i: number, idk: any[]) => {
    if (i >= 119) {
      console.log(nearbyPlacesNames)
      return i;
    } else {
      try {
        let a = 0
        let res = await axios.get(url)
        let nextPageUrl =
          res.data.serpapi_pagination.next +
        // Checks if there is a next page token
        if (nextPageUrl !== undefined) {
          while (a < res.data.local_results.length){
            // Add the results to the NeabyPlacesObj and nearbyPlacesNames array
            if ( res.data.local_results[a].title + " " + res.data.local_results[a].address != undefined ) {
              nearbyPlacesObjs.push(res.data.local_results[a]);
              nearbyPlacesNames.push(res.data.local_results[a].title + " " + res.data.local_results[a].address);
              i++;
              a++;
            }
            //Else the name is undefined and wont be added to the array
          }
          getPlacesData(nextPageUrl, i, idk);
        } else {
          return i;
        }
      } catch (e: any) {
        console.log(' Error: ' + e.message);
      }
    }
  }
  /**
   * Async function that fetches the nearby places Google API, that then adds the given information into the nearby
   * places object and nearby places name array.
   */
  const setPlacesView = async () => {
    // const url =
    //   'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
    //   userLatitude +
    //   ',' +
    //   userLongitude +
    //   '&radius=' +
    //   radius +
    //   '&key=' +
    //   '&type=bar' + 
    //   
    try {
      // let res = await axios.get(url);
      // let nextPageData = res.data.serpapi_pagination.next
      let idk = []
      let i = 0;
      let test = await getPlacesData(url, i, idk)
      // console.log(test);
      // let res = await axios.get(url);
      // let url2 = res.data.serpapi_pagination.next;
      // let i = 0;
      // while (i < res.data.local_results.length) {
      //   // Add nearby places object to component
      //   // nearbyPlacesObjs.push(res.data.results[i]);
      //   //Add nearby places by names to component
      //   nearbyPlacesNames.push(res.data.local_results[i].title + " " + res.data.local_results[i].address);
      //   i++;
      // }
    
      // let a = 0;
      // while (a < res2.data.local_results.length) {
      //   // Add nearby places object to component
      //   // nearbyPlacesObjs.push(res.data.results[i]);
      //   //Add nearby places by names to component
      //   nearbyPlacesNames.push(res2.data.local_results[a].title + " " + res2.data.local_results[a].address);
      //   a++;
      // }

      // console.log(nearbyPlacesNames)
      // const test = res.data.serpapi_pagination
      // let res2 = await axios.get(test);
      // console.log(res2.data.local_results);// figure out how to get next page token
      // let i = 0;
      // let idk = []
      // while(i < 60){
      // let test = await getPlacesData(url, i, idk);
      // console.log(nearbyPlacesNames)

      // console.log(process.env.REACT_APP_API_KEY)

      // console.log(test)
      // }
      //while look to traverse through
      // while (i < res.data.results.length) {
      //   // Add nearby places object to component
      //   nearbyPlacesObjs.push(res.data.results[i]);
      //   //Add nearby places by names to component
      //   nearbyPlacesNames.push(res.data.results[i].name);
      //   i++;
      // }
      
      // const test = ["dog"];
      // const test2 = ["cat"]
      // if(test == test2) {
      //   console.log("djsjhd")
      // }
    } catch (e) {
      console.log(e);
    }
  };
  /**
   * This function takes in user data and autocomplets the best results based on the given information
   * @param query passed in from user input to autcomplete specified locations
   */
  const findPlace = (query: string) => {
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, 'i');
      console.log(placesSelected)
      setFilteredPlaces(
        nearbyPlacesNames.filter(e => e.search(regex) >= 0), // fix regex expression to take special characters
      );
    } else {
      // If the query is null then return blank
      setFilteredPlaces([]);
    }
  };

  const selectedPlacesObj = (item : string) => {
    if(!placesSelected.includes(item)){
      setPlacesSelected([...placesSelected, item]);
    }
  }

  /**
   * UseEffect calls requestPermissions function that gets the user's geolocation. This information is then
   * used to determine nerby places called via the setPlacesView function.
   */
  useEffect(() => {
    if (requestPermissions()) {
      setPlacesView();
    }
    
  });
  return (
    <View className = "h-screen w-screen">
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 42.9851,
          longitude: -81.2429,
          latitudeDelta: 0.04,
          longitudeDelta: 0.2,
        }}
      >
        <Marker
        pinColor = {"purple"}
        coordinate={{latitude: 43.0096,longitude: -81.2737}}
        title={"title"}
        description={"description"}
        />
      </MapView>


      <View className= {mapOpened ? "h-3/4 bg-LineBuddyBlue rounded-t-lg bottom-0 inset-x-0 absolute": "h-16 bg-LineBuddyBlue rounded-t-lg bottom-0 inset-x-0 absolute"}>
        <TouchableOpacity onPress={() => setMapOpened(!mapOpened)}  className = "items-end p-2">
          <Triangle
           width={50}
           height={25}
           color={'#FFFFFF'}
           direction={mapOpened ? 'up' : 'down'}
          />
        </TouchableOpacity>
        {mapOpened && 
          <View className = "h-5/6">
            <Autocomplete
                className="top-0"
                data={filteredPlaces}
                flatListProps={{
                  keyExtractor: (_, idx) => idx,
                  renderItem: ({ item }) => <View className="h-20 p-2 bg-LineBuddyBlue flex border-solid border-LineBuddyBlue border-8"><Text className = "bg-white p-2 w-5/6 border-solid border-black border text-center font-bold drop-shadow-xl">{item}</Text><CheckBox
                  onValueChange={() => {selectedPlacesObj(item)}}// figure out how to get setselected value working
                  className = "bg-white self-end absolute top-5 right-5 p-3 border-solid border-black"// and y u cant pass value in through fucntio to change state
                  value={placesSelected.includes(item)}
                /></View> 
                }}
                // inputContainerStyle={styles.lists3}
                // listContainerStyle = {styles.lists2}
                
                onChangeText={(text) => findPlace(text)}
                placeholder="Enter the film title"
                // renderItem={({item}) => (
                //   <TouchableOpacity // fix up the the code and make it look pretty
                //     // onPress={() =>  {
                //     //   setSelectedValue(item);
                //     //   setFilteredPlaces([]);
                //     // }}>
                //     onPress={() => console.log("Kjdjks")}
                //     >
                //     {/* <Text className ="h-20">{item}</Text> */}
                //     {/* <Text className="h-10 p-3 w- bg-red-400">Hello</Text> */}
                //   </TouchableOpacity>
                // )}
                  />
        </View>
        }
      </View>


          


      


      {/* <View className= "h-20 bg-red-400 absolute top-20">
            <FlatList
            data = {filteredPlaces}
            renderItem={({item}) => <Text style={styles.lists3}>{item}</Text>}
            
            />
      </View> */}
      
    </View>
  );
};
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
  lists2:{
    backgroundColor:'#5CE1E6',
  },
  lists3:{
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor:'red',
    // height: 40
  },
  checkbox:{
    backgroundColor:'blue'
  },
  // container: {
  //   backgroundColor: '#F5FCFF',
  //   flex: 1,
  //   padding: 16,
  //   marginTop: 40,
  // },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },

})
export default Search


{/* <Autocomplete
                // className="top-0"
                data={filteredPlaces}
                // flatListProps={{
                //   keyExtractor: (_, idx) => idx,
                //   renderItem: ({ item }) => <View className="h-20 p-2 bg-LineBuddyBlue flex border-solid border-LineBuddyBlue border-8"><Text className = "bg-white p-2 w-5/6 border-solid border-black border text-center font-bold drop-shadow-xl">{item}</Text><CheckBox
                //   value={mapOpened}
                //   onValueChange={() => console.log("Heee")}// got it working with checkbox now make it looke prettier and fit in pop up
                //   className = "bg-white self-end absolute top-5 right-5 p-3 border-solid border-black"
                // /></View>,
                // }}
                // inputContainerStyle={styles.lists3}
                // listContainerStyle = {styles.lists2}
                
                onChangeText={(text) => findPlace(text)}
                placeholder="Enter the film title"
                renderItem={({item}) => (
                  <TouchableOpacity // fix up the the code and make it look pretty
                    onPress={() =>  {
                      console.log("mskdjsk")
                      setSelectedValue(item);
                      setFilteredPlaces([]);
                    }}>
                    <Text className ="h-20">{item}</Text>
                    {/* <Text className="h-10 p-3 w- bg-red-400">Hello</Text> */}
                //   </TouchableOpacity>
                // )}
                //   /> */}


{/* <View className= {mapOpened ? "h-3/4 bg-LineBuddyBlue rounded-t-lg bottom-0 inset-x-0 absolute": "h-16 bg-LineBuddyBlue rounded-t-lg bottom-0 inset-x-0 absolute"}>
        <TouchableOpacity onPress={() => setMapOpened(!mapOpened)}  className = "items-end p-2">
          <Triangle
           width={50}
           height={25}
           color={'#FFFFFF'}
           direction={mapOpened ? 'up' : 'down'}
          />
        </TouchableOpacity>
        {mapOpened && 
          <View className = "h-5/6">


            {/* <Autocomplete
              className="top-0 rounded-lg"
              data={filteredPlaces}
              onChangeText={(text) => findPlace(text)}
              placeholder="Enter a place..."
              renderItem={({item}) => (
                <TouchableOpacity // fix up the the code and make it look pretty
                  onPress={() => {
                    setSelectedValue(item);
                    setFilteredPlaces([]);
                  }}>
                  <Text className="h-20 absolute bg-red-400">{item}</Text>
                </TouchableOpacity>
              )}
            /> */}
      //     </View>
      //   }
      // </View> */}
