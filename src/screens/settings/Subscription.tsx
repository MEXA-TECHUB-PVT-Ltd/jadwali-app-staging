/* eslint-disable react-native/no-inline-styles */
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  Avatar,
  ScrollView,
  Stack,
  Pressable,
  Image,
  Divider,
  Row,
  Switch,
  Modal,
  Button,
  VStack,
  Heading,
  CheckIcon,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

import React from 'react';
import Header from '../../components/Header/Header';
import AlertModal from '../../components/Modal/AlertModal';
import {useTranslation} from 'react-i18next';
import Logo from '../../components/logo/Logo';
import Swiper from 'react-native-swiper';
import JdButton from '../../components/button/Buttons';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import {useGetSubscriptionPlansQuery} from '../../redux/subscription/subscriptionApi';

const Subscription = ({navigation}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const {data, isError, error, isLoading} = useGetSubscriptionPlansQuery(t);
  const sorted = data?.result ? [...data.result].sort() : [];
  const reversed = sorted ? [...sorted].reverse() : [];
  console.log(reversed);
  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderMonthly = ({plans}) => {
    return (
      <VStack mb={3}>
        <Text fontSize={18} fontFamily={'NotoSans-Regular'}>
          {plans?.name}
        </Text>
        <Text fontSize={32} fontFamily={'NotoSans-Bold'} color={'primary.50'}>
          {plans?.price} EGP
        </Text>
        {plans?.features?.map(item => {
          return (
            <View
              flexDir={'row'}
              mx={2}
              mb={3}
              key={item?.id}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <View flexDir={'row'} alignItems={'center'}>
                <View
                  bg={!item?.isSelected ? 'grey.400' : 'primary.50'}
                  h={2}
                  w={2}
                  rounded={'full'}
                />
                <Text
                  ml={2}
                  color={!item?.isSelected ? 'grey.400' : 'primary.50'}
                  fontSize={14}
                  w={'90%'}
                  textAlign="left"
                  fontFamily={'NotoSans-Regular'}>
                  {item?.name}
                </Text>
              </View>
              {item?.isSelected ? (
                <CheckIcon
                  size={'5'}
                  color={'primary.50'}
                  ml={-2}
                  style={{margignLeft: -20}}
                />
              ) : (
                <Entypo name={'cross'} color={'#B4B4B4'} size={20} />
              )}
            </View>
          );
        })}
      </VStack>
    );
  };

  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState(false);
  return (
    <View bg={'white'} flex={1}>
      <Header title={'Manage Subscription'} />
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
          navigation.goBack();
        }}
        messageDescription={
          active === true
            ? 'Subscription canceled successfully'
            : 'Invoice paid successfully'
        }
      />
      <View mx={4} flex={1} mb={5}>
        <Logo
          resizeMode={'contain'}
          height={'25%'}
          width={'20%'}
          alignSelf={'center'}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Swiper
            // ref={swiper}
            showsPagination={true}
            showsButtons={false}
            activeDotStyle={{width: 20}}
            paginationStyle={{
              bottom: 0,

              marginBottom: 20,
              // paddingBottom: 20,
            }}
            activeDotColor={'#6C309C'}
            loop={false}>
            {reversed?.map(item => {
              return <RenderMonthly plans={item} />;
            })}
          </Swiper>
          <JdButton title={'Next'} onPress={() => setVisible(true)} />

          <Pressable
            onPress={() => {
              setActive(true);
              setModalVisible(true);
            }}>
            <Text
              mt={5}
              underline
              color={'primary.50'}
              fontSize={16}
              fontFamily={'NotoSans-Medium'}
              textAlign={'center'}>
              Cancel your Subscription
            </Text>
          </Pressable>
        </ScrollView>
      </View>
      <AlertModal
        fromSettings={true}
        heading={t('Alert')}
        btntxt2={t('Sure')}
        btntxt1={t('Decline')}
        message={t('Are you sure you want to cancel your subscription?')}
        modalVisible={modalVisible}
        onPress={() => {
          setVisible(true);

          setModalVisible(false);
        }}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default Subscription;
