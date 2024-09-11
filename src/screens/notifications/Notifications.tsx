import {View, Text, ScrollView, Pressable} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import React from 'react';

const Notifications = ({navigation, route}) => {
  const fromHome = route?.params?.fromHome;
  const data = [
    {
      id: 1,
      title: 'John arranged a meeting',
      message: 'John and you were scheduled for meeting',
      time: '12:20 AM',
      img: require('../../assets/d6.png'),
      status: 'early',
    },
    {
      id: 2,
      title: 'John arranged a meeting',
      message: 'John and you were scheduled for meeting',
      time: '12:20 AM',
      img: require('../../assets/d6.png'),
      status: 'early',
    },
    {
      id: 3,
      title: 'John arranged a meeting',
      message: 'John and you were scheduled for meeting',
      time: '12:20 AM',
      img: require('../../assets/d6.png'),
    },
    {
      id: 4,
      title: 'John arranged a meeting',
      message: 'John and you were scheduled for meeting',
      time: '12:20 AM',
      img: require('../../assets/d6.png'),
    },
    {
      id: 5,
      title: 'John arranged a meeting',
      message: 'John and you were scheduled for meeting',
      time: '12:20 AM',
      img: require('../../assets/d6.png'),
    },
    {
      id: 6,
      title: 'John arranged a meeting',
      message: 'John and you were scheduled for meeting',
      time: '12:20 AM',
      img: require('../../assets/d6.png'),
    },
    {
      id: 7,
      title: 'John arranged a meeting',
      message: 'John and you were scheduled for meeting',
      time: '12:20 AM',
      img: require('../../assets/d6.png'),
    },
    {
      id: 8,
      title: 'John arranged a meeting',
      message: 'John and you were scheduled for meeting',
      time: '12:20 AM',
      img: require('../../assets/d6.png'),
    },
    {
      id: 9,
      title: 'John arranged a meeting',
      message: 'John and you were scheduled for meeting',
      time: '12:20 AM',
      img: require('../../assets/d6.png'),
    },
  ];
  return (
    <View flex={1} bg={'white'}>
      <View
        mt={6}
        ml={3}
        mb={5}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Pressable
          onPress={() => {
            if (fromHome) {
              navigation.goBack();
            } else {
              navigation.navigate('BottomTab', {screen: 'Home'});
            }
          }}>
          <Entypo name={'chevron-left'} size={30} color={'#3D3D3D'} />
        </Pressable>

        <Text fontSize={22} fontFamily={'NotoSans-SemiBold'}>
          Notifications
        </Text>
        {/* <Pressable onPress={() => navigation.goBack()}> */}
        <Entypo name="chevron-left" size={30} color={'transparent'} />
        {/* </Pressable> */}
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View m={5}>
          {/* <NotifiComp data={data} /> */}
          <Text
            fontSize={16}
            fontFamily={'NotoSans-Medium'}
            textAlign={'center'}>
            No notifications to display
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default Notifications;
