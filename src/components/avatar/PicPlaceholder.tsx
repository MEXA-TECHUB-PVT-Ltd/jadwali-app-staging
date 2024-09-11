import React from 'react';
import {View} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type props = {
  height: number;
  width: number;
  size: number;
};
export const PicPlaceholder = ({height, width, size}: props) => {
  return (
    <View
      bg={'white'}
      h={height}
      w={width}
      borderColor={'primary.400'}
      borderWidth={1}
      rounded={'full'}
      alignItems={'center'}
      justifyContent={'center'}>
      <FontAwesome size={size} name={'user-o'} color={'#6c309c'} />
    </View>
  );
};
