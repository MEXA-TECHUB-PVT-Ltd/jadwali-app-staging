import {View} from 'native-base';
import React from 'react';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';

const Web = ({route}) => {
  const platform = route?.params?.platform;
  const uid = useSelector(state => state?.auth?.userData?.id);

  return (
    <View flex={1} bg={'white'}>
      <WebView
        source={{
          uri: `https://jadwali-be.mtechub.com/api/platform/type/${platform}?user_id=${uid}`,
        }}
        style={{flex: 1}}
      />
    </View>
  );
};
export default Web;
