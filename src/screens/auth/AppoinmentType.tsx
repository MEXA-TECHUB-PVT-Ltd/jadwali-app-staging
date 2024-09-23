import {StyleSheet, ActivityIndicator} from 'react-native';
import {Text, View, Row, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import AppoinmentTypesComp from '../../components/appoinmentTypes/AppoinmentTypesComp';
import Header from '../../components/Header/Header';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
import {useGetOneServiceQuery} from '../../redux/services/services';

const AppoinmentType = ({route}: any) => {
  const item = route.params?.name;
  const id = route.params?.id;

  const [sentedItem, setSentedItem] = useState<any[]>();

  const {
    data: isData,
    error: isError,
    isLoading: loading,
  } = useGetOneServiceQuery(id);

  useEffect(() => {
    switch (item) {
      case 'Hair Dresser':
        setSentedItem(isData?.result);

        break;
      case 'Other':
        setSentedItem(isData?.result);
        break;
      case 'Barber':
        setSentedItem(isData?.result);
        break;
      case 'Fitness Coach':
        setSentedItem(isData?.result);
        break;
      case 'Nail Technician':
        setSentedItem(isData?.result);
        break;
      case 'Combat Trainer':
        setSentedItem(isData?.result);
        break;
      case 'Yoga Teacher':
        setSentedItem(isData?.result);
        break;
      case 'Consultant':
        setSentedItem(isData?.result);
        break;
      case 'Private Tutor':
        setSentedItem(isData?.result);
        break;
      default:
      // code block
    }
  }, [item, isData]);
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <View flex={1} bg={'white'}>
      <Header load={'70'} />

      {loading === true ? (
        <ActivityIndicator size={'small'} color={'black'} />
      ) : (
        <>
          <View mx={5} mb={5}>
            <Text
              mt={5}
              ml={2}
              fontSize={22}
              fontFamily={'NotoSans-SemiBold'}
              w={'90%'}>
              {t('What type of appointments do you accept?')}
            </Text>
            <Text
              mt={2}
              mb={5}
              ml={2}
              fontSize={14}
              fontFamily={'NotoSans-Regular'}
              color={'grey.400'}>
              {t('Choose any 3')}
            </Text>
            <Row
              alignItems={'center'}
              alignSelf={currentLanguage === 'ar' ? 'flex-end' : null}
              flexDir={currentLanguage === 'ar' ? 'row-reverse' : null}
              mb={3}>
              <Text
                color={'primary.50'}
                ml={2}
                fontSize={22}
                fontFamily={'NotoSans-SemiBold'}>
                {t(item)}
              </Text>
              {item === 'Other' ? (
                <Text
                  fontSize={14}
                  color={'primary.50'}
                  alignSelf={'flex-end'}
                  ml={1}
                  fontWeight={'700'}>
                  ({t('generic')})
                </Text>
              ) : null}
              {item === 'Combat Trainer' ? (
                <Text
                  fontSize={12}
                  color={'primary.50'}
                  alignSelf={'center'}
                  ml={1}
                  fontWeight={'700'}>
                  ({t('assuming physical fitness')})
                </Text>
              ) : null}
            </Row>
            <AppoinmentTypesComp
              id={id}
              item={sentedItem}
              currentLanguage={currentLanguage}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default AppoinmentType;

const styles = StyleSheet.create({});
