import {StyleSheet, Share, Alert} from 'react-native';
import {
  View,
  Text,
  Divider,
  Row,
  VStack,
  HStack,
  Image,
  Button,
  Pressable,
  Icon,
  useClipboard,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AlertSnackBar from '../customSnackBar/AlertSnackBar';
import {Web_URL} from '../../constants/api';

const EventsComp = (props: any) => {
  const [selectedItem, setSelectedItem] = React.useState(0);
  const navigation = useNavigation();
  const [copyText, setCopyText] = React.useState('');
  const {value, onCopy} = useClipboard();
  const onShare = async (name, slug) => {
    try {
      const result = await Share.share({
        message: `${Web_URL}${name}/${slug}`,
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

  const handleColor = (item, eventId) => {
    setSelectedItem(item);
    navigation.navigate('Events', {eventId: eventId});
  };
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  let body = {
    status: false,
    message: 'Link copied to clipboard',
  };

  return (
    <>
      {props?.data?.map((item, index) => {
        return (
          <Pressable
            key={item?.id}
            onPress={() => handleColor(index, item?.id)}>
            <View
              p={4}
              bg={index === selectedItem ? 'primary.20' : '#F4E9FD'}
              mb={3}
              borderRadius={10}>
              <Row flexDir={props?.translation === 'ar' ? 'row-reverse' : null}>
                <Divider
                  orientation="vertical"
                  w={1}
                  bg={'#9F5158'}
                  ml={props?.translation === 'ar' ? 2 : 0}
                />
                <VStack ml={2}>
                  <HStack
                    alignItems={'center'}
                    flexDir={
                      props?.translation === 'ar' ? 'row-reverse' : null
                    }>
                    <Text fontSize={12} fontFamily={'NotoSans-Medium'}>
                      {t(item?.duration)} .{' '}
                    </Text>
                    <Text fontSize={12} fontFamily={'NotoSans-Medium'}>
                      {t(
                        item?.one_to_one === true
                          ? 'one-to-one'
                          : 'one-to-many',
                      )}
                    </Text>
                  </HStack>
                  <HStack
                    mt={2}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Text fontSize={18} fontFamily={'NotoSans-SemiBold'}>
                      {t(item?.name)}
                    </Text>
                    <Text fontSize={22} fontFamily={'NotoSans-SemiBold'}>
                      ${t(item?.event_price)}
                    </Text>
                  </HStack>
                  <Row
                    mt={1}
                    justifyContent={
                      props?.translation === 'ar' ? 'flex-end' : 'flex-start'
                    }
                    flexDir={props?.translation === 'ar' ? 'row' : null}>
                    <Text fontSize={12} fontFamily={'NotoSans-Medium'}>
                      {t('Start and End Time')} |
                    </Text>
                    <Text
                      mx={1}
                      fontSize={12}
                      fontFamily={'NotoSans-Regular'}
                      color={'red.800'}
                    />
                    <Text fontSize={12} fontFamily={'NotoSans-Regular'}>
                      {t(item?.date_range?.start_date)} {t('to')}{' '}
                      {t(item?.date_range?.end_date)}
                    </Text>
                  </Row>

                  <Row
                    w={'98%'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Button
                      rounded={'full'}
                      p={2}
                      onPress={() => {
                        let fromEdit = true;
                        navigation.navigate('AddEvent', {
                          fromEdit,
                          id: item?.id,
                          one: item?.one_to_one,
                        });
                      }}>
                      <Row alignItems={'center'} mx={2} mx={4}>
                        <Image
                          source={require('../../assets/edit.png')}
                          h={3}
                          w={3}
                          alt={'img'}
                        />
                        <Text
                          ml={1}
                          color={'white'}
                          fontSize={12}
                          fontFamily={'NotoSans-Regular'}>
                          {t('Edit')}
                        </Text>
                      </Row>
                    </Button>
                    <Button
                      onPress={() => {
                        props?.onPress && props?.onPress('copied');

                        onCopy(`${Web_URL}${item?.user_slug}/${item?.slug}`);
                      }}
                      rounded={'full'}
                      p={2}
                      _text={{fontSize: 12}}
                      leftIcon={
                        <Icon as={Ionicons} name="copy-outline" size={'sm'} />
                      }>
                      {/* <Row alignItems={'center'}>
                        <Image
                          h={'4/6'}
                          w={'1/6'}
                          mb={1}
                          source={require('../../assets/copy.png')}
                          alt={'img'}
                        />
                        <Text
                          ml={1}
                          color={'white'}
                          fontSize={14}
                          fontFamily={'NotoSans-SemiBold'}>
                          Copy Link
                        </Text>
                      </Row> */}
                      {t('Copy Link')}
                    </Button>
                    <Button
                      p={2}
                      rounded={'full'}
                      onPress={() => {
                        onShare(item?.user_slug, item?.slug);
                      }}>
                      <Row alignItems={'center'}>
                        <Image
                          source={require('../../assets/share.png')}
                          h={3}
                          w={3}
                          alt={'img'}
                        />
                        <Text
                          ml={1}
                          color={'white'}
                          fontSize={12}
                          fontFamily={'NotoSans-Regular'}>
                          {t('Share Link')}
                        </Text>
                      </Row>
                    </Button>
                  </Row>
                </VStack>
              </Row>
            </View>
          </Pressable>
        );
      })}
    </>
  );
};

export default EventsComp;

const styles = StyleSheet.create({});
// const {value, onCopy} = useClipboard();{() => onCopy(copyText)}
