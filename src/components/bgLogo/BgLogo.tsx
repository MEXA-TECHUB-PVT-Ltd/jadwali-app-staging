import {StyleSheet} from 'react-native';
import {View, Text, Image, HStack} from 'native-base';
import React from 'react';

const BgLogo = () => {
  return (
    // <View>
    <Image
      source={require('../../assets/bg.png')}
      //   size={'xl'}
      // w={'100%'}
      //   flex={0.3}
      h={'28%'}
      //   resizeMode={'center'}
      alt="bg"
    />
    // </View>
  );
};

export default BgLogo;

const styles = StyleSheet.create({});
