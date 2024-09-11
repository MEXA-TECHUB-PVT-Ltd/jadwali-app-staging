import {
  View,
  Text,
  Row,
  Divider,
  VStack,
  HStack,
  Box,
  Alert,
} from 'native-base';
import React from 'react';
import JdButton from '../../components/button/Buttons';
import {ImageBackground} from 'react-native';
import Header from '../../components/Header/Header';
import {useUpdatePaymentMutation} from '../../redux/event/event';
import {useToast} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

export const Invoice = ({route, navigation}) => {
  const eventDetail = route.params?.eventDetail;
  const toast = useToast();

  console.log(eventDetail);
  const remaining =
    eventDetail?.event.event_price - eventDetail?.event.deposit_price;
  const [updatePayment, {isLoading}] = useUpdatePaymentMutation();
  const getName = ques => {
    const filteredName = (qus = ques?.find(q => q?.type === 'name')
      ?.responses[0]?.text);
    return filteredName;
  };
  const handlePayment = () => {
    if (eventDetail.payment_status === false) {
      toast.show({
        render: () => {
          return (
            <Alert
              maxWidth="80%"
              alignSelf="center"
              flexDirection="row"
              status={'success'}
              bg={'green.400'}
              variant={'Solid'}>
              <VStack space={1} flexShrink={1} w="100%">
                <HStack
                  flexShrink={1}
                  alignItems="center"
                  justifyContent="space-between">
                  <HStack space={2} flexShrink={1} alignItems="center">
                    <Alert.Icon color={'white'} size={'md'} />
                    <Text
                      fontSize={16}
                      fontFamily={'NotoSans-Bold'}
                      flexShrink={1}>
                      Paid
                    </Text>
                  </HStack>
                </HStack>
                <Text
                  px="2"
                  fontFamily={'NotoSans-Medium'}
                  textAlign={'center'}
                  fontSize={12}>
                  Event Price paid Successfully
                </Text>
              </VStack>
            </Alert>
          );
        },
      });
    } else {
      let body = {
        schedule_id: eventDetail.id,
        remaining_payment: remaining,
        event_name: eventDetail.event?.name,
      };
      console.log(body);
      updatePayment(body).then(res => {
        console.log('res', res);
        if (res?.data?.status === true) {
          navigation.navigate('WebView', {url: res.data.result.redirectUrl});
        }
      });
    }
  };
  console.log(eventDetail);
  return (
    <View bg={'white'} flex={1}>
      <View bg={'primary.20'} mb={0}>
        <Header title={'Invoice'} />
      </View>

      <View
        flex={0.5}
        mt={0}
        bg={'primary.20'}
        alignItems={'center'}
        justifyContent={'center'}>
        <ImageBackground
          source={require('../../assets/invoice.png')}
          style={{height: 300, width: 300, justifyContent: 'center'}}
          imageStyle={{resizeMode: 'contain'}}>
          <View mx={5}>
            <Row alignItems={'center'} justifyContent={'space-between'}>
              <Text
                fontSize={16}
                fontFamily={'NotoSans-SemiBold'}
                textAlign={'center'}>
                Name
              </Text>
              <Text
                fontSize={15}
                fontFamily={'NotoSans-Medium'}
                color={'primary.50'}>
                {getName(eventDetail.questions)}
              </Text>
            </Row>
            <Row alignItems={'center'} justifyContent={'space-between'}>
              <Text
                fontSize={16}
                fontFamily={'NotoSans-SemiBold'}
                textAlign={'center'}>
                Date and Time
              </Text>
              <Text
                fontSize={15}
                fontFamily={'NotoSans-Medium'}
                color={'primary.50'}>
                {eventDetail.scheduling_time?.split('T')?.[0]}
              </Text>
            </Row>
            <Row alignItems={'center'} justifyContent={'space-between'}>
              <Text
                fontSize={16}
                fontFamily={'NotoSans-Bold'}
                textAlign={'center'}>
                Meeting type
              </Text>
              <Text
                fontSize={15}
                fontFamily={'NotoSans-Medium'}
                color={'primary.50'}>
                {eventDetail?.event?.one_to_one === true
                  ? 'One-to-One'
                  : 'One-to-Many'}
              </Text>
            </Row>
            <Row alignItems={'center'} justifyContent={'space-between'}>
              <Text
                fontSize={16}
                fontFamily={'NotoSans-Bold'}
                textAlign={'center'}>
                Event Price
              </Text>
              <Text
                fontSize={15}
                fontFamily={'NotoSans-Medium'}
                color={'primary.50'}>
                $ {eventDetail?.event?.event_price}
              </Text>
            </Row>
            <Row alignItems={'center'} justifyContent={'space-between'}>
              <Text
                fontSize={16}
                fontFamily={'NotoSans-Bold'}
                textAlign={'center'}>
                Deposit Price
              </Text>
              <Text
                fontSize={15}
                fontFamily={'NotoSans-Medium'}
                color={'primary.50'}>
                $ {eventDetail?.event?.deposit_price}
              </Text>
            </Row>
            <Divider bg={'black'} mt={5} />
            <Row alignItems={'center'} justifyContent={'space-between'} mt={5}>
              <Text
                fontSize={16}
                fontFamily={'NotoSans-Bold'}
                textAlign={'center'}>
                Total Amount
              </Text>
              {eventDetail?.is_deposit_paid ? (
                <Text
                  fontSize={16}
                  fontFamily={'NotoSans-Bold'}
                  color={'red.500'}>
                  {eventDetail?.event?.event_price -
                    eventDetail?.event?.deposit_price}{' '}
                  EGP
                </Text>
              ) : (
                <Text
                  fontSize={16}
                  fontFamily={'NotoSans-Bold'}
                  color={'red.500'}>
                  {eventDetail?.event?.event_price} EGP
                </Text>
              )}
            </Row>
          </View>
        </ImageBackground>
      </View>
      <View flex={0.5} mx={5}>
        {eventDetail?.is_deposit_paid && (
          <Text mt={10} textAlign={'center'}>
            20% payment is already deposited
          </Text>
        )}

        <Row mt={5} alignItems={'center'} justifyContent={'space-between'}>
          <View alignSelf={'flex-start'}>
            <Text
              fontSize={16}
              fontFamily={'NotoSans-Medium'}
              textAlign={'left'}>
              Total Amount
            </Text>
            {eventDetail?.is_deposit_paid ? (
              <Text
                fontSize={22}
                fontFamily={'NotoSans-Bold'}
                color={'red.500'}>
                {eventDetail?.event?.event_price -
                  eventDetail?.event?.deposit_price}{' '}
                EGP
              </Text>
            ) : (
              <Text
                fontSize={22}
                fontFamily={'NotoSans-Bold'}
                color={'red.500'}>
                {eventDetail?.event?.event_price} EGP
              </Text>
            )}
          </View>
          <View w={'40%'}>
            <JdButton
              isDisabled={!eventDetail?.is_deposit_paid ? true : false}
              title={'Pay Now'}
              loading={isLoading}
              onPress={() => {
                handlePayment();
              }}
            />
          </View>
        </Row>
      </View>
    </View>
  );
};
