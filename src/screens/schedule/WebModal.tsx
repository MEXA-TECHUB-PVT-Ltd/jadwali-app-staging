import {View, Text} from 'native-base';
import React from 'react';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import Header from '../../components/Header/Header';
import JdButton from '../../components/button/Buttons';

const WebModal = ({route, navigation}) => {
  const url = route?.params?.url;
  const uid = useSelector(state => state?.auth?.userData?.id);

  return (
    <View flex={1} bg={'white'}>
      <View position={'absolute'} top={0} zIndex={999}>
        <Header />
      </View>
      <WebView
        source={{
          uri: url,
        }}
        style={{flex: 1}}
        onMessage={e => {
          console.log('Message received', e);
        }}
      />
      <View
        position={'absolute'}
        bottom={10}
        zIndex={999}
        w={'80%'}
        alignSelf={'center'}>
        <Text
          fontSize={16}
          textAlign={'center'}
          fontFamily={'NotoSans-Medium'}
          color={'black'}>
          Press if the Transaction is completed
        </Text>
        <JdButton
          title={'Go Back'}
          onPress={() => {
            navigation.navigate('BottomTab', {screen: 'Schedule'});
          }}
        />
      </View>
    </View>
  );
};
export default WebModal;
