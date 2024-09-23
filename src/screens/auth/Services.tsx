import {StyleSheet} from 'react-native';
import {ScrollView, Text, View} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import ServicesComponent from '../../components/services/ServicesComponent';
import JdButton from '../../components/button/Buttons';
import {useTranslation} from 'react-i18next';

const Services = () => {
  const {t} = useTranslation();
  return (
    <View flex={1} bg={'white'}>
      <Header load={'30'} />
      {/* <ScrollView> */}
      <View ml={5} mt={5} mr={5} flex={1}>
        <Text ml={2} fontSize={22} fontFamily={'NotoSans-SemiBold'} mb={5}>
          {t('What service do you offer?')}
        </Text>
        <ServicesComponent />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
