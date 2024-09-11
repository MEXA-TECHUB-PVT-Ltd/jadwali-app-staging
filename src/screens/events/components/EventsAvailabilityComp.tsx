import { Pressable, Switch, Text, View, Row, Divider } from 'native-base';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

const EventsAvailabilityComp = props => {
  const [selectedItemArr, setSelectedItemArr] = React.useState([
    {
      day_of_week: 'Sunday',
      time_slot: [
        {
          start_time: '10:00',
          end_time: '03:00',
        },
      ],
      isAvailable: false,
    },
    {
      day_of_week: 'Monday',
      time_slot: [
        {
          start_time: '10:00',
          end_time: '03:00',
        },
      ],
      isAvailable: false,
    },
    {
      day_of_week: 'Tuesday',
      time_slot: [
        {
          start_time: '10:00',
          end_time: '03:00',
        },
      ],
      isAvailable: false,
    },
    {
      day_of_week: 'Wednesday',
      time_slot: [
        {
          start_time: '10:00',
          end_time: '03:00',
        },
      ],
      isAvailable: false,
    },
    {
      day_of_week: 'Thursday',
      time_slot: [
        {
          start_time: '10:00',
          end_time: '03:00',
        },
      ],
      isAvailable: false,
    },

    {
      day_of_week: 'Friday',
      time_slot: [
        {
          start_time: '10:00',
          end_time: '03:00',
        },
      ],
      isAvailable: false,
    },
    {
      day_of_week: 'Saturday',
      time_slot: [
        {
          start_time: '10:00',
          end_time: '03:00',
        },
      ],
      isAvailable: false,
    },
  ]);

  const [indexx, setIndexx] = React.useState(0);
  const [available, setAvailable] = React.useState(false);
  React.useEffect(() => {
    props?.availability && props?.availability(selectedItemArr);
  }, [selectedItemArr]);

  const handleColor = React.useCallback(
    async (e, index) => {
      const newObj = [...selectedItemArr];
      newObj[index].isAvailable = !e;
      setSelectedItemArr(newObj);
    },
    [selectedItemArr, indexx, available],
  );

  const { t } = useTranslation();
  return (
    <View bg={'secondary'} borderRadius={20} p={3}>
      <Row
        alignItems={'center'}
        flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
        justifyContent={'space-between'}
        mb={5}>
        <Text fontSize={16} fontFamily={'NotoSans-SemiBold'}>
          {t('United State, Time')}
        </Text>
        <Pressable
          onPress={() => {
            let fromEvent = true;
            if (props?.fromSettings === true) {
              navigation.navigate('CustomHours', fromEvent);
            } else {
              navigation.navigate('CustomHours');
            }
          }}>
          <Text
            color={'primary.50'}
            fontSize={14}
            underline
            fontFamily={'NotoSans-SemiBold'}>
            {t('Edit')}
          </Text>
        </Pressable>
      </Row>

      {selectedItemArr?.map((item, index) => {
        return (
          <Pressable
            key={item.day_of_week}
            onPress={() => {
              setAvailable(item?.isAvailable);
              setIndexx(index);
              handleColor(item?.isAvailable, index);
            }}>
            <View
              flexDir={'row'}
              justifyContent={'space-between'}
              // my={5}
              alignItems={'center'}>
              <View w={'50%'} flexDir={'row'} alignItems={'center'}>
                <Switch
                  size={Platform.OS == "ios" ? "sm" : 'md'}

                  onToggle={e => {
                    setAvailable(item?.isAvailable);
                    setIndexx(index);
                    handleColor(item?.isAvailable, index);
                  }}
                  isChecked={item?.isAvailable}
                  onThumbColor={'primary.50'}
                  offThumbColor={'red.600'}
                  onTrackColor={'primary.400'}
                />
                <Text fontSize={14} fontFamily={'NotoSans-Medium'}>
                  {t(item?.day_of_week)}
                </Text>
              </View>
              <View
                w={'50%'}
                flexDir={'row'}
                justifyContent={'space-around'}
                alignItems={'center'}>
                <View
                  bg={'white'}
                  h={8}
                  mr={2}
                  w={'90%'}
                  // rounded={'full'}
                  borderRadius={10}
                  justifyContent={'center'}>
                  {/* <DatePick color={'black'} fontSize={12} margin={10} /> */}
                  <Text
                    textAlign={'center'}
                    color={item?.isAvailable ? 'grey.400' : 'red.600'}>
                    {item?.isAvailable
                      ? `${item?.time_slot[0]?.start_time} - ${item?.time_slot[0]?.end_time}`
                      : `${t('Unavailable')}`}
                  </Text>
                </View>
                {props?.fromSettings === true ? null : (
                  <Pressable>
                    <Entypo
                      name={'plus'}
                      color={item?.isAvailable ? '#6C309C' : '#EA4335'}
                      size={25}
                    />
                  </Pressable>
                )}
              </View>
            </View>
            <Divider my={2} bg={item?.id === 7 && 'transparent'} />
          </Pressable>
        );
      })}
    </View>
  );
};

export default EventsAvailabilityComp;
