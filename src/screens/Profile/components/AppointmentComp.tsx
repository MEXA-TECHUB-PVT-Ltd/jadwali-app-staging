import React from 'react';
import {Text, Pressable} from 'native-base';

type props = {
  onPress: () => void;
  data: object;
};

export const AppointmentComp = ({onPress, data}: props) => {
  return (
    <>
      <Pressable
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mt={6}
        mx={1}>
        <Text fontSize={16} mb={2} fontFamily={'NotoSans-SemiBold'}>
          Appoinment Types
        </Text>
      </Pressable>

      {data?.map(item => {
        return (
          <Pressable
            onPress={() => {
              onPress && onPress(item);
            }}
            my={2}
            bg={'secondary'}
            p={4}
            rounded={'full'}
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Text fontSize={16} fontFamily={'NotoSans-SemiBold'} w={'80%'}>
              {item?.service_type_name}
            </Text>
            <Text
              fontSize={12}
              underline
              color={'primary.50'}
              fontFamily={'NotoSans-SemiBold'}>
              Edit
            </Text>
          </Pressable>
        );
      })}
    </>
  );
};
