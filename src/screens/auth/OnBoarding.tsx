import {View, Row, Text} from 'native-base';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import JdButton from '../../components/button/Buttons';
import LanguageSelection from '../../components/languageComp/LanguageSelection';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
const OnBoarding = ({navigation}: any) => {
  const {t} = useTranslation();
  return (
    <View bg={'white'} flex={1} alignItems={'center'} justifyContent={'center'}>
      <Image
        source={require('../../assets/Jadwali-Logo.png')}
        style={styles.img}
      />
      <View mt={'25%'} mb={'18%'} alignItems={'center'}>
        <Text fontFamily={'NotoSans-SemiBold'} fontSize={22}>
          {t('Welcome To')}
        </Text>

        <Text
          fontFamily={'NotoSans-SemiBold'}
          color={'primary.50'}
          fontSize={38}>
          {t('JADWALI')}
        </Text>
      </View>
      <View w={'85%'} mb={'30%'}>
        <View>
          <JdButton
            title={t('Create an Account')}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        </View>
        <View my={5}>
          <JdButton
            title={'Sign In'}
            variant={'outline'}
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          />
        </View>

        <LanguageSelection />
      </View>
    </View>
  );
};

export default OnBoarding;
const styles = StyleSheet.create({
  img: {
    height: '15%',
    width: '20%',
    resizeMode: 'contain',
    marginTop: 'auto',
  },
  // txt: {
  //   fontFamily: 'NotoSans-Bold',
  // },
  // head: {
  //   fontSize: 38,
  //   fontFamily: 'NotoSans-Bold',
  // },
});
