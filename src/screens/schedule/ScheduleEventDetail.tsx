import {ScrollView, Text, View, Row, Image} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import ScheduleOneEvent from './components/ScheduleOneEvent';
import JdButton from '../../components/button/Buttons';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';


const ScheduleEventDetail = ({route, navigation}) => {
  const eventDetail = route?.params.scheduled;
  console.log("=======",eventDetail);

  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <View flex={1} bg={'white'}>
      <Header title={'Schedule Event'} />

      <View my={5} flex={1}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <ScheduleOneEvent translation={currentLanguage} data={eventDetail} />
          {/* <View bg={'secondary'} p={2} mx={5} borderRadius={10}>
            <Row
              alignItems={'center'}
              flexDir={currentLanguage === 'ar' ? 'row-reverse' : null}
              justifyContent={'space-between'}>
              <Row
                ml={2}
                flexDir={currentLanguage === 'ar' ? 'row-reverse' : null}
                alignItems={'center'}>
                <Image
                  source={require('../../assets/payment.png')}
                  h={5}
                  w={5}
                  ml={2}
                  alt={'img'}
                />
                <Text ml={4} fontSize={16} fontFamily={'NotoSans-SemiBold'}>
                  {t('Payment method')}
                </Text>
              </Row>
            </Row>
            <Text
              mt={5}
              mb={2}
              fontSize={14}
              fontFamily={'NotoSans-Regular'}
              textAlign={'center'}>
              {t('20% payment already desposited')}
            </Text>
          </View> */}
          {/* <View mx={5} mt={5}>
            <JdButton
              title={'Get Invoice'}
              onPress={() => {
                navigation.navigate('Invoice', {eventDetail});
              }}
            />
          </View> */}
        </ScrollView>
      </View>
    </View>
  );
};

export default ScheduleEventDetail;
