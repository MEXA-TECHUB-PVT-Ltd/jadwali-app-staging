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
import React, {useState, useRef, useEffect} from 'react';
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
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [errorSnackBarVisible, setErrorSnackBarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [deleteUser] = useDeleteUserMutation();
  const ID = useSelector((state) => state?.auth?.userData);
  const userId = ID?.id;
  // console.log('user id in userData is : ', userId);

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


  const handleDeleteAccount = async () => {
    try {
      if (userId) {
        // Attempt to delete the user first
        const response = await deleteUser(userId);

        if (response.error) {
          // If there's an error, log it and do not proceed with any further actions
          // console.error('Failed to delete user:', response.error);
          console.log('Error message if user not deleted : ', response.error?.data?.message);
          setErrorMessage(response.error?.data?.message);
          setErrorSnackBarVisible(true);
          setTimeout(() => {
            setErrorSnackBarVisible(false);
          }, 2500);
        } 
        else 
        {
          // If user deletion is successful, show the snackbar alert for 2 seconds
          setSnackBarVisible(true);

          setTimeout(async () => {
            try {
              // After the 2-second delay, clear storage and dispatch actions
              // await resetStorage();
              await removeStorageData('uid');
              // await dispatch(setUserData(null));
              await dispatch(setPassword(null));

              console.log('Account deleted successfully with userId:', userId);

              // Optionally: Navigate to another screen after successful deletion
              // navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            } catch (error) {
              console.error('Error while clearing storage or dispatching actions:', error);
            }
          }, 2000); // Delay of 2 seconds to show the Snackbar-like message
        }
      } else {
        console.error('User ID not found, cannot delete account.');
      }
    } catch (error) {
      console.error('Error encountered during account deletion:', error);
    } finally {
      setDeleteModalVisible(false); // Close the delete modal in any case
    }
  };




  // const handleDeleteAccount = async () => {
  //   try {
  //     if (userId) {
  //       setSnackBarVisible(true);
  //       setTimeout(async () => {
  //         await resetStorage();
  //         await removeStorageData('uid');
  //         await dispatch(setUserData(null));
  //         await dispatch(setPassword(null));

  //         const response = await deleteUser(userId);
  //         if (response.error) {
  //           console.error('Failed to delete user:', response.error);
  //         } else {
  //           console.log('Account deleted successfully with userId:', userId);
  //         }
  //       }, 2000); // Delay to show the Snackbar-like message
  //     } else {
  //       console.error('User ID not found, cannot delete account.');
  //     }
  //   } catch (error) {
  //     console.error('Failed to delete account:', error);
  //   } finally {
  //     setDeleteModalVisible(false);
  //   }
  // };




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
        message={t('After permanently deleting account, you cannot recover it.')}
        modalVisible={deleteModalVisible}
        onPress={handleDeleteAccount}
        // onPress={async () => {
        //   try {
        //     if (userId) {
        //       console.log('Attempting to delete user with ID:', userId);
        //       await resetStorage();
        //       await removeStorageData('uid');
        //       await dispatch(setUserData(null));
        //       await dispatch(setPassword(null));

        //       // Log response to confirm the request
        //       const response = await deleteUser(userId);
        //       console.log('Delete user response:', response);

        //       // Check response status or handle errors
        //       if (response.error) {
        //         console.error('Failed to delete user:', response.error);
        //       } else {
        //         console.log('Account deleted successfully with userId:', userId);
        //       }
        //     } else {
        //       console.error('User ID not found, cannot delete account.');
        //     }
        //   } catch (error) {
        //     console.error('Failed to delete account:', error);
        //   } finally {
        //     setDeleteModalVisible(false);
        //   }
        // }}
        setModalVisible={setDeleteModalVisible}
      />

      {snackBarVisible && (
        <View style={styles.overlayADS}>
          <View style={styles.snackbarContainerADS}>
            <View style={styles.snackbarADS}>
              <Text style={styles.snackbarTextADS}>
                {t('Account deleted successfully!')}
              </Text>
            </View>
          </View>
        </View>
      )}

      {errorSnackBarVisible && (
        <View style={styles.overlay}>
          <View style={styles.snackbarContainer}>
            <View style={styles.snackbar}>
              <Text style={styles.snackbarText}>
                {errorMessage}
              </Text>
            </View>
          </View>
        </View>
      )}


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
                  flex={1}
                  flexDir={props?.translation === 'ar' ? 'row-reverse' : null}>
                  {item?.name === 'Bank Details' ? (
                    <Entypo size={20} color={'#6c309c'} name={'credit-card'} />
                  ) : item?.name === 'Change Language' ? (
                    <>
                    <Entypo size={20} color={'#6c309c'} name={'language'} />
                        {/* <View style={{ justifyContent: 'flex-end' }}>
                          <SettingsLanguageMenu isVisible={isMenuVisible} onClose={handleMenuClose} />
                        </View> */}
                    {/* <SettingsLanguageMenu isVisible={isMenuVisible} onClose={handleMenuClose} /> */}
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

                {item?.name === 'Change Language' && (
                  <View style={{ justifyContent: 'flex-end', }}>
                    <SettingsLanguageMenu isVisible={isMenuVisible} onClose={handleMenuClose} />
                  </View>
                )}

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

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
  },
  snackbarContainer: {
    backgroundColor: '#FF3434',
    // padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 2,
  },
  snackbar: {
    backgroundColor: '#FF3434',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  snackbarText: {
    color: 'white',
  },

  overlayADS: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
  },
  snackbarContainerADS: {
    backgroundColor: '#6C3',
    // padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 2,
  },
  snackbarADS: {
    backgroundColor: '#6C3',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  snackbarTextADS: {
    color: 'white',
  },
});