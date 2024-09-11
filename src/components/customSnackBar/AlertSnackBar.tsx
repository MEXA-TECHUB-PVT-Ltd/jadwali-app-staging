import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from 'native-base';
import {Button, Snackbar} from 'react-native-paper';

const AlertSnackBar = props => {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View
      position={'absolute'}
      bottom={16}
      flexDir={'column-reverse'}
      zIndex={1}
      // alignItems={'flex-'}

      // justifyContent={'flex-end'}
      width={'100%'}
      alignSelf={'flex-end'}>
      {/* <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button> */}
      <Snackbar
        visible={props?.visible}
        onDismiss={props?.onDismiss}
        style={{
          // position: 'absolute',
          // bottom: 20,
          alignItems: 'flex-end',
          backgroundColor: props?.message?.message ?
            (props?.message?.status === false ? '#FF3434' : '#6C3') :
            '#FF3434'
        }}
        duration={2000}>
        <Text
          style={{
            color: props?.message?.status === false ? 'white' : 'white',
          }}>
          {props?.message?.message || 'Something went wrong!'}
        </Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AlertSnackBar;
