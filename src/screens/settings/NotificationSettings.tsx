import {Platform, StyleSheet} from 'react-native';
import {
  View,
  Text,
  Avatar,
  ScrollView,
  Stack,
  Pressable,
  Image,
  Divider,
  Row,
  Switch,
} from 'native-base';

import React from 'react';
import Header from '../../components/Header/Header';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';

const NotificationSettings = ({navigation}) => {
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <View bg={'white'} flex={1}>
      <Header title={'Notifications'} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View m={5} mt={10} mx={4}>
          <Row
            mx={2}
            alignItems={'center'}
            flexDir={currentLanguage === 'ar' ? 'row-reverse' : null}
            justifyContent={'space-between'}>
            <Text fontSize={16} fontFamily={'NotoSans-Medium'}>
              {t('Event Notification')}
            </Text>
            <Switch 
            size={Platform.OS == "ios" ? "sm" : 'md'}

            onThumbColor={'primary.50'} onTrackColor={'primary.400'} />
          </Row>
          <Divider my={4} />

          <Row
            mx={2}
            flexDir={currentLanguage === 'ar' ? 'row-reverse' : null}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Text fontSize={16} fontFamily={'NotoSans-Medium'}>
              {t('Email Notification')}
            </Text>
            <Switch 
            size={Platform.OS == "ios" ? "sm" : 'md'}

            onThumbColor={'primary.50'} onTrackColor={'primary.400'} />
          </Row>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationSettings;

const styles = StyleSheet.create({});
