import {ScrollView, Text, View} from 'native-base';
import {ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import CalenderComp from '../../components/calendarComp/CalendaerComp';
import ScheduledEventsCom from './components/ScheduledEventsCom';
import {useTranslation} from 'react-i18next';
import {
  useGetOneScheduledEventQuery,
  useGetScheduleEventsQuery,
} from '../../redux/event/event';
import {useSelector} from 'react-redux';
import LoaderModal from '../../components/Loader/Loader';
import {useFocusEffect} from '@react-navigation/native';

const Schedule = () => {
  const uid = useSelector(state => state.auth.userData?.id);

  console.log(uid);
  const [limit, setLimit] = React.useState(10);
  const {
    data: sceduledData,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetScheduleEventsQuery({uid: uid, limit: limit});
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );
  console.log('object', sceduledData?.schedules[0]?.questions, error);
  const {t} = useTranslation();
  return (
    <View flex={1} bg={'white'}>
      <Text
        fontSize={22}
        fontFamily={'NotoSans-SemiBold'}
        mt={5}
        textAlign={'center'}>
        {t('Schedule Event')}
      </Text>
      {isLoading === true ? (
        <LoaderModal visible={isLoading} />
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View mx={5} my={5}>
            <CalenderComp
              fromSchedule={true}
              markedDate={
                sceduledData?.schedules?.length > 0 && sceduledData?.schedules
              }
              onDaySelect={day =>
                console.log(`Date selected: ${day.dateString}`)
              }
            />
            {sceduledData?.schedules?.length > 0 ? (
              <ScheduledEventsCom data={sceduledData?.schedules} />
            ) : (
              <Text
                mt={5}
                fontSize={16}
                fontFamily={'NotoSans-medium'}
                textAlign={'center'}>
                No schduled events to display
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({});
