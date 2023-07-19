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
import { StackParamList } from '../StackComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// interface nearbyPlacesNames ={
//   nearbyPlacesNames: string[];
// }

// type 
type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'Search'>;
  navigate: any;
};


const Search = ({route}) => {
  const latitude = 37.773972;
  const longitude = -122.431297;
  let radius = 50000;
  const navigation = useNavigation<Props>();
  const {isAdminValue} = route.params


  // const url =
  // "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=" + radius + "&key=" + "0392bce78e57034b952f3a6794f83f78e5b0b38a9feabafa226bebd72f275fb7"

  // const url = "https://serpapi.com/search.json?engine=google_maps" + "&q=pizza" + "&ll=@" + latitude + ","+ "-" + longitude + ",15.1z" + "&type=search" + "&api_key=" + "0392bce78e57034b952f3a6794f83f78e5b0b38a9feabafa226bebd72f275fb7"
  


  //Sets place type
  const placeType = ['pizza','coffee']
  const placeTypeObj = [{'name': 'pizza', 'selected':'false'}, {'name':'coffee', 'selected':'false'}]
  const [placesTypeSelectedObj, setTypePlacesSelectedObj] = useState([{name: 'pizza', selected:'false'}, {name:'coffee', selected:'false'}])
  //sets query type for api
  const[queryType, setQueryType] = useState();

  const[placeTypeValue, setPlaceTypeValue] = useState([]);
  const[selectedType, setSelectedPlaceType] = useState([])

  // Sets if user selects if settings is opened
  const [settingsOpened, setSettingsOpened] = useState(false);
  //Selected places marker
  const[markers, setMarkers] = useState([])

  //selected places array us
  let selectedPlacesArray: { name: string; selected: boolean; }[] = []

  // selected places when user selecets a places to be put onto map
  const[selectedPlaces, setSelectedPlaces] = useState([])

  //Users latitude information
  const[userLatitude, setuserLatitude] = useState();
  //Users longitude information
  const[userLongitude, setUserLongitude] = useState();
  // Nearby places objects
  let nearbyPlacesObjs = [];
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

  // const url = 'https://serpapi.com/search.json?engine=google_maps&q=pizza&ll=@42.9849,-81.2453,15.1z&type=search&api_key=0392bce78e57034b952f3a6794f83f78e5b0b38a9feabafa226bebd72f275fb7'
  

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
              setuserLatitude(position.coords.latitude);
              setUserLongitude(position.coords.longitude);
            },
            error => {
              // Permission was granted but there was an error retreiving data
              console.log(error.code, error.message);
            },

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
              setuserLatitude(position.coords.latitude);
              setUserLongitude(position.coords.longitude);
            },
            error => {
              // Permission was granted but there was an error retreiving data
              console.log(error.code, error.message);
            },
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
  const getPlacesData = async (url: string, i: number) => {
    console.log("kkkkk;;")
    if (i >= 119) {
      return i;
    } else {
      try {
        console.log("jjjj")
        let a = 0;
        console.log(url)
        let res = await axios.get(url);
        console.log("jjjj22")
        let nextPageUrl = res.data.serpapi_pagination.next + '&api_key=0392bce78e57034b952f3a6794f83f78e5b0b38a9feabafa226bebd72f275fb7';
        console.log("hhhh")

        // Checks if there is a next page token
        if (nextPageUrl !== undefined) {
          // console.log("djkskdjd")
          while (a < res.data.local_results.length){
            // Add the results to the NeabyPlacesObj and nearbyPlacesNames array
            if (
              res.data.local_results[a].title +
                ' ' +
                res.data.local_results[a].address !=
              undefined
            ) {
              nearbyPlacesObjs.push(res.data.local_results[a]);
              nearbyPlacesNames.push(
                res.data.local_results[a].title +
                  ' ' +
                  res.data.local_results[a].address,
              );
              let newPlace = {
                name:
                  res.data.local_results[a].title +
                  ' ' +
                  res.data.local_results[a].address,
                selected: false,
              };
              selectedPlacesArray.push(newPlace);
              i++;
              a++;
            }
            //Else the name is undefined and wont be added to the array
          }
          getPlacesData(nextPageUrl, i);
        } else {
          return i;
        }
      } catch (e: any) {
        console.log("hhhhllll")
        console.log(' Error: ' + e.message);
      }
    }
  };
  /**
   * Async function that fetches the nearby places Google API, that then adds the given information into the nearby
   * places object and nearby places name array.
   */
  const setPlacesView = async () => {
    try {
      let i = 0;
      console.log(queryType)
      console.log(userLatitude)
      console.log(userLongitude)
      const url = 'https://serpapi.com/search.json?engine=google_maps' + '&q=' + queryType + '&ll=@' + userLatitude + ',' + userLongitude + ',15.1z&type=search&api_key=0392bce78e57034b952f3a6794f83f78e5b0b38a9feabafa226bebd72f275fb7'
      console.log("kkkkk")
      let awaitVal = await getPlacesData(url, i);
    } catch (e) {
      console.log(e);
    }
  };
  /**
   * This function takes in user data and autocomplets the best results based on the given information
   * @param query passed in from user input to autcomplete specified locations
   */
  const findPlace = (query: string) => {

    if(queryType !== undefined){
      if (query) {
        // Making a case insensitive regular expression
        const regex = new RegExp(`${query.trim()}`, 'i');
        setFilteredPlaces(
          nearbyPlacesNames.filter(e => e.search(regex) >= 0), // fix regex expression to take special characters
        );
      } else {
        // If the query is null then return blank
        setFilteredPlaces([]);
      }
    }else{
      Alert.alert("Please select a query type before searching")
    }
   
  };

  const selectedPlaceType = (item: string) => {
    // console.log(placesTypeSelectedObj)
    placesTypeSelectedObj.map(val => {
      // console.log(Object.keys(val))
      // console.log(val)
      if(val.name == item){
        let selectedVal = val.selected;
        val.selected = !selectedVal
        if(selectedType.length == 0 && val.selected){
          setSelectedPlaceType([...selectedType, item]);
          setQueryType(item)
        }
        if(selectedType.length != 0 && val.selected == false){
          setSelectedPlaceType([]);
          setQueryType();
        }
      }
    })
  }

   /**
   * This function takes in user data and autocomplets the best results based on the given information
   * @param query passed in from user input to autcomplete specified locations
   */
   const findPlaceType = (query: string) => {
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, 'i');
      setPlaceTypeValue(
        placeType.filter(e => e.search(regex) >= 0), // fix regex expression to take special characters
      );
    } else {
      // If the query is null then return blank
      setPlaceTypeValue([]);
    }
  };
  /**
   * This functiontakes in a paramater of the item specified and added it to the list of selectedPlaces array and markers array
   * @param item passed in when user selects specific location to be added to list
   */
  const selectedPlacesObj = (item: string) => {
    let objLocation = 0;
    let testVal = false;
    // When user selects value to be put into array
    selectedPlacesArray.map(obj => {
      if (obj.name === item) {
        obj.selected = !obj.selected;
        testVal = obj.selected;
      }
    });
    // Will add value to selectedPlaces array if testVal is true (value is selected) and it is not already included in the array
    if (testVal && selectedPlaces.includes(item) === false) {
      // Adds value to selecetedPlaces Array
      selectedPlaces.push(item);
      setSelectedPlaces(selectedPlaces);
      //Iterates through selectedPlaces array and adds value to marker if not already sin there
      selectedPlaces.map((place) => {
        let inSelcted = nearbyPlacesNames.indexOf(place);
        objLocation = inSelcted;
        let placeSelected = nearbyPlacesObjs[inSelcted]; // grabs value from nearbyPlacesObj via index
        let itemFound = false;
        //checks if already in markers
        for( let i = 0; i < markers.length; i++ ){
          if (markers[i].title + ' ' + placeSelected.address === item) {
            itemFound = true;
          }
        }
        // if not found then add to markers
        if (itemFound === false) {
          let randomKey = Math.floor(Math.random() * 10000) + 1;
          setMarkers([
            ...markers,
            {
              key: randomKey,
              title: placeSelected.title,
              latitude: placeSelected.gps_coordinates.latitude,
              longitude: placeSelected.gps_coordinates.longitude,
              description: placeSelected.type,
              address: placeSelected.address,
            },
          ]);
        }
      });
    } else if (testVal && selectedPlaces.includes(item) === true) {
      // dont do anything just acknowledge that its already in the array
    } else {
      let removeMarker = markers.filter(marker => marker.title + " " + marker.address != item)
      setMarkers(removeMarker)
      let arrVal = selectedPlaces.filter(places => places != item);// get marker value to be removed and added to markers without duplicates
      setSelectedPlaces(arrVal);
    }
  };

  const handleSettings = () => {
    setSettingsOpened(!settingsOpened);
  }

  /**
   * UseEffect calls requestPermissions function that gets the user's geolocation. This information is then
   * used to determine nerby places called via the setPlacesView function.
   */


  const grabData = () => {
    console.log("hhhh")
    clearInterval(myTimer)
  }

  // const myTimer = setInterval(grabData(), 5000)

  useEffect(() => {
    if (requestPermissions()) {
      if(userLatitude !== undefined && userLongitude !== undefined){
        if(queryType !== undefined){
          setPlacesView();
        }else{
          // Alert.alert("Please enter a query type")
        }
      }
    }
  });
  return (
    <View className = "h-screen w-screen">
      {/* Map display */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 42.9851,
          longitude: -81.2429,
          latitudeDelta: 0.04,
          longitudeDelta: 0.2,
        }}>
          {/* Markers added to map display */}
        {markers &&
          markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            />
          ))}
      </MapView>
      {/* Settings Button */}
      <View>
        {settingsOpened && mapOpened == false && <TouchableOpacity onPress={() => handleSettings()}>
        <View className="h-12 w-14 bg-LineBuddyGray right-3/4 absolute inset-y-24 rounded-l-xl">
          <Text className="h-1 w-10 bg-white absolute inset-x-2 inset-y-3">-</Text>
          <Text className="h-1 w-10 bg-white absolute inset-x-2 inset-y-6 ">-</Text>
          <Text className="h-1 w-10 bg-white absolute inset-x-2 inset-y-9 ">-</Text>
        </View>
      </TouchableOpacity>}
      {settingsOpened && mapOpened == false && <View className="h-full w-5/6 bg-LineBuddyGray inset-x-24 inset-y-24">
      <Autocomplete
              className="top-0"
              data={placeTypeValue}
              flatListProps={{
                keyExtractor: (_, idx) => idx,
                renderItem: ({ item }) => <View className="h-20 p-2 bg-LineBuddyGray flex border-solid border-LineBuddyGray border-8"><Text className = "bg-white p-2 w-5/6 border-solid border-black border text-center font-bold drop-shadow-xl capitalize">{item}</Text><CheckBox
                      onValueChange={() => {
                        selectedPlaceType(item);
                      }}
                      className="bg-white self-end absolute top-3 right-5 p-3 border-solid border-black" // and y u cant pass value in through fucntio to change state
                      value={selectedType.includes(item)}
                /></View> 
                }}
              onChangeText={text => findPlaceType(text)}
              placeholder="Enter the film title"
            />
            <View className = "top-1/2 absolute inset-x-2">
              <Text className = "text-center text-2xl text-white font-bold pr-8 -inset-y-32">Your current place type</Text>
              <Text className = "text-center text-2xl text-white font-bold pr-8 underline underline-offset-8 capitalize -inset-y-32">{queryType}</Text>
            </View>
            
            {isAdminValue && <View className = '-inset-y-52'>
              <TouchableOpacity className = 'justify-center inset-x-5 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full -inset-y-7' onPress={() => navigation.navigate('LogIn')}>
                  <Text className = 'text-lg text-white text-center'>Sign out</Text>
              </TouchableOpacity>
              <TouchableOpacity className = 'justify-center inset-x-5 text-center bg-LineBuddyBlue w-4/5 h-16 rounded-full -inset-y-3.5' onPress={() => navigation.navigate('Admin')}>
                  <Text className = 'text-lg text-white text-center'>My Business</Text>
              </TouchableOpacity>
              <TouchableOpacity className = 'justify-center inset-x-5 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full' onPress={() => navigation.navigate('Admin Settings', {usersBusinessVal:"Hello"})}>
                  <Text className = 'text-lg text-white text-center'>Admin Settings</Text>
              </TouchableOpacity>
        
            </View>}
            {isAdminValue === false && <View className = '-inset-y-52'>
              <TouchableOpacity className = 'justify-center inset-x-5 text-center bg-LineBuddyBlue w-4/5 h-16 rounded-full -inset-y-5' onPress={() => navigation.navigate('LogIn')}>
                  <Text className = 'text-lg text-white text-center'>Sign out</Text>
              </TouchableOpacity>
              <TouchableOpacity className = 'justify-center inset-x-5 text-center bg-LineBuddyPink w-4/5 h-16 rounded-full' onPress={() => navigation.navigate('Settings')}>
                  <Text className = 'text-lg text-white text-center'>Settings</Text>
              </TouchableOpacity>
        
            </View>}
        
        </View>}
      {settingsOpened == false && <TouchableOpacity onPress={() => handleSettings()}>
        <View className="h-12 w-14 bg-LineBuddyGray right-0 absolute inset-y-24 rounded-l-xl">
          <Text className="h-1 w-10 bg-white absolute inset-x-2 inset-y-3">-</Text>
          <Text className="h-1 w-10 bg-white absolute inset-x-2 inset-y-6 ">-</Text>
          <Text className="h-1 w-10 bg-white absolute inset-x-2 inset-y-9 ">-</Text>
        </View>
      </TouchableOpacity>}
      </View>
      {/* Displays list of different places */}
      <View className= {mapOpened ? "h-3/4 bg-LineBuddyBlue rounded-t-lg bottom-0 inset-x-0 absolute": "h-16 bg-LineBuddyBlue rounded-t-lg bottom-0 inset-x-0 absolute"}>
        <TouchableOpacity onPress={() => {setMapOpened(!mapOpened)}}  className = "items-end p-2">
          <Triangle
           width={50}
           height={25}
           color={'#FFFFFF'}
           direction={mapOpened ? 'up' : 'down'}
          />
        </TouchableOpacity>
        {/* Handles places in list and adds them to the markers if clicked*/}
        {mapOpened && 
          <View className = "h-5/6">

            <Autocomplete
              className="top-0"
              data={filteredPlaces}
              flatListProps={{
                keyExtractor: (_, idx) => idx,
                renderItem: ({ item }) => <View className="h-20 p-2 bg-LineBuddyBlue flex border-solid border-LineBuddyBlue border-8"><Text className = "bg-white p-2 w-5/6 border-solid border-black border text-center font-bold drop-shadow-xl">{item}</Text><CheckBox
                      onValueChange={() => {
                        selectedPlacesObj(item);
                      }}
                      className="bg-white self-end absolute top-5 right-5 p-3 border-solid border-black" // and y u cant pass value in through fucntio to change state
                      value={selectedPlaces.includes(item)}
                /></View> 
                }}

              onChangeText={text => findPlace(text)}
              placeholder="Enter the film title"
            />
          </View>}
          </View>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Search;
