import React from 'react';
import {Button, View} from 'native-base';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';

const JdButton = props => {
  const {t} = useTranslation();

  return (
    <View>
      {props.variant === 'outline' ? (
        <Button
          _pressed={{backgroundColor: 'transparent'}}
          onPress={props.onPress}
          variant={props.variant}
          rounded={'full'}
          borderColor={'primary.50'}
          _text={{fontSize: 16, fontFamily: 'NotoSans-Medium'}}>
          {t(props.title)}
        </Button>
      ) : (
        <Button
          _pressed={{backgroundColor: 'primary.50'}}
          isDisabled={props.isDisabled}
          variant={props.variant}
          bg={'primary.50'}
          onPress={props.onPress}
          _text={{
            fontSize: props?.fontSize ? props?.fontSize : 16,
            fontFamily: 'NotoSans-SemiBold',
          }}
          rounded={'full'}>
          {props?.loading === true ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            `${t(props.title)}`
          )}
        </Button>
      )}
    </View>
  );
};
export default JdButton;
