import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  Avatar,
  ScrollView,
  Stack,
  Pressable,
  Image,
  Divider,
  Row,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Header from '../../components/Header/Header';
import JdInputs from '../../components/inputs/inputs';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import JdButton from '../../components/button/Buttons';
import * as Yup from 'yup';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import SettingsMenu from './components/SettingsMenu';
import EventsAvailabilityComp from '../events/components/EventsAvailabilityComp';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';

const AvalabilitySettings = ({navigation}) => {
  const data = [
    {
      day_of_week: 'Sundays',
      start_time: '09:00',
      end_time: '05:00',
      isAvailable: false,
    },
    {
      day_of_week: 'Mondays',
      start_time: '09:00',
      end_time: '05:00',
      isAvailable: false,
    },
    {
      day_of_week: 'Tuesdays',
      start_time: '09:00',
      end_time: '05:00',
      isAvailable: false,
    },
    {
      day_of_week: 'Wednesdays',
      start_time: '09:00',
      end_time: '05:00',
      isAvailable: false,
    },
    {
      day_of_week: 'Thursdays',
      start_time: '09:00',
      end_time: '05:00',
      isAvailable: false,
    },

    {
      day_of_week: 'Fridays',
      start_time: '09:00',
      end_time: '05:00',
      isAvailable: false,
    },
    {
      day_of_week: 'Saturdays',
      start_time: '09:00',
      end_time: '05:00',
      isAvailable: false,
    },
  ];
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <ScrollView keyboardShouldPersistTaps="handled" bg={'white'} flex={1}>
      <Header title={'Availability'} />
      <View mx={5} my={5}>
        <Text
          color={'grey.400'}
          fontSize={14}
          mb={10}
          w={currentLanguage === 'ar' ? null : '80%'}>
          {t('Set the hours you are free to accept appointments')}
        </Text>
        <EventsAvailabilityComp item={data} fromSettings={true} />
      </View>
    </ScrollView>
  );
};

export default AvalabilitySettings;

const styles = StyleSheet.create({});
