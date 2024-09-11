import {View, Text, Row, HStack} from 'native-base';
import React, {useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import JdButton from '../../components/button/Buttons';
import Logo from '../../components/logo/Logo';
import Header from '../../components/Header/Header';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';

const EmailVerification = ({navigation}: any) => {
  const head = `Before continuing, we need to verify your email address. Please check your inbox for confirmation link.`;
  useEffect(() => {
    setTimeout(() => {
      let fromSignup = false;
      navigation.navigate('Welcome', fromSignup);
    }, 4000);
  });
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <View bg={'white'} flex={1}>
      <Header />
      <View mx={2} flex={1} alignItems={'center'} mt={'10%'}>
        <Logo resizeMode={'contain'} height={'25%'} width={'20%'} />
        <Text
          mt={10}
          textAlign={'center'}
          fontSize={18}
          fontFamily={'NotoSans-SemiBold'}>
          {t(head)}
        </Text>

        <Text
          mt={5}
          fontSize={14}
          fontFamily={'NotoSans-Regular'}
          color={'grey.400'}
          w={'85%'}
          textAlign={'center'}>
          {t(
            `If you don’t receive the email at example@gamil.com within an hour, we can`,
          )}
        </Text>
        <Text
          underline
          //   mt={5}
          fontSize={14}
          fontFamily={'NotoSans-Regular'}
          color={'primary.50'}
          w={'70%'}
          textAlign={'center'}>
          {t('resend it to you.')}
        </Text>
        <Text
          // mt={5}
          fontSize={14}
          fontFamily={'NotoSans-Regular'}
          w={'80%'}
          textAlign="center"
          color={'grey.400'}>
          {t('If you want to sign up to another account,')}
        </Text>
        <HStack flexDir={currentLanguage === 'ar' ? 'row-reverse' : null}>
          <Text
            // mt={5}
            fontSize={14}
            fontFamily={'NotoSans-Regular'}
            textAlign="center"
            color={'grey.400'}>
            {t(' then click on')}
          </Text>

          <Text
            underline
            ml={1}
            fontSize={14}
            fontFamily={'NotoSans-Regular'}
            textAlign="center"
            color={'primary.50'}>
            {t('this link')}
          </Text>
        </HStack>
      </View>
    </View>
  );
};

export default EmailVerification;
const styles = StyleSheet.create({
  img: {
    resizeMode: 'contain',
    marginTop: 'auto',
  },
});
