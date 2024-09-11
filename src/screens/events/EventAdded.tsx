import {
  View,
  Row,
  Text,
  Button,
  Icon,
  Pressable,
  useClipboard,
} from 'native-base';
import React from 'react';
import {Image, StyleSheet, Share} from 'react-native';
import JdButton from '../../components/button/Buttons';
import LanguageSelection from '../../components/languageComp/LanguageSelection';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import {useTranslation} from 'react-i18next';
import {Web_URL} from '../../constants/api';
import {useDispatch} from 'react-redux';
import {setDateRange} from '../../redux/fatures/addEvent';

const EventAdded = ({navigation, route}: any) => {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const name = route?.params?.name;
  const slug = route?.params?.slug;
  const {t} = useTranslation();
  const fromEdit = route?.params?.fromEdit;
  React.useEffect(() => {
    dispatch(setDateRange({}));
  }, []);
  const {value, onCopy} = useClipboard();
  const onShare = async () => {
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
  return (
    <View
      bg={'white'}
      flex={1}
      alignItems={'center'}
      justifyContent={'center'}
      p={5}>
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
        }}
        messageDescription={'Link copied successfully'}
      />
      <Image source={require('../../assets/success.png')} style={styles.img} />
      <View alignItems={'center'} mt={10}>
        <Text
          fontFamily={'NotoSans-SemiBold'}
          //   color={'primary.50'}
          fontSize={26}>
          {fromEdit === true ? t('Event Edited!') : t('Event Added!')}
        </Text>
        <Text
          fontFamily={'NotoSans-Regular'}
          color={'grey.400'}
          mt={2}
          fontSize={14}>
          {fromEdit === true
            ? t('Your event has been added successfully')
            : t('Your event has been edited successfully')}
        </Text>
      </View>
      <View w={'100%'} mt={20}>
        <Row alignItems={'center'} justifyContent={'center'}>
          <View
            bg={'primary.50'}
            rounded={'full'}
            flexDir={'row'}
            p={2}
            // alignItems={'center'}
            justifyContent={'center'}
            w={'45%'}>
            <Pressable
              onPress={() => {
                onCopy(`${Web_URL}${name}/${slug}`);
                setVisible(true);
              }}
              alignItems={'center'}
              flexDir={'row'}>
              <Image
                source={require('../../assets/eventCopy.png')}
                style={{height: 22, width: 20}}
                resizeMode="contain"
              />
              <Text
                ml={3}
                fontSize={16}
                color={'white'}
                fontFamily={'NotoSans-SemiBold'}>
                {t('Copy Link')}
              </Text>
            </Pressable>
          </View>
          <View
            ml={5}
            bg={'primary.50'}
            alignItems={'center'}
            justifyContent={'center'}
            rounded={'full'}
            w={'45%'}
            flexDir={'row'}
            p={2}>
            <Pressable
              onPress={() => onShare()}
              alignItems={'center'}
              flexDir={'row'}>
              <Image
                source={require('../../assets/eventShare.png')}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
              <Text
                ml={3}
                fontSize={16}
                color={'white'}
                fontFamily={'NotoSans-SemiBold'}>
                {t('Share')}
              </Text>
            </Pressable>
          </View>
        </Row>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate(t('Home'));
        }}>
        <Text
          textAlign={'center'}
          mt={5}
          fontSize={16}
          underline
          color={'primary.50'}
          fontFamily={'NotoSans-SemiBold'}>
          {t('Go to Home')}
        </Text>
      </Pressable>
    </View>
  );
};

export default EventAdded;
const styles = StyleSheet.create({
  img: {
    height: '20%',
    width: '30%',
    resizeMode: 'contain',
    // justifyContent: 'center',
    marginTop: '10%',
    alignSelf: 'center',
  },
  // txt: {
  //   fontFamily: 'NotoSans-Bold',
  // },
  // head: {
  //   fontSize: 38,
  //   fontFamily: 'NotoSans-Bold',
  // },
});
