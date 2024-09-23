import {View, Text, Input, Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  Platform, 
  PermissionsAndroid,
  StatusBar,
  Alert,
} from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import JdButton from '../../components/button/Buttons';

import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import MapView, {Marker} from 'react-native-maps';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoding';
import {MapKey} from '../../constants/MapKey';
import {setLocation} from '../../redux/fatures/addEvent';
import {useNavigation} from '@react-navigation/native';

const Maps = () => {
  const navigation = useNavigation();
  const mapRef = React.useRef(null);
  const ref = React.useRef();
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const bottomSheetRef = React.createRef();

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    } else {
    }
  };
  const [LocationCords, setLocationCords] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        const result = await request(permission);

        if (result === RESULTS.GRANTED) {
          handleWatchPosition();
        } else {
          Alert.alert('Location permission denied');
          console.log('Location permission denied');
        }
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            handleWatchPosition();
          } else {
            Alert.alert('Location permission denied');
            console.log('Location permission denied');
          }
        } catch (error) {
          console.log('Error requesting location permission:', error);
        }
      }
    };

    requestLocationPermission();
  }, []);
  //   console.log('aa', updatedLocation);
  const [address, setAddress] = React.useState('');

  const handleWatchPosition = async () => {
    Geocoder.init(MapKey);
    await Geolocation.getCurrentPosition(
      position => {
        const lat = position?.coords?.latitude;
        const long = position?.coords?.longitude;
        setLocationCords({
          latitude: lat,
          longitude: long,
        });

        Geocoder.from(lat, long).then(json => {
          var addressComponent = json?.results[0]?.formatted_address;
          // ref?.current?.setAddressText(addressComponent);

          // _________________________________fix current location issue while adding listing_________________
          let geometry = json?.results[0]?.geometry;
        });
        // Update the user's location using the latitude and longitude values
        // You can send this data to a server, update a map, or perform any other necessary actions
        // console.log('New location:', latitude, longitude);
        // dispatch(setLiveLocation({latitude: latitude, longitude: longitude}))
      },
      error => {
        console.log("Check Error",error)
        // Handle error cases
        // if (error.code === error.PERMISSION_DENIED) {
        //   Alert.alert('Location permission denied.');
        // } else if (error.code === error.POSITION_UNAVAILABLE) {
        //   Alert.alert('Location information is unavailable.');
        // } else if (error.code === error.TIMEOUT) {
        //   Alert.alert('Location request timed out.');
        // } else {
        //   Alert.alert('An unknown error occurred.');
        // }
      },
      { enableHighAccuracy: false, 
        timeout: 20000, 
        maximumAge: 15000 }
      // {
      //   enableHighAccuracy: true, // Use GPS for more accurate results (if available)
      //   timeout: 2000, // Set a timeout of 5 seconds
      //   maximumAge: 0, // Force the device to get the current location instead of using a cached result
      //   distanceFilter: 10, // Update the location only if the user has moved at least 10 meters
      // },
    );

    // Clean up the watch position when the component is unmounted
    // return () => {
    //   navigator.geolocation.clearWatch(watchId);
    // };
  };
  const [marker, setMarker] = React.useState({
    lat: 0,
    long: 0,
  });
  const dispatch = useDispatch();

  return (
    <View flex={1} bg={'white'}>
      <Text>Map</Text>

      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View style={styles.mainv}>
        <View height={'100%'}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: LocationCords?.latitude,
              longitude: LocationCords?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: LocationCords?.latitude,
              longitude: LocationCords?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={loc => {
              Geocoder.init(MapKey);
              setMarker({
                lat: loc?.nativeEvent?.coordinate?.latitude,
                long: loc?.nativeEvent?.coordinate?.longitude,
              });
              openBottomSheet();
              Geocoder.from(
                loc?.nativeEvent?.coordinate?.latitude,
                loc?.nativeEvent?.coordinate?.longitude,
              )

                .then(async json => {
                  var address = json?.results[0]?.formatted_address;
                  let geometry = json.results[0].geometry?.location;

                  ref?.current?.setAddressText(address);
                  await dispatch(
                    setLocation({
                      address: address,
                      latitude: geometry?.lat,
                      longitude: geometry?.lng,
                    }),
                  );
                  setAddress(address);
                })
                .catch(error => console.warn(error));
            }}>
            {marker?.lat === 0 && marker?.long === 0 ? (
              <Marker
                draggable={true}
                coordinate={{
                  latitude: LocationCords?.latitude,
                  longitude: LocationCords?.longitude,
                }}
                onDragEnd={item => {
                  // setLoading(true);
                  // dispatch(setLocationAddress("San Salvador, El Salvador"));
                  // dispatch(setLocationLat(13.794185));
                  // dispatch(setLocationLng(-88.89653));
                  // navigation.goBack();
                  // return;

                  Geocoder.init(MapKey);
                  Geocoder.from(
                    item?.nativeEvent?.coordinate.latitude,
                    item?.nativeEvent?.coordinate.longitude,
                  )
                    .then(json => {
                      var address = json?.results[0]?.formatted_address;
                      let geometry = json?.results[0]?.geometry;
                    })
                    .catch(error => console.warn(error));
                }}
              />
            ) : (
              <>
                {marker?.lat !== 0 && marker?.long !== 0 && (
                  <View h={5} w={5}>
                    <Marker
                      // draggable={true}

                      coordinate={{
                        latitude: marker?.lat,
                        longitude: marker?.long,
                      }}></Marker>
                  </View>
                )}
              </>
            )}
          </MapView>
        </View>
        <View
          position={'absolute'}
          left={10}
          top={5}
          width={'80%'}
          borderRadius={12}
          // alignItems="center"
          // justifyContent="space-between"
          bg={'white'}
          flexDir={'row'}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginTop: 10, marginLeft: 5}}>
            <Ionicons name={'chevron-back'} color={'black'} size={20} />
          </TouchableOpacity>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Search"
            styles={{
              textInputContainer: {
                // backgroundColor: 'grey',
                width: '100%',
              },
              textInput: {
                height: 38,
                width: '100%',
                color: '#5d5d5d',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true

              Geocoder.init(MapKey);
              openBottomSheet();
              Geocoder.from(details.description)
                .then(async json => {
                  var location = json?.results[0]?.geometry?.location;

                  setLocationCords({
                    latitude: location?.lat,
                    longitude: location?.lng,
                  });

                  var address = json?.results[0]?.formatted_address;
                  await dispatch(
                    setLocation({
                      address: address,
                      latitude: location.lat,
                      longitude: location.lng,
                    }),
                  );
                  setAddress(address);
                })
                .catch(error => console.warn(error));
            }}
            query={{
              key: MapKey,
              language: 'en',
            }}
            // currentLocation={true}
            // currentLocationLabel="Current location"
          />
          <TouchableOpacity
            onPress={() => {
              ref?.current?.setAddressText('');
            }}
            style={{marginTop: 10, marginRight: 5}}>
            <Entypo color={'black'} size={18} name={'cross'} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <Text
            style={{
              color: '#2D2C29',
              fontSize: 2.5,
              marginTop: 1,
              fontWeight: '700',
              marginLeft: 8,
              fontFamily: 'Inter-Bold',
            }}>
            Your location
          </Text>
          <TouchableOpacity
            onPress={() => setIsBottomSheetExpanded(!isBottomSheetExpanded)}
            style={{
              marginHorizontal: 8,
              backgroundColor: '#F4F4F4',
              justifyContent: 'center',
              height: 8,
              borderRadius: 3,
            }}></TouchableOpacity>
          <View mx={5}>
            <JdButton
              title="Added"
              // isLoading={loading}
              onPress={() => {
                navigation.goBack();
                bottomSheetRef?.current?.close();
              }}
            />
          </View>
        </View>
      </View>
      {/* <CustomSnackbar */}
      {/* message={'Success'} */}
      {/* messageDescription={'Location Added Successfully'}
            onDismiss={dismissSnackbar} // Make sure this function is defined
            visible={snackbarVisible}
          /> */}
      <BottomSheet
        defaultOff={true}
        height={'30%'}
        width={'100%'}
        openBottom={bottomSheetRef}>
        {/* <View flex={1} bg={'white'}> */}
        {/* <View style={styles.searchBar}> */}
        <Text
          fontSize={18}
          color={'black'}
          fontFamily={'NotoSans-SemiBold'}
          my={5}
          mx={5}>
          Location
        </Text>
        <Input
          mb={8}
          mx={5}
          // flex={1}
          value={address}
          isReadOnly
          bg={'white'}
          rounded={'md'}
          InputLeftElement={
            <Icon
              as={
                <Ionicons
                  name={'location'}
                  size={18}
                  color={'#A8A8A8'}
                  style={{marginLeft: 5}}
                />
              }
              size={5}
              mx="2"
              color="muted.400"
            />
          }
          // onFocus={() => onFocus}
          // onBlur={() => onBlur}
          placeholder="Search here"
        />
        {/* </View> */}
        <View mx={5}>
          <JdButton
            title="Add Location"
            // isLoading={loading}
            onPress={() => {
              bottomSheetRef?.current?.close();
              navigation.goBack();
            }}
          />
        </View>
      </BottomSheet>
      {/* </View> */}
    </View>
  );
};
export default Maps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mainv: {
    flex: 1,
    //borderTopRightRadius: 40,
    //borderTopLeftRadius: 40,
    //overflow: 'hidden',
    //alignItems: 'center',
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'sp',

    marginHorizontal: 8,
    // height: 8,
    position: 'absolute',
    top: 20, // Place it at the top
    left: 0,
    right: 0,
    zIndex: 1,
    //borderWidth: 3,
  },
  searchBar: {
    height: 50,
    // flex: 1,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3.8,
    borderRadius: 12,
    // borderWidth: 1,
    backgroundColor: 'white',
    // borderColor: '#00000017',
    marginTop: 10,
  },
  searchHeaderBottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginHorizontal: 10,
    marginRight: 18,
    height: 50,
  },
});

// <View style={styles.searchHeader}>
//   {/* <View style={styles.searchBar}> */}
//   {/* <Ionicons
//               name={'search-outline'}
//               size={18}
//               color={'#A8A8A8'}
//               style={{marginLeft: 5}}
//             /> */}
//   <Input
//     mb={8}
//     mx={3}
//     // flex={1}
//     bg={'white'}
//     borderWidth={0}
//     _focus={{bg: 'white'}}
//     rounded={'full'}
//     InputLeftElement={
//       <Icon
//         as={
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name={'chevron-back'} color={'black'} size={18} />
//           </TouchableOpacity>
//         }
//         size={5}
//         mx="2"
//         color="muted.400"
//       />
//     }
//     InputRightElement={
//       <Icon
//         as={<Entypo color={'black'} size={18} name={'cross'} />}
//         size={5}
//         mx="2"
//         color="muted.400"
//       />
//     }
//     // onFocus={() => onFocus}
//     // onBlur={() => onBlur}
//     placeholder="Search here"
//   />

//   {/* </View> */}
// </View>;
