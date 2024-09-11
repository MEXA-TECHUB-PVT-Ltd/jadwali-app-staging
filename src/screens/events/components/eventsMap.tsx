import {StyleSheet} from 'react-native';
import {Divider, Row, ScrollView, Text, View} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';

const EventsMap = props => {
  // const Data=[{
  //     id:1,
  //     name:'Monday',
  // }]
  const {t} = useTranslation();
  return (
    <>
      {props?.data?.map(item => {
        return (
          <>
            <Row
              justifyContent={'space-between'}
              flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
              mt={2}>
              <Text
                fontSize={15}
                color={'grey.400'}
                fontFamily={'NotoSans-Medium'}>
                {t(item?.name)}
              </Text>
              <Text
                fontSize={15}
                color={'grey.400'}
                fontFamily={'NotoSans-Medium'}>
                {`${item?.startTime} ${t(item?.am)} - ${item?.endTime} ${t(
                  item?.pm,
                )}`}
              </Text>
            </Row>
            <Divider color={'grey.400'} mt={2} />
          </>
        );
      })}
    </>
  );
};

export default EventsMap;

const styles = StyleSheet.create({});
