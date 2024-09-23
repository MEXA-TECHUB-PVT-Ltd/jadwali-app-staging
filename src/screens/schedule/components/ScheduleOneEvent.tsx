import { Linking, StyleSheet } from 'react-native';
import {
  Avatar,
  Divider,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
  View,
  Icon,
  Input,
  useClipboard,
  Alert,
  VStack,
  HStack,
  useToast,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useTransition } from 'react';
// import {InputBlur} from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { dateUtils } from '../../../utils/datesUtils';

const ScheduleOneEvent = props => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const toast = useToast();
  const convertDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };
  const { value, onCopy } = useClipboard();

  const timeResult = dateUtils(props?.data?.scheduling_time)

  return (
    <>
      <Pressable mx={5} my={4} bg={'secondary'} borderRadius={10} p={3}>
        <Row
          justifyContent={'space-between'}
          my={2}
          flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
          alignItems={'cenetr'}>
          {/* <Row> */}
          <Text fontSize={15} fontFamily={'NotoSans-Medium'}>
            {t('Meeting Type')}
          </Text>
          <Text
            fontSize={15}
            color={'primary.50'}
            fontFamily={'NotoSans-Regular'}>
            {props?.data?.event?.one_to_one === true
              ? 'ONE-On-ONE'
              : 'ONE-On-MANY'}
          </Text>
          {/* </Row> */}
          {/* <Avatar source={{uri: item?.img}} size={'sm'} /> */}
        </Row>
        <Row
          justifyContent={'space-between'}
          flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
          my={2}>
          <Text fontSize={14} fontFamily={'NotoSans-Medium'}>
            {t('Name')}
          </Text>
          <Text
            fontSize={14}
            color={'primary.50'}
            fontFamily={'NotoSans-Medium'}>
            {props?.data?.event?.name}
          </Text>
        </Row>
        <Row
          justifyContent={'space-between'}
          flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
          my={2}>
          <Text fontSize={14} fontFamily={'NotoSans-Medium'}>
            {t('Event Price')}
          </Text>
          <Text
            fontSize={14}
            color={'primary.50'}
            fontFamily={'NotoSans-Medium'}>
            $ {props?.data?.event?.event_price}
          </Text>
        </Row>
        {/* <Row
          justifyContent={'space-between'}
          flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
          my={2}>
          <Text fontSize={14} fontFamily={'NotoSans-Medium'}>
            {t('Deposit Price')}
          </Text>
          <Text
            fontSize={14}
            color={'primary.50'}
            fontFamily={'NotoSans-Medium'}>
            $ {props?.data?.event?.deposit_price}
          </Text>
        </Row> */}

        <Row
          justifyContent={'space-between'}
          flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
          mt={2}>
          <Text fontSize={14} fontFamily={'NotoSans-Medium'}>
            {t('Date and Time')}
          </Text>
          <Text
            fontSize={14}
            color={'primary.50'}
            fontFamily={'NotoSans-Medium'}>
            {timeResult}
          </Text>
        </Row>

        <Row
          justifyContent={'space-between'}
          flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
          my={2}>
          <Text fontSize={14} fontFamily={'NotoSans-Medium'}>
            {t('Location')}
          </Text>
          {props?.data?.locations?.length > 0 ? (
            <Text
              fontSize={14}
              color={'primary.50'}
              fontFamily={'NotoSans-Medium'}>
              {props?.data?.locations[0].type === 'physical'
                ? 'Physical'
                : 'Online'}
            </Text>
          ) : null}
        </Row>
        {props?.data?.locations?.length > 0 &&
          props?.data?.locations[0].type === 'physical' ? (
          <Row
            justifyContent={'space-between'}
            flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
            mt={2}>
            <Text fontSize={14} fontFamily={'NotoSans-Medium'}>
              Address
            </Text>
            <Text w={'60%'}>{props?.data?.locations[0].address}</Text>
          </Row>
        ) : (
          <Row
            justifyContent={'space-between'}
            flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
            mt={2}>
            <Text fontSize={14} fontFamily={'NotoSans-Medium'}>
              {t('Online link')}
            </Text>
            <Pressable
              flexDir={'row'}
              onLongPress={() => {
                onCopy(
                  props?.data?.locations[0].platform_name === 'zoom'
                    ? props?.data?.zoom_meeting_link
                    : props?.data?.google_meeting_link,
                );
                toast.show({
                  placement: 'top',
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
                            <HStack
                              space={2}
                              flexShrink={1}
                              alignItems="center">
                              <Alert.Icon color={'white'} size={'md'} />
                              <Text
                                fontSize={16}
                                fontFamily={'NotoSans-Bold'}
                                flexShrink={1}>
                                Success
                              </Text>
                            </HStack>
                          </HStack>
                          <Text
                            px="2"
                            fontFamily={'NotoSans-Medium'}
                            textAlign={'center'}
                            fontSize={12}>
                            Link Copied successfully
                          </Text>
                        </VStack>
                      </Alert>
                    );
                  },
                });
                console.log('Press');
              }}
              alignItems={'center'}
              onPress={() => {
                if (props?.data?.locations[0].platform_name === 'zoom') {
                  Linking.openURL(props?.data?.zoom_meeting_link);
                } else {
                  Linking.openURL(props?.data?.google_meeting_link);
                }
              }}>
              {props?.data?.locations[0].platform_name === 'zoom' ? (
                <Image
                  source={require('../../../assets/zoom.png')}
                  h={7}
                  alt={'img'}
                  ml={2}
                  w={7}
                />
              ) : (
                <Image
                  source={require('../../../assets/googleMeet.png')}
                  // size={}/
                  h={5}
                  w={7}
                  alt={'img'}
                />
              )}
            </Pressable>
          </Row>
        )}

        <Pressable>
          <Input
            mt={5}
            placeholder={t('Questions')}
            // rounded={'md'}
            borderRadius={10}
            onPressIn={() => navigation.navigate('Questions', {
              questions: props?.data?.questions
            })}
            bg={'loc'}
            isReadOnly={true}
            height={50}
            borderWidth={0}
            InputRightElement={
              props?.translation === 'en' ? (
                <Icon
                  as={<AntDesign name={'right'} />}
                  size={4}
                  mr="2"
                  color="#7B7B7B"
                />
              ) : null
            }
            InputLeftElement={
              props?.translation === 'ar' ? (
                <Icon
                  as={<AntDesign name={'left'} />}
                  size={4}
                  ml="2"
                  color="#7B7B7B"
                />
              ) : null
            }
            placeholderTextColor={'black'}
            // label={'Location'}
            fontFamily={'NotoSans-Medium'}
            fontSize={16}
          // rightIcon={''}
          />
        </Pressable>
      </Pressable>
    </>
  );
};

export default ScheduleOneEvent;

const styles = StyleSheet.create({});
