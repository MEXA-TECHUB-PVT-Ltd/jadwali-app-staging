import { StyleSheet } from 'react-native';
import {
  Input,
  Pressable,
  Row,
  Text,
  View,
  Select,
  CheckIcon,
} from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { setDateRange, setDefaultDate } from '../../../redux/fatures/addEvent';
import { useDispatch, useSelector } from 'react-redux';

const DateType = props => {
  const [selected, setSelected] = React.useState(1);
  const days = useSelector(state => state.event?.meetingLimit);
  const startDate = useSelector(state => state.event?.start_date);
  const endDate = useSelector(state => state.event?.end_date);
  const dispatch = useDispatch();
  let [service, setService] = React.useState('key0');
  const [meetingRange, setMeetingRange] = React.useState('60');

  const getFutureDateExcludingWeekends = React.useCallback(
    async days => {
      if (parseInt(days) > 60) {
        // Alert the user or handle the error in any desired way
        console.log("Meeting range cannot be more than 60 days.");
        return;
      }


      setMeetingRange(days);
      const currentDate = new Date();
      let count = 0;

      while (count < days) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (service === 'key1') {
          if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            // 0 is Sunday, 6 is Saturday
            count++;
          }
        } else {
          count++;
        }
      }
      const formattedDate = currentDate.toISOString().split('T')[0];

      let body = {
        type: 'AVAILABLE_DAYS',
        event_id: props?.eid,

        custom_date_range: {
          start_date: new Date().toISOString().split('T')[0],
          end_date: formattedDate,
        },
      };

      await dispatch(setDateRange(body));

      return currentDate;
    },
    [meetingRange],
  );
  // const futureDate = getFutureDateExcludingWeekends(10);
  // const formattedDate = futureDate.toISOString().split('T')[0];
  // console.log(`the days from now, excluding weekends, is: ${formattedDate}`);
  const handleSelection = async id => {
    setSelected(id);
    if (id === 3) {
      let body = {
        event_id: props?.eid,
        type: 'FUTURE',
        into_future: true,
        custom_date_range: {
          start_date: new Date().toISOString().split('T')[0],
          end_date: null,
        },
      };
      await dispatch(setDateRange(body));
    }
  };
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View mt={1} ml={1}>
      {props?.opt?.map(item => {
        return (
          <Pressable
            onPress={() => {
              dispatch(setDefaultDate(item?.name));
              handleSelection(item?.id);
            }}
            key={item?.id}>
            {item?.id == 1 && props.eventData.into_future == false ? (
              <>
                <Row
                  mt={5}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  w={'100%'}>
                  <View
                    bg={selected === item?.id ? 'primary.50' : 'secondary'}
                    h={3}
                    w={3}
                    rounded={'full'}
                  />
                  <Input
                    w={'30%'}
                    borderWidth={0}
                    bg={'secondary'}
                    value={meetingRange}
                    onChangeText={txt => getFutureDateExcludingWeekends(txt)}
                    rounded={'full'}
                    p={2}
                    fontSize={14}
                    fontFamily={'NotoSans-Medium'}
                    textAlign={'center'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  />
                  <Select
                    onValueChange={itemValue => setService(itemValue)}
                    selectedValue={service}
                    borderWidth={0}
                    bg={'secondary'}
                    rounded={'full'}
                    flex={0.8}
                    fontSize={14}
                    fontFamily={'NotoSans-Medium'}
                    borderColor={'primary.50'}
                    placeholder="Calendar Days"
                    dropdownIcon={
                      <AntDesign
                        color={'black'}
                        size={15}
                        name={'down'}
                        style={{ marginRight: 15 }}
                      />
                    }
                    _item={{ _text: { fontSize: 14 } }}
                    _selectedItem={{
                      _text: { color: 'primary.50' },
                      endIcon: (
                        <CheckIcon
                          size="5"
                          position={'absolute'}
                          right={2}
                          color={'primary.50'}
                        />
                      ),
                    }}
                    // _actionSheet={{height: 10}}
                    // _actionSheetContent={{height: 40}}
                    // _actionSheetBody={{b}}

                    defaultValue="key0"
                    mode="dropdown">
                    <Select.Item label="Calendar Days" value="key0" p={2} />
                    <Select.Item label="Working Days" value="key1" p={2} />
                  </Select>
                </Row>
                <Text
                  mx={5}
                  fontSize={15}
                  fontFamily={'NotoSans-Regular'}
                  color={selected === item?.id ? 'primary.50' : 'grey.400'}>
                  {t(item?.name)}
                </Text>
              </>
            ) : (
              <View mt={2}>
                <Row
                  alignItems={'center'}
                  flexDir={props?.translation === 'ar' ? 'row-reverse' : null}>
                  <View
                    bg={selected === item?.id ? 'primary.50' : 'secondary'}
                    h={3}
                    w={3}
                    rounded={'full'}
                  />
                  <Text
                    mx={5}
                    fontSize={15}
                    fontFamily={'NotoSans-Regular'}
                    color={selected === item?.id ? 'primary.50' : 'grey.400'}>
                    {t(item?.name)}
                  </Text>
                </Row>
                {selected === item?.id && selected === 2 ? (
                  <Pressable
                  // onPress={() => {
                  //   navigation.navigate('CustomDate', {eventId: props?.eid}
                  //   );
                  // }}
                  >
                    <Input
                      w={'70%'}
                      ml={5}
                      onPressIn={() => navigation.navigate('CustomDate', { eventId: props?.eid })}
                      mt={2}
                      color={'black'}
                      // placeholder={'CustomDate'}
                      value={
                        Object.keys(startDate)?.length === 0 &&
                          Object.keys(endDate)?.length === 0
                          ? ''
                          : `${startDate} to ${endDate}`
                      }
                      bg={'secondary'}
                      rounded={'full'}
                      p={2}
                      textAlign={'center'}
                      alignItems={'center'}
                      isReadOnly
                      justifyContent={'center'}>
                      {/* <Text
                color={'grey.400'}
                fontSize={16}
                // mx={8}
                fontFamily={'NotoSans-Regular'}>
                {days ? `${days}` : AllEventData?.result?.invite_in}
              </Text> */}
                    </Input>
                  </Pressable>
                ) : null}
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default DateType;

const styles = StyleSheet.create({});
