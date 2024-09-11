import { Avatar, Divider, Pressable, Row, Text, View } from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../../../constants/api';
import { PicPlaceholder } from '../../../components/avatar/PicPlaceholder';
import { dateUtils } from '../../../utils/datesUtils';

const ScheduledEventsCom = props => {
  const navigation = useNavigation();
  const convertDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  const { t } = useTranslation();
  const getName = ques => {
    const filteredName = (qus = ques?.find(q => q?.type === 'name')
      ?.responses[0]?.text);
    return filteredName || '';
  };
  // const convertTime = time => {
  //   const splited = time?.split(':');
  //   console.log(splited);
  //   return `${splited[0]}: ${splited[1]}`;
  // };
  const convertTime = time => {
    const date = new Date(time);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
  };


  return (
    <>
      {props?.data?.map((item, index) => {
        const resultFortime = dateUtils(item?.scheduling_time)
        return (
          <View key={index}>
            <Text
              mt={index === 0 ? 5 : 1}
              fontSize={16}
              fontFamily={'NotoSans-SemiBold'}>
              {t('Event Scheduled')}:{' '}
              {convertDate(item?.scheduling_time?.split('T')?.[0])}
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('ScheduleEventDetail', { scheduled: item });
              }}
              my={4}
              bg={'secondary'}
              borderRadius={10}
              p={2}>
              <Row
                justifyContent={'space-between'}
                flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
                mt={2}
                alignItems={'cenetr'}>
                <Row
                  flexDir={props?.translation === 'ar' ? 'row-reverse' : null}>
                  <Text fontSize={15} fontFamily={'NotoSans-Medium'}>
                    {t('Meeting with')}{' '}
                  </Text>
                  <Text fontSize={15} fontFamily={'NotoSans-Medium'}>
                    {getName(item?.questions)}
                  </Text>
                </Row>
                {item?.user?.upload_details?.filename ? (
                  <Avatar
                    source={{
                      uri: `${API_URL}public/uploads/${item?.user?.upload_details?.filename}`,
                    }}
                    size={'sm'}
                  />
                ) : (
                  <PicPlaceholder size={18} height={8} width={8} />
                )}
              </Row>
              <Row
                justifyContent={'space-between'}
                flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
                mt={2}>
                <Text fontSize={14} fontFamily={'NotoSans-Medium'}>
                  {t('Meeting Type')}
                </Text>
                <Text
                  fontSize={14}
                  color={'grey.400'}
                  fontFamily={'NotoSans-Medium'}>
                  {t(
                    item?.event?.one_to_one === true
                      ? 'ONE-to-ONE'
                      : 'ONE-to-Many',
                  )}
                </Text>
              </Row>
              <Divider my={2} />
              <Text
                fontSize={14}
                color={'grey.400'}
                fontFamily={'NotoSans-Medium'}>
                  {resultFortime}
                {/* {convertDate(item?.scheduling_time?.split('T')?.[0])} -{' '}
                {formatedTime} */}
                {/* {convertTime(item?.scheduling_time?.split('T')?.[1])} ({item?.event?.duration}-hours) */}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </>
  );
};

export default ScheduledEventsCom;
