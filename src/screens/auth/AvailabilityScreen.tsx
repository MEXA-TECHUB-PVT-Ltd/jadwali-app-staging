import {StyleSheet} from 'react-native';
import {View, Text, ScrollView} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import ActiveHours from '../../components/Availabiltymodule/ActiveHours';
import JdButton from '../../components/button/Buttons';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
import {getStorageData} from '../../Async/AsyncStorage/AsyncStorage';
import {useFocusEffect} from '@react-navigation/native';

const AvailabilityScreen = ({navigation, route}: any) => {
  const fromSignup = route?.params?.fromSignup;
  const [token, setToken] = React.useState('');
  const handleToken = async () => {
    const idToken = await getStorageData('idToken');
    setToken(idToken);
  };
  useFocusEffect(
    React.useCallback(() => {
      handleToken();
    }, []),
  );

  const days = [
    {
      id: 1,
      name: 'Sundays',
    },
    {
      id: 2,
      name: 'Mondays',
    },
    {
      id: 3,
      name: 'Tuesdays',
    },
    {
      id: 4,
      name: 'Wednesdays',
    },
    {
      id: 5,
      name: 'Thursdays',
    },

    {
      id: 6,
      name: 'Fridays',
    },
    {
      id: 7,
      name: 'Saturdays',
    },
  ];
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <View flex={1} bg={'white'}>
      {fromSignup === true ? (
        <Header title={'Availability'} load={'25'} />
      ) : (
        <Header title={'Availability'} />
      )}
      {fromSignup === true ? (
        <Text
          mt={5}
          fontSize={19}
          fontFamily={'NotoSans-Bold'}
          textAlign={'center'}>
          Quick Set up
        </Text>
      ) : null}
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View mt={0} mx={5}>
        {!fromSignup && (
          <Text
            mt={5}
            w={'80%'}
            mb={'5%'}
            // alignSelf={currentLanguage === 'ar' ? 'flex-end' : 'flex-start'}
            fontFamily={'NotoSans-Regular'}
            fontSize={14}
            color={'grey.400'}>
            {t('Set the hours you are free to accept appointments')}
          </Text>
        )}
      </View>
      <View mx={5}>
        <ActiveHours days={days} fromSchedule={false} />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default AvailabilityScreen;

const styles = StyleSheet.create({});
