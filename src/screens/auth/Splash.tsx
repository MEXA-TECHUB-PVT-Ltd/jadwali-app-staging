import {View, Text} from 'react-native';
import React from 'react';
import Logo from '../../components/logo/Logo';

const Splash = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OnBoarding');
    }, 3000);
  }, []);
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Logo resizeMode="contain" size="lg" />
    </View>
  );
};

export default Splash;
