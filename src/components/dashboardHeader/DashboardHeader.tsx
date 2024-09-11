import React from 'react';
import { View, Text, Row, Avatar, Pressable, useClipboard, useToast, HStack, Alert, VStack, } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JdInputs from '../inputs/inputs';
import LanguageMenu from '../languageMenu/LanguageMenu';
import { useTranslation } from 'react-i18next';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../constants/api';
import { getStorageData } from '../../Async/AsyncStorage/AsyncStorage';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { PicPlaceholder } from '../avatar/PicPlaceholder';

const DashboardHeader = (props: any) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [img, setImg] = React.useState();
  const [value, setValue] = React.useState('');
  const { onCopy, value: copiedText } = useClipboard();
  const toast = useToast();
  const getUid = async () => {
    const uid = await getStorageData('uid');
  };
  const handleSearch = async (txt: string) => {
    setValue(txt);
    if (props?.eventsData) {
      const filteredData = props?.eventsData.filter((item: any) => {
        return item.name.toLowerCase().includes(txt.toLowerCase());
      });
      props?.searchData && props?.searchData(filteredData);
    }
  };
  const handleUsernamePress = () => {
    const profileLink = `https://jadwali-webview.netlify.app/profile-view/${props?.profileData?.user?.slug}`; // Replace with your actual profile link
    onCopy(profileLink);
    toast.show({
      duration: 2000,
      placement: 'top',
      render: () => {
        return (
          <Alert
            maxWidth="80%"
            alignSelf="center"
            flexDirection="row"
            status={'success'}
            bg={'green.500'}
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
                  <Alert.Icon
                    color={'white'}
                    size={'md'}
                  />
                  <Text
                    fontSize={16}
                    fontFamily={'NotoSans-Bold'}
                    flexShrink={1}>

                    {t('Success')}{' '}
                  </Text>
                </HStack>
              </HStack>
              <Text
                px="2"
                fontFamily={'NotoSans-Medium'}
                textAlign={'center'}
                fontSize={12}>
                {t('Profile Link Copied!')}{' '}
              </Text>
            </VStack>
          </Alert>
        );
      },
    });
  };
  return (
    <>

      <Row
        mt={5}
        flexDirection={props?.translation === 'ar' ? 'row-reverse' : 'row'}
        justifyContent={'space-between'}
        mx={3}
        alignItems={'center'}
      >
        <Pressable
        onPress={handleUsernamePress}
        >
          <Text
            fontSize={22}
            fontFamily={'NotoSans-SemiBold'}
            numberOfLines={1}
            w={'100%'}
            ellipsizeMode="tail"
          >
            {t('Hello')}{' '}
            {props?.name !== null && props?.name !== undefined
              ? `${props?.name} !`
              : '!'}
          </Text>
        </Pressable>
        <Row
          alignItems={'center'}
          flexDirection={props?.translation === 'ar' ? 'row-reverse' : 'row'}
        >
          {/* <TouchableOpacity 
          // onPress={handleUsernamePress}
          >
            <Text style={{fontFamily:'NotoSans-SemiBold',fontSize:16}}>{t('Link')}{' '}</Text>
          </TouchableOpacity> */}
          <View>
            <LanguageMenu />
          </View>

          {/* <Pressable onPress={() => navigation.navigate('Notifications', { fromHome: true })}>
            <EvilIcons
              name={'bell'}
              color={'#6c309c'}
              size={30}
              style={{ marginLeft: 10, marginRight: 10 }}
            />
          </Pressable> */}
          <Pressable onPress={props?.onPress}>
            {props?.img ? (
              <Avatar
                size={'sm'}
                source={{
                  uri: `${API_URL}public/uploads/${props?.img}`,
                }}
              />
            ) : (
              <PicPlaceholder size={18} height={7} width={7} />
            )}
          </Pressable>
        </Row>
      </Row>

      {/* <Row
        mt={5}
        flexDirection={props?.translation === 'ar' ? 'row-reverse' : 'row'}
        justifyContent={'space-between'}
        mx={3}
        alignItems={'center'}>
          <Pressable>
            <Text
              fontSize={22}
              fontFamily={'NotoSans-SemiBold'}
              numberOfLines={1}
              w={'50%'}
              ellipsizeMode="tail">
              {t('Hello')}{' '}
              {props?.name !== null && props?.name !== undefined
                ? `${props?.name} !`
                : '!'}
            </Text>
        </Pressable>
        <Row
          alignItems={'center'}
          flexDirection={props?.translation === 'ar' ? 'row-reverse' : 'row'}>
          <LanguageMenu />
          <Pressable onPress={() => navigation.navigate('Notifications',{fromHome:true})}>
            <EvilIcons
              name={'bell'}
              color={'#6c309c'}
              size={30}
              style={{marginLeft: 10, marginRight: 10}}
            />
          </Pressable>
          <Pressable onPress={props?.onPress}>
            {props?.img ? (
              <Avatar
                size={'sm'}
                source={{
                  uri: `${API_URL}public/uploads/${props?.img}`,
                }}
              />
            ) : (
              <PicPlaceholder size={18} height={7} width={7} />
            )}
          </Pressable>
        </Row>
      </Row> */}
      <View mx={3} my={5}>
        <JdInputs
          placeholder={'Search your meeting'}
          height={50}
          leftIconName="search-outline"
          value={value}
          onChangeText={txt => handleSearch(txt)}
        />
      </View>
    </>
  );
};
export default DashboardHeader;
