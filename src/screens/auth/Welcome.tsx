import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text, Pressable} from 'native-base';
import React from 'react';
import BgLogo from '../../components/bgLogo/BgLogo';
import Logo from '../../components/logo/Logo';
import JdButton from '../../components/button/Buttons';
import {useTranslation} from 'react-i18next';
import {useAddAvailabilityMutation} from '../../redux/auth/auth';
import {useDispatch, useSelector} from 'react-redux';
import LoaderModal from '../../components/Loader/Loader';
import {setPassword} from '../../redux/fatures/auth';
import { storeData } from '../../Async/AsyncStorage/AsyncStorage';

const Welcome = ({navigation, route}: any) => {
  const fromSignup = route?.params;
  const uid = useSelector(state => state.auth?.userData?.id);
  const [post, {data: isData, error: isError, isLoading}] =
    useAddAvailabilityMutation();
  const dispatch = useDispatch();
  const [selectedItemArr, setSelectedItemArr] = React.useState([
    {
      day_of_week: 'Sunday',
      time_slot: [],
      is_available: false,
    },
    {
      day_of_week: 'Monday',
      time_slot: [],
      is_available: false,
    },
    {
      day_of_week: 'Tuesday',
      time_slot: [],
      is_available: false,
    },
    {
      day_of_week: 'Wednesday',
      time_slot: [],
      is_available: false,
    },
    {
      day_of_week: 'Thursday',
      time_slot: [],
      is_available: false,
    },

    {
      day_of_week: 'Friday',
      time_slot: [],
      is_available: false,
    },
    {
      day_of_week: 'Saturday',
      time_slot: [],
      is_available: false,
    },
  ]);
  const Des =
    "We're thrilled to have you join our community of event enthusiasts and organizers. Our app is here to make the process smooth and enjoyable.";
  const handleNavigation = () => {
    if (fromSignup === true) {
      navigation.navigate('Availability');
    } else {
      navigation.navigate('BottomTab', {screen: 'Home'});
    }
  };
  const {t} = useTranslation();
  const handleSkip = () => {
    const body = {
      user_id: uid,
      days: selectedItemArr,
    };

    post(body).then(async res => {
      if (res?.data?.status === true) {
        await storeData('uid', `${uid}`);
        await dispatch(setPassword(uid));
      }
    });
  };
  return (
    <View flex={1} bg={'white'}>
      <BgLogo />
      <View alignItems={'center'} flex={1} mt={10}>
        <Logo height={'22%'} width={'20%'} resizeMode={'contain'} />
        <Text mt={16} fontSize={27} fontFamily={'NotoSans-SemiBold'}>
          {t('Welcome to JadWali')}
        </Text>
        {isLoading ? <LoaderModal visible={isLoading} /> : null}
        <>
          <Text
            mt={4}
            w={'90%'}
            textAlign={'center'}
            color={'grey.400'}
            fontFamily={'NotoSans-Regular'}
            fontSize={'14'}>
            {t(Des)}
          </Text>
          <View w={'90%'} mt={20}>
            <JdButton title={'Get Started'} onPress={handleNavigation} />
            <TouchableOpacity
              style={{alignSelf: 'center', marginTop: 10}}
              onPress={() => {
                handleSkip();
              }}>
              <Text
                w={'90%'}
                textAlign={'center'}
                color={'primary.50'}
                fontFamily={'NotoSans-SemiBold'}
                fontSize={16}>
                Skip Setup
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </View>
    </View>
  );
};

export default Welcome;
