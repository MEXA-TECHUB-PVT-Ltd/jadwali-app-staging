import {StyleSheet} from 'react-native';
import {View, Text, ScrollView} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import ActiveHours from '../../components/Availabiltymodule/ActiveHours';
import JdButton from '../../components/button/Buttons';
import {useTranslation} from 'react-i18next';
import {useGetAllEventDataQuery} from '../../redux/event/event';

const CustomHours = ({navigation, route}: any) => {
  const fromEvent = route?.params?.fromEvent;
  const eventId = route?.params?.eventId;
  const fromEdit = route?.params?.fromEdit;
  const fromDateOverride = route?.params?.fromDateOverride;
  const userAvailability = route?.params?.availability;
  const {
    data: AllEventData,
    error: EventDataError,
    isLoading: eventDataloading,
  } = useGetAllEventDataQuery(eventId);

  const days = [
    {
      id: 1,
      name: 'Sundays',
    },
    {
      id: 2,
      name: 'Mondays',
    },
    {
      id: 3,
      name: 'Tuesdays',
    },
    {
      id: 4,
      name: 'Wednesdays',
    },
    {
      id: 5,
      name: 'Thursdays',
    },

    {
      id: 6,
      name: 'Fridays',
    },
    {
      id: 7,
      name: 'Saturdays',
    },
  ];
  const {t} = useTranslation();
  return (
    <View flex={1} bg={'white'}>
      <Header
        title={
          fromEvent || fromEdit || fromDateOverride
            ? 'Edit Availability'
            : 'Custom Hours'
        }
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <Text
        w={'90%'}
        mx={5}
        mb={'5%'}
        // mt={7}
        fontFamily={'NotoSans-Regular'}
        fontSize={14}
        color={'grey.400'}>
        {t('Set typical weekly hours and add overrides for specific dates')}
      </Text>
      <View mx={5}>
        {fromDateOverride ? (
          <ActiveHours
            days={days}
            userDeafult={userAvailability}
            fromDateOverride={true}
          />
        ) : (
          <ActiveHours
            days={days}
            // userDeafult={userAvailability}
            // fromDateOverride={true}
            fromEditCustom={true}
            userDeafult={AllEventData?.result?.availability_profiles}
            editAvailability={true}
            fromSchedule={false}
            eventId={eventId}
            fromEdit={fromEdit}
            // fromSchedule={true}
          />
        )}
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default CustomHours;

const styles = StyleSheet.create({});
