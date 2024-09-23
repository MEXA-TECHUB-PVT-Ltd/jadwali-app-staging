import {StyleSheet} from 'react-native';
import {Image, Pressable, Row, ScrollView, Text, View} from 'native-base';
import React, {useTransition} from 'react';
import Header from '../../components/Header/Header';
import EventsMap from './components/eventsMap';
import CalenderComp from '../../components/calendarComp/CalendaerComp';
import JdButton from '../../components/button/Buttons';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
import {useDispatch} from 'react-redux';
import {
  setDateRange,
  setEndDate,
  setMeetingLimit,
  setStartDate,
} from '../../redux/fatures/addEvent';
import {usePostDateRangeMutation} from '../../redux/event/event';

const CustomDateRange = ({navigation, route}) => {
  const eid = route?.params?.eventId;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [postDate, {isLoading}] = usePostDateRangeMutation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  const [startDate, setstartDate] = React.useState();
  const [endDate, setendDate] = React.useState();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const time = end - start;

  const numberOfDays = Math.ceil(time / (1000 * 60 * 60 * 24));

  // Calculate the number of days by dividing the time difference by the number of milliseconds in a day
  // const numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const handleApply = async () => {
    if (numberOfDays != NaN) {
      const body = {
        event_id: eid,
        type: 'CUSTOM',
        custom_date_range: {
          start_date: startDate,
          end_date: endDate,
        },
      };
      // console.log('numberOfDays', body);
      // postDate(body).then(async res => {
      // console.log('res', res);

      await dispatch(setMeetingLimit(numberOfDays));
      await dispatch(setStartDate(startDate));
      await dispatch(setEndDate(endDate));
      await dispatch(setDateRange(body));
      navigation.goBack();

      // });
    }
  };
  return (
    <View bg={'white'} flex={1}>
      <Header title={'Custom Date Range'} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View m={5}>
          <Text
            color={'grey.400'}
            alignSelf={currentLanguage === 'ar' ? 'flex-end' : null}
            w={'90%'}
            mb={5}>
            {t('Set a range of dates when you can accept meetings')}
          </Text>
          <CalenderComp
            onDaySelect={day => {
              setstartDate(day.dateString);
            }}
          />
          <View mt={5} mb={10}>
            <CalenderComp
              onDaySelect={day => {
                setendDate(day.dateString);
              }}
            />
          </View>
          <JdButton
            title={'Apply'}
            loading={isLoading}
            onPress={() => {
              handleApply();
            }}
          />
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              textAlign="center"
              underline
              my={5}
              fontSize={18}
              fontFamily={'NotoSans-SemiBold'}
              color={'primary.500'}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomDateRange;

const styles = StyleSheet.create({});
