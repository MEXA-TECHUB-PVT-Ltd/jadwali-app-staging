import {
  View,
  Text,
  ScrollView,
  Row,
  Image,
  Pressable,
  Button,
  Divider,
  Avatar,
} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import {Share} from 'react-native';

const ReferalLink = () => {
  const [visible, setVisible] = React.useState(false);
  const [pressed, setPressed] = React.useState(1);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share link copied from JadWali',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const data = [
    {
      id: 1,
      name: 'John',
      email: 'John@example.com',
      status: 'pending',
      img: require('../../assets/d1.png'),
    },
    {
      id: 2,
      name: 'John',
      email: 'John@example.com',
      status: 'pending',
      img: require('../../assets/d2.png'),
    },
    {
      id: 3,
      name: 'John',
      email: 'John@example.com',
      status: 'pending',
      img: require('../../assets/d3.png'),
    },
    {
      id: 4,
      name: 'John',
      email: 'John@example.com',
      status: 'pending',
      img: require('../../assets/d4.png'),
    },
    {
      id: 5,
      name: 'John',
      email: 'John@example.com',
      status: 'sent',
      img: require('../../assets/d5.png'),
    },
    {
      id: 6,
      name: 'John',
      email: 'John@example.com',
      status: 'pending',
      img: require('../../assets/d6.png'),
    },
    {
      id: 7,
      name: 'John',
      email: 'John@example.com',
      status: 'completed',
      img: require('../../assets/d7.png'),
    },
    {
      id: 8,
      name: 'John',
      email: 'John@example.com',
      status: 'completed',
      img: require('../../assets/d8.png'),
    },
    {
      id: 9,
      name: 'John',
      email: 'John@example.com',
      status: 'completed',
      img: require('../../assets/d9.png'),
    },
    {
      id: 10,
      name: 'John',
      email: 'John@example.com',
      status: 'completed',
      img: require('../../assets/d10.png'),
    },
  ];

  const RenderData = () => {
    return (
      <View my={5}>
        {data?.map(item => {
          return (
            <>
              {pressed === 1 && (
                <View key={item?.id}>
                  <Row alignItems={'center'} ml={2}>
                    <Avatar source={item?.img} size={'md'} />
                    <View ml={2}>
                      <Text mb={1} fontFamily={'NotoSans-SemiBold'}>
                        {item?.name}
                      </Text>
                      <Text color={'grey.400'} fontFamily={'NotoSans-Regular'}>
                        {item?.email}
                      </Text>
                    </View>
                  </Row>
                  <Divider my={3} />
                </View>
              )}
              {pressed === 2 && item?.status === 'pending' && (
                <View key={item?.id}>
                  <Row alignItems={'center'} ml={2}>
                    <Avatar source={item?.img} size={'md'} />
                    <View ml={2}>
                      <Text mb={1} fontFamily={'NotoSans-SemiBold'}>
                        {item?.name}
                      </Text>
                      <Text color={'grey.400'} fontFamily={'NotoSans-Regular'}>
                        {item?.email}
                      </Text>
                    </View>
                  </Row>
                  <Divider my={3} />
                </View>
              )}
              {pressed === 3 && item?.status === 'completed' && (
                <View key={item?.id}>
                  <Row alignItems={'center'} ml={2}>
                    <Avatar source={item?.img} size={'md'} />
                    <View ml={2}>
                      <Text mb={1} fontFamily={'NotoSans-SemiBold'}>
                        {item?.name}
                      </Text>
                      <Text color={'grey.400'} fontFamily={'NotoSans-Regular'}>
                        {item?.email}
                      </Text>
                    </View>
                  </Row>
                  <Divider my={3} />
                </View>
              )}
            </>
          );
        })}
      </View>
    );
  };

  return (
    <View bg={'white'} flex={1}>
      <Header title={'Referral Link'} />
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
        }}
        messageDescription={'Link copied successfully'}
      />
      <View m={5}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text
            color={'grey.400'}
            fontSize={14}
            fontFamily={'NotoSans-Regular'}
            mr={5}>
            You will get one month free subscription on each converstion
          </Text>
          <View bg={'secondary'} p={4} rounded={'full'} mt={5}>
            <Row alignItems={'center'}>
              <Image
                source={require('../../assets/link.png')}
                alt={'refer'}
                h={5}
                w={5}
                resizeMode="contain"
              />
              <Text color={'black'} fontSize={14} ml={2} numberOfLines={1}>
                https://mtechub.org/mail/?_task=mail&_mbox=INBOX
              </Text>
            </Row>
          </View>
          <Row alignItems={'center'} justifyContent={'center'} mt={5}>
            <View
              bg={'primary.50'}
              rounded={'full'}
              flexDir={'row'}
              p={2}
              // alignItems={'center'}
              justifyContent={'center'}>
              <Pressable
                mx={1}
                onPress={() => setVisible(true)}
                alignItems={'center'}
                flexDir={'row'}>
                <Image
                  source={require('../../assets/copy.png')}
                  h={4}
                  w={4}
                  alt={'copy'}
                  resizeMode="contain"
                />
                <Text
                  ml={3}
                  fontSize={14}
                  color={'white'}
                  fontFamily={'NotoSans-SemiBold'}>
                  Copy Link
                </Text>
              </Pressable>
            </View>
            <View
              ml={5}
              bg={'primary.50'}
              alignItems={'center'}
              justifyContent={'center'}
              rounded={'full'}
              flexDir={'row'}
              p={2}>
              <Pressable
                mx={1}
                onPress={() => onShare()}
                alignItems={'center'}
                flexDir={'row'}>
                <Image
                  source={require('../../assets/share.png')}
                  h={4}
                  alt={'share'}
                  w={4}
                  resizeMode="contain"
                />
                <Text
                  ml={3}
                  fontSize={14}
                  color={'white'}
                  fontFamily={'NotoSans-SemiBold'}>
                  Share Link
                </Text>
              </Pressable>
            </View>
          </Row>
          <View
            mt={10}
            style={{
              backgroundColor: '#F2F2F2',
              borderRadius: 20,

              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 5,
              }}>
              <Button
                bg={pressed !== 1 ? 'transparent' : 'primary.50'}
                _text={{
                  color: pressed !== 1 ? '#979797' : 'white',
                  fontSize: 14,
                }}
                rounded={'full'}
                w={'34%'}
                onPress={() => {
                  setPressed(1);
                }}>
                Link Sent
              </Button>
              <Button
                bg={pressed !== 2 ? 'transparent' : 'primary.50'}
                _text={{
                  color: pressed !== 2 ? '#979797' : 'white',
                  fontSize: 14,
                }}
                rounded={'full'}
                w={'34%'}
                onPress={() => {
                  setPressed(2);
                }}>
                Pending
              </Button>
              <Button
                bg={pressed !== 3 ? 'transparent' : 'primary.50'}
                _text={{
                  color: pressed !== 3 ? '#979797' : 'white',
                  fontSize: 14,
                }}
                rounded={'full'}
                w={'34%'}
                // mr={5}
                onPress={() => {
                  setPressed(3);
                }}>
                Completed
              </Button>
            </View>
          </View>
          <RenderData />
        </ScrollView>
      </View>
    </View>
  );
};

export default ReferalLink;
