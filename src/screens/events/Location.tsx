import { Alert, StyleSheet } from 'react-native';
import {
  Image,
  Input,
  Row,
  ScrollView,
  Text,
  TextArea,
  View,
  Icon,
  Pressable,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import Header from '../../components/Header/Header';
import EventsMap from './components/eventsMap';
import JdInputs from '../../components/inputs/inputs';
import JdButton from '../../components/button/Buttons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MeetingsComp from './components/MeetingComp';
import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../redux/fatures/addEvent';
import {
  useAddLocationMutation,
  useGetAllEventDataQuery,
  useUpdateLocationMutation,
} from '../../redux/event/event';
import { useFocusEffect } from '@react-navigation/native';
import AlertSnackBar from '../../components/customSnackBar/AlertSnackBar';
import { G } from 'react-native-svg';
const containerHeight = 300; // Example height of the parent container
const inputHeight = containerHeight * 0.5; // Adjust the percentage as needed

const Location = ({ navigation, route }) => {
  const containerHeight = 300; // Example height of the parent container
  const inputHeight = containerHeight * 0.5; // Adjust the percentage as needed
  const maxCount = 250;
  const dispatch = useDispatch();
  const [characetrLength, setCharacteracetrLength] = React.useState();
  const id = route?.params?.id;

  const {
    data: AllEventData,
    error: EventDataError,
    isLoading: eventDataloading,
  } = useGetAllEventDataQuery(id);


  const [updateLocation, { isLoading: updateLoading, error: updateError }] =
    useUpdateLocationMutation();
  const fromEdit = route?.params?.fromEdit;
  const [postalCode, setPostalCode] = React.useState('');
  const location = useSelector(state => state?.event?.location);
  const [address, setAddress] = React.useState(location?.address);
  React.useEffect(() => {
    setAddress(location?.address);
  }, [location]);
  const data = [
    {
      id: 1,
      name: 'Skype',
      img: require('../../assets/skype.png'),
    },
    {
      id: 2,
      name: 'Google Meet',
      img: require('../../assets/googleMeet.png'),
    },

    {
      id: 3,
      name: 'Zoom',
      img: require('../../assets/zoom.png'),
    },
  ];
  const { t } = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  const [postLocation, { isData, isError, isLoading }] = useAddLocationMutation();
  const [modalVisible, setModalVisible] = React.useState(false);
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  React.useEffect(() => {
    if (
      address !== '' &&
      address != ' ' &&
      postalCode != '' &&
      postalCode != ' '
    ) {
    }
  }, [address, postalCode]);
  useFocusEffect(
    React.useCallback(() => {
      setAddress(location?.address);
    }, [location]),
  );
  useFocusEffect(
    React.useCallback(() => {
      if (
        AllEventData &&
        fromEdit &&
        AllEventData?.result?.locations?.length > 0
      ) {
        setAddress(AllEventData?.result?.locations[0]?.address);
        setPostalCode(AllEventData?.result?.locations[0]?.post_code);
        setSelected(
          AllEventData?.result?.locations[0]?.type === 'physical' ? 2 : 1,
        );
      }
    }, [AllEventData]),
  );
  const [focus, setFocus] = React.useState(false);
  const [error, setError] = React.useState('');
  const [modalError, setModalError] = React.useState();
  React.useEffect(() => {
    if (address === '' && focus === true) {
      setError('Address cannot be empty');
    } else {
      setError('');
    }
  }, [address, focus]);

  const handleLocation = async () => {
    let locationId = AllEventData?.result?.locations?.[0]?.id ?? null;
    if (locationId === null) {
      // Alert.alert("Add Hit")
      let body = {
        type: 'physical',
        event_id: id,
        address: address,
        address_note: postalCode,
        location: {
          long: location?.latitude ? location?.latitude : null,
          lat: location?.longitude ? location?.longitude : null,
        },
      };

      const res = await postLocation(body);
      if (res?.data?.status === true) {
        // locationId = res.data.location_id; // assuming the API returns the new location_id
      } else {
        let body = res?.error?.data;
        setModalError(body);
        setModalVisible(true);
        return; // Exit the function if postLocation fails
      }
    }

    if (fromEdit && locationId != null) {
      // Alert.alert("Edit Hit")
      let body = {
        type: 'physical',
        location_id: locationId,
        event_id: id,
        address: address,
        address_note: postalCode,
        location: {
          long: location?.latitude ? location?.latitude : null,
          lat: location?.longitude ? location?.longitude : null,
        },
      };
      updateLocation(body).then(res => {
        if (res?.data?.status === true) {
          navigation.navigate('SceduleEvent', { fromEdit: true, id: id });
        } else {
          let body = res?.error?.data;
          setModalError(body);
          setModalVisible(true);
        }
      });
    } else if (selected === 1 && fromEdit === true) {
      navigation.navigate('SceduleEvent', {
        fromEdit: false,
        id: id,
        fromLocation: true,
      });
    } else if (selected === 1) {
      navigation.navigate('SceduleEvent', { fromEdit: false, id: id });
    } else {
      let body = {
        type: 'physical',
        event_id: id,
        address: address,
        address_note: postalCode,
        location: {
          long: location?.latitude ? location?.latitude : null,
          lat: location?.longitude ? location?.longitude : null,
        },
      };
      postLocation(body).then(async res => {
        if (res?.data?.status === true) {
          navigation.navigate('SceduleEvent', {
            fromEdit: false,
            id: id,
            fromLocation: true,
          });
        } else {
          let body = res?.error?.data;
          setModalError(body);
          setModalVisible(true);
        }
      });
    }
  };


  // const handleLocation = () => {
  //   if (fromEdit) {
  //     let body = {
  //       type: 'physical',
  //       location_id: AllEventData?.result?.locations?.[0]?.id ?? null,
  //       event_id: id,
  //       address: address,
  //       address_note: postalCode,
  //       location: {
  //         long: location?.latitude ? location?.latitude : null,
  //         lat: location?.longitude ? location?.longitude : null,
  //       },
  //     };
  //     updateLocation(body).then(res => {
  //       if (res?.data?.status === true) {
  //         navigation.navigate('SceduleEvent', { fromEdit: true, id: id });
  //       } else {
  //         let body = res?.error?.data;
  //         setModalError(body);
  //         setModalVisible(true);
  //       }
  //     });
  //   } else if (selected === 1 && fromEdit === true) {
  //     navigation.navigate('SceduleEvent', {
  //       fromEdit: false,
  //       id: id,
  //       fromLocation: true,
  //     });
  //   } else if (selected === 1) {
  //     navigation.navigate('SceduleEvent', { fromEdit: false, id: id });
  //   } else {
  //     let body = {
  //       type: 'physical',
  //       event_id: id,
  //       address: address,
  //       address_note: postalCode,
  //       location: {
  //         long: location?.latitude ? location?.latitude : null,
  //         lat: location?.longitude ? location?.longitude : null,
  //       },
  //     };
  //     postLocation(body).then(async res => {
  //       if (res?.data?.status === true) {
  //         navigation.navigate('SceduleEvent', {
  //           fromEdit: false,
  //           id: id,
  //           fromLocation: true,
  //         });
  //       } else {
  //         let body = res?.error?.data;
  //         setModalError(body);
  //         setModalVisible(true);
  //       }
  //     });
  //   }
  // };
  const [selected, setSelected] = React.useState(2);

  React.useEffect(() => {
    if (isError) {
      setModalVisible(true);
    }
    if (updateError) {
      setModalVisible(true);
    }
  }, [isError, updateError]);
  return (
    <View bg={'white'} flex={1}>
      <Header title={fromEdit === true ? 'Edit Location' : 'Set Location'} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        flex={1}>
        <View m={5}>
          <Text
            ml={1}
            color={'grey.400'}
            fontSize={14}
            fontFamily={'NotoSans-Regular'}>
            {t('Where would you like to meet for this event?')}
          </Text>
          <Row alignItems={'center'} justifyContent={'center'} mt={5}>
            {/* <Pressable
              mr={8}
              onPress={() => {
                setSelected(1);
                navigation.navigate('OnlineMeeting', {eventId: id});
              }}
              bg={selected === 1 ? 'primary.20' : 'secondary'}
              p={4}
              h={32}
              w={32}
              borderRadius={10}
              alignItems={'center'}>
              <Image
                source={require('../../assets/googleMeet.png')}
                h={16}
                resizeMode={'contain'}
                w={16}
                alt={'meeting'}
              />
              <Text
                fontFamily={
                  selected === 1 ? 'NotoSans-Medium' : 'NotoSans-Regular'
                }
                fontSize={selected === 1 ? 16 : 14}>
                Online
              </Text>
            </Pressable> */}
            <Pressable
              onPress={() => setSelected(2)}
              bg={selected === 2 ? 'primary.20' : 'secondary'}
              p={4}
              h={32}
              w={32}
              borderRadius={10}
              justifyContent={'center'}
              alignItems={'center'}>
              <Ionicons
                name={'location'}
                size={50}
                color={selected === 2 ? 'black' : '#A8A8A8'}
                style={{ marginLeft: 5 }}
              />
              <Text
                fontFamily={
                  selected === 2 ? 'NotoSans-Medium' : 'NotoSans-Regular'
                }
                fontSize={selected === 2 ? 16 : 14}>
                Physical
              </Text>
            </Pressable>
          </Row>
          {/* <Text
            mt={5}
            ml={1}
            // color={'grey.40'}
            fontSize={18}
            fontFamily={'NotoSans-SemiBold'}>
            {t('Add Address')}
          </Text> */}
          {selected === 2 && (
            <>
              <Pressable 
                onPressIn={() => navigation.navigate('Maps')}
              >
                <Input
                  mt={5}
                  placeholder={t('Set location on Map')}
                  rounded={'full'}
                  bg={'secondary'}
                  height={50}
                  // onPressIn={()=>navigation.navigate('Maps')}
                  isReadOnly={true}
                  borderWidth={0}
                  InputRightElement={
                    currentLanguage === 'en' ? (
                      <Icon
                        as={<AntDesign name={'right'} />}
                        size={4}
                        mr="2"
                        color="#7B7B7B"
                      />
                    ) : null
                  }
                  InputLeftElement={
                    currentLanguage === 'ar' ? (
                      <Icon
                        as={<AntDesign name={'left'} />}
                        size={4}
                        ml="2"
                        color="#7B7B7B"
                      />
                    ) : null
                  }
                  placeholderTextColor={'black'}
                  // label={'Location'}
                  fontFamily={'NotoSans-Medium'}
                  fontSize={16}
                // rightIcon={''}
                />
              </Pressable>
              <JdInputs
                label={'Address Line'}

                mt={4}
                fontSize={16}
                fontFamily={'NotoSans-SemiBold'}
                value={address}
                leftIconName={'map-marker'}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChangeText={txt => {
                setAddress(txt);
                }}

              />
              {error !== '' && focus === true && (
                <View flexDir={'row'} alignItems={'center'} mt={1} ml={2}>
                  <View bg={'red.500'} h={2} w={2} rounded={'full'} mr={1} />
                  <Text color={'red.500'} fontSize={12}>
                    {error}
                  </Text>
                </View>
              )}
              {/* <JdInputs
                label={'Address Notes'}
                mt={5}
                height={inputHeight}
                keyboardType={'default'}
                fontSize={16}
                value={postalCode}
                onChangeText={txt => {
                  setPostalCode(txt);
                }}
                fontFamily={'NotoSans-SemiBold'}
              /> */}
              <View margin={"4%"}></View>
              <Row
                alignItems={'center'}
                justifyContent={'space-between'}
                mt={0}>
                <Text fontFamily={'NotoSans-SemiBold'} fontSize={15}>
                  {t('Address Notes')}
                </Text>
                <Text fontFamily={'NotoSans-SemiBold'} fontSize={10}>
                  {characetrLength}/{250}
                </Text>
              </Row>
              <TextArea
                mt={2}
                p={4}
                borderRadius={10}
                maxLength={maxCount}
                bg={'secondary'}
                borderWidth={0}
                // numberOfLines={6}
                h={160}
                placeholder="Add note"
                value={postalCode}
                onChangeText={txt => {
                  setPostalCode(txt);
                }}
                onChange={e => {
                  setCharacteracetrLength(e?.nativeEvent?.text?.length);
                }}
              // keyboardType='numeric'
              // boxSize={'sm'}
              />

              {/* <Text
            mt={5}
            ml={1}
            // color={'grey.40'}
            fontSize={18}
            fontFamily={'NotoSans-SemiBold'}>
            {t('Meet Online')}
          </Text> */}
              {/* <MeetingsComp
            translation={currentLanguage}
            data={data}
            onPress={async select => {
              console.log(select);
              await dispatch(
                setLocation({
                  address: address,
                  postalCode: postalCode,
                  meetingPlace: select,
                }),
              );
              navigation.goBack();
            }}
          /> */}
            </>
          )}
        </View>
        <View mt={selected === 2 ? '1%' : '89%'} mb={2} mx={5}>
          <JdButton
            title={'Continue'}
            onPress={() => {
              handleLocation();
            }}
            loading={isLoading ? isLoading : updateLoading}
          />
        </View>
        <AlertSnackBar
          message={modalError}
          // status={ale?.status}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
        />
      </ScrollView>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({});
