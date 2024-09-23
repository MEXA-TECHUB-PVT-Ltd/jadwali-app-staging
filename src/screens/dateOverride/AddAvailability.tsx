import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {View, Text, ScrollView} from 'native-base';
import AvailableComponent from '../../components/availibiltyCompo/AvailableComponent';
import Header from '../../components/Header/Header';
import {Picker, DatePicker} from 'react-native-wheel-pick';
import SpinnerTimer from './components/SpinnerTimer';
import JdButton from '../../components/button/Buttons';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';

const AddAvailability = ({navigation, route}) => {
  const fromAdd = route?.params;
  const data = [
    'Monday',

    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    // Add more items as needed
  ];
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <ScrollView keyboardShouldPersistTaps="handled" flex={1} bg={'white'}>
      <Header
        title={fromAdd === true ? 'Add Availability' : 'Reduce Availability'}
      />
      <View mx={2}>
        <Text mx={5} mt={5} fontSize={16} fontFamily={'NotoSans-SemiBold'}>
          {t('Select Day')}
        </Text>
        <AvailableComponent data={data} translation={currentLanguage} />
        <Text mx={5} mb={5} fontSize={16} fontFamily={'NotoSans-SemiBold'}>
          {t('Select Start Time')}
        </Text>
        <SpinnerTimer spinner={1} />
        <Text
          mx={5}
          mb={5}
          mt={5}
          fontSize={16}
          fontFamily={'NotoSans-SemiBold'}>
          {t('Select End Time')}
        </Text>
        <SpinnerTimer spinner={2} />
        <View mx={5} my={10} mt={16}>
          <JdButton
            title={'Save'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  horizontalLine: {
    marginHorizontal: 10,
    borderBottomWidth: 5,
    marginTop: 3,
  },
  timeAndEdit: {
    flexDirection: 'row',
  },
  imgPen: {
    marginLeft: 5,
  },
  notifications: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginTop: 5,
  },
  txtTime: {
    fontSize: 3,
  },
  txtNotification: {
    backgroundColor: '#F2F2F2',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
});

export default AddAvailability;
