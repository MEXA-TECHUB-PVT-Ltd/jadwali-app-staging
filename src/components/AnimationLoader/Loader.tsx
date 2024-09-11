import React from 'react';
import {View} from 'native-base';
import Lottie from 'lottie-react-native';

const Loader = () => {
  return (
    <View alignSelf={'center'} mb={2}>
      <Lottie
        source={require('../../Animations/AnimationSpinner.json')}
        autoPlay
        loop
        style={{
          // marginBottom: 0,
          height: 70,
          width: 70,
          // backgroundColor: '#6C309C',
        }}
      />
    </View>
  );
};

export default Loader;
