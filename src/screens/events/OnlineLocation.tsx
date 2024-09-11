import {View, Text} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import MeetingsComp from './components/MeetingComp';
import {useSelector} from 'react-redux';
import {
  useAddLocationMutation,
  useGetPlatformMutation,
} from '../../redux/event/event';
import {Linking} from 'react-native';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';

const OnlineLocation = ({navigation, route}) => {
  const eventId = route?.params?.eventId;
  const [modal,setModal]=React.useState(false)
  const uid = useSelector(state => state?.auth?.userData?.id);

  const [platform, setPlatform] = React.useState('');
  const access_token = useSelector(state => state?.auth.userData);
  console.log(access_token);
  const [
    postLocation,
    {isData: locationData, isError: locError, isLoading: locLoading},
  ] = useAddLocationMutation();
  const [GetPlatform, {data: isData, isError, isLoading}] =
    useGetPlatformMutation();
  React.useEffect(() => {}, [isError, isData, isLoading]);

  const data = [
    {
      id: 2,
      name: 'Google Meet',
      img: require('../../assets/googleMeet.png'),
    },

    {
      id: 3,
      name: 'Zoom',
      img: require('../../assets/zoom.png'),
    },
  ];
  return (
    <View bg={'white'} flex={1}>
      <Header title={'Online Meeting'} />

      <View flex={1}>
        <MeetingsComp
          data={data}
          onPress={async select => {
            let body = {
              type: 'online',
              event_id: eventId,
              platform_name: select === 'Zoom' ? 'zoom' : 'google',
            };
            postLocation(body).then(async res => {
              console.log(res);
              if (res?.data?.status === true) {
                if (!access_token?.zoom_access_token && select === 'Zoom') {
                  await Linking.openURL(
                    `https://jadwali-be.mtechub.com/api/platform/type/${
                      select === 'Zoom' ? 'zoom' : 'google'
                    }?user_id=${uid}`,
                  );
                } else if (
                  !access_token?.google_access_token &&
                  select === 'Google Meet'
                ) {
                  await Linking.openURL(
                    `https://jadwali-be.mtechub.com/api/platform/type/${
                      select === 'Zoom' ? 'zoom' : 'google'
                    }?user_id=${uid}`,
                  );
                }
                else{
                  setModal(true);
                }
              }
            });

            // navigation.navigate('Web');
          }}
        />
      </View>
       <CustomSnackbar
        message={'Success'}
        visible={modal}
        // translation={currentLanguage}
        height={'8%'}
        onDismiss={() => {
          setModal(false);
          navigation.goBack();
          // navigation.navigate('SignIn');
        }}
        messageDescription={'Already Connected press continue to create event'}
      />
    </View>
  );
};

export default OnlineLocation;
