import { StyleSheet } from 'react-native';
import {
  Divider,
  Image,
  Row,
  ScrollView,
  Text,
  View,
  Pressable,
} from 'native-base';
import React, {useRef, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import LanguageMenu from '../../../components/languageMenu/LanguageMenu';
import SettingsLanguageMenu from '../../../components/languageMenu/SettingsLanguageMenu';
import AlertModal from '../../../components/Modal/AlertModal';
import { useTranslation } from 'react-i18next';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useDeleteUserMutation } from '../../../redux/auth/auth';
import { setPassword, setUserData } from '../../../redux/fatures/auth';
import { removeStorageData, resetStorage } from '../../../Async/AsyncStorage/AsyncStorage';
import { useSelector, useDispatch } from 'react-redux';


const SettingsMenu = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [isMenuVisible, setMenuVisible] = React.useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState<boolean>(false);
  
  const [deleteUser] = useDeleteUserMutation();
  const ID = useSelector((state) => state?.auth?.userData);
  const userId = ID?.id;
  console.log('user id in userData is : ', userId);

  const handleNavigation = id => {
    if (id === 1) {
      let fromSettings = true;
      navigation.navigate('Profile', fromSettings);
    } else if (id === 2) {
      navigation.navigate('ChangePassword');
    } else if (id === 4) {
      navigation.navigate('Subscription');
    } else if (id === 5) {
      navigation.navigate('FAQS');
    } else if (id === 6) {
      navigation.navigate('FeedBack');
    } else if (id === 7) {
      setModalVisible(true);
    } else if (id === 8) {
      setMenuVisible(true);
      // if (languageMenuRef.current) {
      //   languageMenuRef.current.showMenu();
      // }
    } else if (id === 9) {
      setDeleteModalVisible(true);
    } else {
      navigation.navigate('BankDetails');
    }
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  const { t } = useTranslation();

  return (
    <>
      <AlertModal
        fromSettings={true}
        heading={t('logout?')}
        btntxt2={t('Logout')}
        btntxt1={t('Cancel')}
        message={t('Are you sure you want to logout?')}
        modalVisible={modalVisible}
        onPress={async () => {
          await removeStorageData('uid');
          await dispatch(setPassword());
          setModalVisible(false);
        }}
        setModalVisible={setModalVisible}
      />

      <AlertModal
        fromSettings={true}
        heading={t('Delete Account?')}
        btntxt2={t('Delete')}
        btntxt1={t('Cancel')}
        message={t('Are you sure you want to delete account?')}
        modalVisible={deleteModalVisible}
        onPress={async () => {
          try {
            if (userId) {
              console.log('Attempting to delete user with ID:', userId);
              await resetStorage();
              await removeStorageData('uid');
              await dispatch(setUserData(null));
              await dispatch(setPassword(null));

              // Log response to confirm the request
              const response = await deleteUser(userId);
              console.log('Delete user response:', response);

              // Check response status or handle errors
              if (response.error) {
                console.error('Failed to delete user:', response.error);
              } else {
                console.log('Account deleted successfully with userId:', userId);
              }
            } else {
              console.error('User ID not found, cannot delete account.');
            }
          } catch (error) {
            console.error('Failed to delete account:', error);
          } finally {
            setDeleteModalVisible(false);
          }
        }}
        setModalVisible={setDeleteModalVisible}
      />

      {props?.menu?.map((item, index) => {
        if (item?.id === 3) {
          return;
        } else {
          return (
            <Pressable
              key={item?.id}
              onPress={() => {
                handleNavigation(item?.id);
              }}>
                
              <Row
                justifyContent={'space-between'}
                flexDir={props?.translation === 'ar' ? 'row-reverse' : null}
                my={2}>
                <Row
                  flexDir={props?.translation === 'ar' ? 'row-reverse' : null}>
                  {item?.name === 'Bank Details' ? (
                    <Entypo size={20} color={'#6c309c'} name={'credit-card'} />
                  ) : item?.name === 'Change Language' ? (
                    <>
                    <SettingsLanguageMenu isVisible={isMenuVisible} onClose={handleMenuClose} />
                    <Entypo size={20} color={'#6c309c'} name={'language'} />
                    </>
                  ) : item?.name === 'Delete Account' ? (
                    <Ionicons size={20} color={'#6c309c'} name={'trash-outline'} />
                  ) : (
                    <Image
                      source={item?.img}
                      h={5}
                      w={5}
                      resizeMode="contain"
                      alt={'menu'}
                    />
                  )}

                  <Text
                    fontSize={16}
                    mx={5}
                    fontFamily={'NotoSans-Medium'}>
                    {t(item?.name)}
                  </Text>
                </Row>
                <AntDesign
                  name={props?.translation === 'ar' ? 'left' : 'right'}
                  size={15}
                  color={'black'}
                />
              </Row>
              <Divider
                bg={
                  index === props?.menu?.length - 1 ? 'transparent' : 'grey.400'
                }
                my={2}
              />
            </Pressable>
          );
        }
      })}
    </>
  );
};

export default SettingsMenu;

const styles = StyleSheet.create({});