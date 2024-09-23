import { Text, View} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import {useTranslation} from 'react-i18next';
import ServiceUpdateComp from './components/ServiceUpdateComp';

const UpdateService = () => {
  const {t} = useTranslation();
  return (
    <View flex={1} bg={'white'}>
      <Header title={'Edit Service'} />
      <View ml={5} mt={5} mr={5} flex={1}>
        <Text ml={2} fontSize={22} fontFamily={'NotoSans-SemiBold'} mb={5}>
          {t('What service do you offer?')}
        </Text>
        <ServiceUpdateComp />
      </View>
    </View>
  );
};

export default UpdateService;

