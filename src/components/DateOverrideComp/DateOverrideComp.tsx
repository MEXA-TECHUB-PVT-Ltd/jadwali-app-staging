import {View, Text, Row, HStack} from 'native-base';
import React from 'react';
import TimePickerComp from '../TimePickerComp/TimePickerComp';
import DatePick from '../DatePick/DatePick';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
const DateOverrideComp = props => {
  const {t} = useTranslation();
  return (
    <>
      {props?.data?.map(item => {
        return (
          <HStack
            w={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <View
              bg={'secondary'}
              key={item?.id}
              p={2}
              // mr={5}
              w={'90%'}
              mt={3}
              borderRadius={10}
              // h={'20%'}
              justifyContent={'center'}>
              <Row
                alignItems={'center'}
                // w={'80%'}
                flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
                justifyContent={'space-between'}>
                <Text fontSize={15} fontFamily={'NotoSans-Medium'}>
                  {t('Oct 2, 2023')}
                </Text>
                {/* <View
                  bg={'primary.50'}
                  // w={'55%'}
                  // mr={2}
                  rounded={'full'}
                  p={2}
                  // borderRadius={10}
                  // h={'110%'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <TimePickerComp /> */}
                <DatePick
                  fromDateOverride={true}
                  color={'white'}
                  fontSize={12}
                  margin={5}
                />
                {/* </View> */}
              </Row>
            </View>
            <View>
              <Entypo name={'circle-with-cross'} color={'black'} size={18} />
            </View>
          </HStack>
        );
      })}
    </>
  );
};
export default DateOverrideComp;
