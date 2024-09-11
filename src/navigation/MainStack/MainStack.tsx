import * as React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../../screens/auth/OnBoarding';
import SignIn from '../../screens/auth/SignIn';
import SignUp from '../../screens/auth/SignUp';
import ResetPassword from '../../screens/auth/ResetPassword';
import ForgotPassword from '../../screens/auth/ForgotPassword';
import VerifyOtp from '../../screens/auth/VerifyOtp';
import AvailabilityScreen from '../../screens/auth/AvailabilityScreen';
import Services from '../../screens/auth/Services';
import AppoinmentType from '../../screens/auth/AppoinmentType';
import Welcome from '../../screens/auth/Welcome';
import EmailVerification from '../../screens/auth/EmailVerification';
import BottomTabs from '../bottomTab/BottomTab';
import UserProfile from '../../screens/Profile/UserProfile';
import AddAvailability from '../../screens/dateOverride/AddAvailability';
import Events from '../../screens/events/Events';
import AddEvent from '../../screens/events/AddEvent';
import Location from '../../screens/events/Location';
import SceduleEvent from '../../screens/events/SceduleEvent';
import CustomDateRange from '../../screens/events/CustomDateRange';
import CustomHours from '../../screens/events/CustomHours';
import EventAdded from '../../screens/events/EventAdded';
import ScheduleEventDetail from '../../screens/schedule/ScheduleEventDetail';
import Questions from '../../screens/schedule/Questions';
import ChangePassword from '../../screens/settings/ChangePassword';
import AvalabilitySettings from '../../screens/settings/AvalabilitySettings';
import NotificationSettings from '../../screens/settings/NotificationSettings';
import Subscription from '../../screens/settings/Subscription';
import FAQS from '../../screens/settings/FAQS';
import FeedBack from '../../screens/settings/FeedBack';
import AddQuestion from '../../screens/events/AddQuestions';
import ReferalLink from '../../screens/settings/ReferalLink';
import Notifications from '../../screens/notifications/Notifications';
// import AddAvailability from '../../screens/dateOverride/AddAvailabilty';
import Maps from '../../screens/events/Map';
import messaging from '@react-native-firebase/messaging';
import OnlineLocation from '../../screens/events/OnlineLocation';
import Web from '../../screens/events/RenderWebView';
import {setPassword} from '../../redux/fatures/auth';
import {useDispatch, useSelector} from 'react-redux';
import {getStorageData} from '../../Async/AsyncStorage/AsyncStorage';
import Splash from '../../screens/auth/Splash';
import BankDetails from '../../screens/settings/BankDetails';
import {Invoice} from '../../screens/schedule/Invoice';
import WebModal from '../../screens/schedule/WebModal';
import EditAppoitmentType from '../../screens/Profile/EditAppointmentType';
import UpdateService from '../../screens/Profile/UpdateService';
export default function MainStack() {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();
  const uid = useSelector(state => state?.auth?.password);
  const [userData, setData] = React.useState();
  React.useEffect(() => {
    getUid();
    pushNoti();
  }, [uid]);
  const getUid = React.useCallback(async () => {
    const userId = await getStorageData('uid');

    await dispatch(setPassword(userId));
  }, [uid]);
  console.log(uid);
  const deviceAPiLevel = Platform.Version;

  const pushNoti = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'App needs permission to send notifications',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted');
        // Permission is granted, continue with your logic here
      } else {
        console.log('Permission denied');
        // Permission denied, handle the lack of permission here
      }
    } catch (err) {
      console.warn(err);
    }
  };
  messaging()
    .getToken()
    .then(Res => {
      console.log(Res);
    });
  // messaging().onMessage(remoteMessage => {
  //   console.log(
  //     'Notification caused app to open from background state:',
  //     remoteMessage,
  //   );
  //   // navigation.navigate(remoteMessage.data.type);
  // });
  messaging().onMessage(() => {});
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {uid ? (
            <Stack.Group>
              <Stack.Screen name="BottomTab" component={BottomTabs} />
              <Stack.Screen name="Profile" component={UserProfile} />
              <Stack.Screen
                name="AddAvailability"
                component={AddAvailability}
              />
              <Stack.Screen name="Events" component={Events} />
              <Stack.Screen name="AddEvent" component={AddEvent} />
              <Stack.Screen name="Location" component={Location} />
              <Stack.Screen name="SceduleEvent" component={SceduleEvent} />
              <Stack.Screen name="CustomDate" component={CustomDateRange} />
              <Stack.Screen name="CustomHours" component={CustomHours} />
              <Stack.Screen name="EventAdded" component={EventAdded} />
              <Stack.Screen
                name="ScheduleEventDetail"
                component={ScheduleEventDetail}
              />
              <Stack.Screen name="Questions" component={Questions} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} />
              <Stack.Screen
                name="AvalabilitySettings"
                component={AvalabilitySettings}
              />
              <Stack.Screen
                name="NotificationSettings"
                component={NotificationSettings}
              />
              <Stack.Screen name="Subscription" component={Subscription} />
              <Stack.Screen name="FAQS" component={FAQS} />
              <Stack.Screen name="FeedBack" component={FeedBack} />
              <Stack.Screen name="AddQuestion" component={AddQuestion} />
              <Stack.Screen name="ReferralLink" component={ReferalLink} />
              <Stack.Screen name="Notifications" component={Notifications} />
              <Stack.Screen name="Maps" component={Maps} />
              <Stack.Screen name="OnlineMeeting" component={OnlineLocation} />
              <Stack.Screen name="Web" component={Web} />
              <Stack.Screen name="BankDetails" component={BankDetails} />
              <Stack.Screen name="Invoice" component={Invoice} />
              <Stack.Screen name="WebView" component={WebModal} />
              <Stack.Screen
                name="EditAppointmentType"
                component={EditAppoitmentType}
              />
              <Stack.Screen name="UpdateService" component={UpdateService} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="OnBoarding" component={OnBoarding} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
              <Stack.Screen
                name="Availability"
                component={AvailabilityScreen}
              />
              <Stack.Screen name="Services" component={Services} />
              <Stack.Screen name="Appoinment" component={AppoinmentType} />
              <Stack.Screen
                name="EmailVerification"
                component={EmailVerification}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
