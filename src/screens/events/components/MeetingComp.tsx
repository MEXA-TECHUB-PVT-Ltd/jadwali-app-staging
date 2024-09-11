import {StyleSheet} from 'react-native';
import {
  Divider,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';

const MeetingsComp = props => {
  // const Data=[{
  //     id:1,
  //     name:'Monday',
  // }]
  const {t} = useTranslation();
  return (
    <>
      {props?.data?.map(item => {
        return (
          <Pressable
            key={item?.id}
            mt={5}
            onPress={() => {
              props?.onPress && props?.onPress(item?.name);
            }}>
            <View
              bg={'secondary'}
              p={2}
              alignItems={'center'}
              borderRadius={10}>
              <Image
                source={item?.img}
                alt={'img'}
                h={item?.id === 2 ? 10 : 50}
                w={50}
              />
              <Text
                fontSize={18}
                mt={1}
                color={'primary.50'}
                fontFamily={'NotoSans-SemiBold'}>
                {t(item?.name)}
              </Text>
              <Text
                mt={1}
                fontSize={14}
                fontFamily={'NotoSans-Regular'}
                color={'grey.400'}>
                {t('Tap to connect')}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </>
  );
};

export default MeetingsComp;

