import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SignIn from '../../screens/auth/SignIn';
import SignUp from '../../screens/auth/SignUp';
import OnBoarding from '../../screens/auth/OnBoarding';
import HomeScreen from '../../screens/Dashboard/HomeScreen';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Schedule from '../../screens/schedule/Schedule';
import DateOverride from '../../screens/dateOverride/DateOverride';
import Settings from '../../screens/settings/Settings';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#6C309C',
        // tabBarShowLabel: false,
        tabBarStyle: [
          {
            backgroundColor: 'white',
            marginTop: 5,
            // height: '8%',
          },
        ],
      }}>
      <Tab.Screen
        name={t('Home')}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View alignItems={'center'} justifyContent={'center'}>
              <Octicons
                name="home"
                size={22}
                style={{color: focused ? '#6C309C' : '#748c94'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={t('Schedule')}
        component={Schedule}
        options={{
          tabBarIcon: ({focused}) => (
            <View alignItems={'center'} justifyContent={'center'}>
              {!focused ? (
                <Image
                  source={require('../../assets/unselectedSchedule.png')}
                  h={6}
                  w={6}
                  alt="png"
                />
              ) : (
                <Image
                  source={require('../../assets/selectedSchedule.png')}
                  h={6}
                  w={6}
                  alt="png"
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={t('Adjust Availability')}
        component={DateOverride}
        options={{
          tabBarIcon: ({focused}) => (
            <View alignItems={'center'} justifyContent={'center'}>
              {focused ? (
                <Image
                  source={require('../../assets/selectedCalendar.png')}
                  h={6}
                  w={6}
                  alt="png"
                />
              ) : (
                <Image
                  source={require('../../assets/unselectedCalendar.png')}
                  h={6}
                  w={6}
                  alt="png"
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={t('Settings')}
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <View alignItems={'center'} justifyContent={'center'}>
              <Feather
                name="settings"
                size={22}
                style={{color: focused ? '#6C309C' : '#748c94'}}
              />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="AllOrders"
        component={TotalBookings}
        options={{
          tabBarIcon: ({focused}) => (
            <View alignItems={'center'} justifyContent={'center'}>
              <Icon
                name="shoppingcart"
                size={25}
                style={{color: focused ? 'white' : '#748c94'}}
              />
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTabs;
