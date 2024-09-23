import {
  ScrollView,
  Text,
  View,
  Pressable,
  Divider,
  Image,
  useClipboard,
} from 'native-base';
import { StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import DashboardHeader from '../../components/dashboardHeader/DashboardHeader';
import EventsComp from '../../components/eventsComp/EventsComp';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import AlertModal from '../../components/Modal/AlertModal';
import { useSelector, useDispatch } from 'react-redux';
import { setLocation, setMeetingType, setUserEventDetail } from '../../redux/fatures/addEvent';
import { _getResults, useGetUserEventsQuery } from '../../redux/event/event';
import Loader from '../../components/AnimationLoader/Loader';
import AlertSnackBar from '../../components/customSnackBar/AlertSnackBar';
import messaging from '@react-native-firebase/messaging';
import { useGetUserByIdQuery } from '../../redux/auth/auth';
import { setUserData } from '../../redux/fatures/auth';
import { useFocusEffect } from '@react-navigation/native';
const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const uid = useSelector(state => state?.auth?.password);
  const ids = useSelector(state => state?.event?.userEvents);
  const [isLoading, setisLoading] = useState(false)
  // console.log("Idssss", ids)

  const dispatch = useDispatch();
  const { value, onCopy } = useClipboard();
  const { data: profileData, isLoading: userLoading } = useGetUserByIdQuery(uid);

  React.useEffect(() => {
    dispatch(setUserData(profileData?.user));

  }, [profileData]);
  // const { data: isData, error: isError, isLoading, refetch } = useGetUserEventsQuery(uid);


  const [visible, setVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const [currentLanguage, setLanguage] = React.useState();
  const [events, setEvents] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      _fetchData();
      return () => {
        // console.log('Screen is unfocused');
      };
    }, [])
  );
  const _fetchData = () => {
    // setisLoading(true)
    _getResults(uid).then((responce) => {
      setisLoading(false)
      setEvents(responce.events)
    }).catch((error) => {
      setisLoading(false)
      if (error.response.data.message == "No events found for the specified user") {
        setEvents([])
      }
    })
  }

  //irfan added to avoid re-render of homescreen untill it is focused
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const selectedLanguage = i18n.language;
  //     if (selectedLanguage !== currentLanguage) {
  //       setLanguage(selectedLanguage);
  //     }
  //   }, [currentLanguage])
  // );


  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);


  const bottomSheetRef = React.createRef();
  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    } else {
    }
    // setModalVisible(true);
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  let body = {
    status: true,
    message: 'Link copied to clipboard',
  };
  let body2 = {
    status: false,
    message: 'You can only create 6 events',
  };


  return (
    <View bg={'white'} flex={1}>
      <DashboardHeader
        loading={userLoading}
        profileData={profileData}
        name={profileData?.user?.full_name}
        img={profileData?.user?.upload_details?.filename}
        eventsData={events}
        searchData={(dat: object) => {
          console.log(dat);
          setEvents(dat);
        }}
        onPress={() => {
          let fromSettings = false;
          navigation.navigate('Profile');
        }}
        translation={currentLanguage}
      />

      <AlertSnackBar
        message={body}
        // status={ale?.status}
        visible={visible}
        onDismiss={() => {
        setVisible(false);

          // onCopy('Copied');
          // }
        }}
      />

      {isLoading || userLoading ? (
        <View mt={'50%'} alignItems={'center'} justifyContent={'center'}>
          <Loader />
        </View>
      ) : (
        <>
          {events?.length > 0 ? (
            <>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                flex={1}
                mx={4}
                showsVerticalScrollIndicator={false}>
                <EventsComp
                  data={events}
                  translation={currentLanguage}
                  onPress={link => {
                    setVisible(true);
                    onCopy(link);
                  }}

                />
              </ScrollView>
            </>
          ) : (
            <View mt={'45%'} alignItems={'center'} justifyContent={'center'}>
              <Image
                source={require('../../assets/calendar.png')}
                h={32}
                w={32}
                alt={'no-events'}
              />
            </View>
          )}
        </>
      )}
      <Pressable
        rounded={'full'}
        bg={'primary.50'}
        position={'absolute'}
        bottom={2}
        h={12}
        onPress={async () => {

          // if (isData?.events?.length === 6) {
          //   setModalVisible(true);
          // } else {
          openBottomSheet();
          // }
        }}
        alignItems={'center'}
        justifyContent={'center'}
        w={12}
        right={5}>
        <Entypo name={'plus'} color={'white'} size={25} />
      </Pressable>
      <BottomSheet
        defaultOff={true}
        height={'27%'}
        width={'100%'}
        openBottom={bottomSheetRef}>
        <Pressable
          position={'absolute'}
          p={2}
          right={2}
          top={2}
          onPress={() => {
            closeBottomSheet();
          }}>
          <Entypo name={'cross'} color={'black'} size={24} />
        </Pressable>
        {/* <Row> */}
        <View mt={9}>
          <Text fontSize={20} fontFamily={'NotoSans-SemiBold'}>
            Select Event Type
          </Text>

          <Pressable
            onPress={async () => {
              // if (data?.length > 6) {
              //   setModalVisible(true);
              // } else {
              closeBottomSheet();
              await dispatch(setMeetingType('one-to-one meeting'));
              let fromEdit = false;
              await dispatch(setLocation({}));
              navigation.navigate('AddEvent', { fromEdit, one: true });
              // }
            }}>
            <Text mt={5} fontSize={18} fontFamily={'NotoSans-Regular'}>
              one-to-one meeting
            </Text>
          </Pressable>
          <Divider my={4} />
          <Pressable
            onPress={async () => {
              // if (data?.length > 6) {
              //   setModalVisible(true);
              // } else {
              closeBottomSheet();
              await dispatch(setMeetingType('one-to-many meeting'));
              let fromEdit = false;
              await dispatch(setLocation({}));
              navigation.navigate('AddEvent', { fromEdit, one: false });
              // }
            }}>
            <Text fontSize={18} fontFamily={'NotoSans-Regular'}>
              one-to-many meeting
            </Text>
          </Pressable>
        </View>
        {/* </View> */}
      </BottomSheet>
      <AlertSnackBar
        message={body2}
        // status={ale?.status}
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);

          // onCopy('Copied');
          // }
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
