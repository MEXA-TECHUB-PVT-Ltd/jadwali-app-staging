import { StyleSheet, Platform, ActivityIndicator, Linking } from 'react-native';
import {
  View,
  Text,
  Avatar,
  ScrollView,
  Stack,
  Pressable,
  Divider,
  Row,
  useClipboard,
  Alert,
  VStack,
  HStack,
  useToast,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Header from '../../components/Header/Header';
import JdInputs from '../../components/inputs/inputs';
import { Formik } from 'formik';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import JdButton from '../../components/button/Buttons';
import * as Yup from 'yup';
import BottomSheet from '../../components/bottomSheet/BottomSheet';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import Loader from '../../components/AnimationLoader/Loader';
import Entypo from 'react-native-vector-icons/Entypo';
import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';
import {
  useGetUserByIdQuery,
  useGetUserServiceTypesQuery,
  useGetUserServicesQuery,
  useUpdateProfileMutation,
  useUploadImageMutation,
} from '../../redux/auth/auth';
import { useSelector } from 'react-redux';
import { API_URL, Web_URL } from '../../constants/api';
import { useFocusEffect } from '@react-navigation/native';
import { AppointmentComp } from './components/AppointmentComp';
import { PicPlaceholder } from '../../components/avatar/PicPlaceholder';

const UserProfile = ({ navigation, route }) => {
  const { value, onCopy } = useClipboard();
  const { t } = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  const uid = useSelector(state => state.auth?.userData?.id);
  const user = useSelector(state => state.auth?.userData);
  const { data: profileData, isLoading } = useGetUserByIdQuery(uid);
  // console.log("data is ", profileData)
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  const [imageUrl, setImageUrl] = React.useState<string>();

  const [uodateProfile, { isLoading: profileLoading }] =
    useUpdateProfileMutation();

  const { data: userservice, isLoading: serviceLoading } =
    useGetUserServicesQuery(uid);
  const { data: userservicetypes, isLoading: servicetypesLoading } =
    useGetUserServiceTypesQuery(uid);
  const [addImage, { isData: ImageData }] = useUploadImageMutation();
  const [file, setFile] = React.useState();
  const [focused, setFocused] = React.useState(false);
  const [showDeleteSheet, setShowDeleteSheet] = React.useState<boolean>(true);
  const [emailError, setEmailError] = React.useState(
    'You cannot update your email address',
  );
  const [visible, setVisible] = React.useState(false);
  const formSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const handleCreate = async (name: string) => {
    let uploads_picture_id = profileData?.user?.profile_picture;
    if (imageUrl) {
      const formData = new FormData();
      const uri = imageUrl; // Assuming imageUrl is a local URI
      const filename = uri.split('/').pop();
      formData.append('file', {
        uri: uri,
        type: 'image/jpg',
        name: filename,
      });

      let res = await fetch(`${API_URL}api/universal/uploads`, {
        method: 'post',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      let responseJson = await res.json();
      if (responseJson?.status === true) {
        uploads_picture_id = responseJson?.result?.id;
      } else {
        console.log("Error uploading image");
        return;
      }
    }
    uodateProfile({
      user_id: uid,
      full_name: name,
      uploads_picture_id: uploads_picture_id,
    }).then(res => {
      if (res?.data?.status === true) {
        setVisible(true);
      }
    });
  };
  // const handleCreate = async (name: string) => {
  //   if (imageUrl) {
  //     const formData = new FormData();
  //     const uri = file?.uri;
  //     const filename = uri.split('/').pop();
  //     formData.append('file', {
  //       uri: uri,
  //       type: 'image/jpg',
  //       name: filename,
  //     });

  //     let res = await fetch(`${API_URL}api/universal/uploads`, {
  //       method: 'post',
  //       body: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     let responseJson = await res.json();
  //     if (responseJson?.status === true) {
  //       uodateProfile({
  //         user_id: uid,
  //         full_name: name,
  //         uploads_picture_id: responseJson?.result?.id,
  //       }).then(res => {
  //         if (res?.data?.status === true) {
  //           setVisible(true);
  //         }
  //       });
  //     }
  //   } else {
  //     uodateProfile({
  //       user_id: uid,
  //       full_name: name,
  //     }).then(res => {
  //       if (res?.data?.status === true) {
  //         setVisible(true);
  //       }
  //     });
  //   }
  // };
  const handlePickImage = React.useCallback(async () => {
    const options = {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('Error:', response.error);
        // setMediaType(ContentType.NONE);
      } else if (response.customButton) {
        // console.log('User tapped custom button:', response.customButton);
      } else {
        const source = response.assets?.[0]?.base64 || '';
        // console.log("source",source);
        setFile(response.assets?.[0]);
        setImageUrl(`data:image/png;base64,${source}`); // Process the selected video
      }
    });
  }, []);
  const handleCamera = React.useCallback(async () => {
    const options = {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('Error:', response.error);
        // setMediaType(ContentType.NONE);
      } else if (response.customButton) {
        // console.log('User tapped custom button:', response.customButton);
      } else {
        const source = response.assets?.[0]?.base64 || '';
        // console.log("source",source);
        setFile(response.assets?.[0]);
        setImageUrl(`data:image/png;base64,${source}`); // Process the selected video
      }
    });
    bottomSheetRef.current.close();
  }, []);
  const bottomSheetRef = React.useRef(null);
  React.useEffect(() => {
    if (!showDeleteSheet) {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.close();
      }
    }
  }, [showDeleteSheet, bottomSheetRef]);

  const openBottomSheet = (id: string) => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
    //  (bottomSheetRef.current) {
    //     bottomSheetRef.current.close()
    // console.error(id);
    //   setPostId(id);
  };
  const handleVisibility = () => {
    setVisible(false);
    navigation.goBack();
  };
  const [active, setActive] = React.useState();

  const handlePress = async res => {
    navigation.navigate('EditAppointmentType', {
      name: userservice?.data[0]?.service_name,
      id: res?.service_id,
      fromAppointment: true,
    });
  };
  const toast = useToast();
  return (
    <ScrollView keyboardShouldPersistTaps="handled" bg={'white'} flex={1}>
      {isLoading || serviceLoading || servicetypesLoading ? (
        <ActivityIndicator size={'small'} color={'black'} />
      ) : (
        <>
          <View bg={'pro'} h={'40'}>
            <Header title={'Profile'} />
            <CustomSnackbar
              message={'Success'}
              visible={visible}
              translation={currentLanguage}
              onDismiss={() => {
                handleVisibility();
              }}
              messageDescription={'Profile updated successfully'}
            />
          </View>
          <View>
            <Pressable
              onPress={() => {
                setActive(false);
                openBottomSheet();
              }}
              position={'absolute'}
              mt={-50}
              alignSelf={'center'}>
              <Pressable
                onPress={() => {
                  setActive(false);
                  openBottomSheet();
                }}
                position={'absolute'}
                zIndex={99}
                // top={88}
                // left={180}
                bottom={-5}
                right={-10}
                w="10"
                h="10"
                alignSelf={'center'}
                alignItems={'center'}
                justifyContent={'center'}
                rounded={'full'}
                bg={'red.800'}>
                <Pressable
                  accessibilityLabel="PickImage-btn"
                  onPress={() => {
                    setActive(false);
                    openBottomSheet();
                  }}>
                  <Feather name={'camera'} size={20} color={'white'} />
                </Pressable>
              </Pressable>
              {profileData?.user?.upload_details?.filename && !imageUrl ? (
                <Avatar
                  h={24}
                  w={24}
                  label={`${profileData?.user?.full_name || ''}`}
                  source={{
                    uri: `${API_URL}public/uploads/${profileData?.user?.upload_details?.filename}`,
                  }}
                />
              ) : null}
              {imageUrl ? (
                <Avatar
                  h={24}
                  w={24}
                  source={{
                    uri: `${imageUrl}`,
                  }}
                />
              ) : null}
              {!profileData?.user?.upload_details?.filename && !imageUrl && (
                <PicPlaceholder size={60} height={24} width={24} />
              )}
            </Pressable>

            <Formik
              initialValues={{
                name: profileData?.user?.full_name,
                email: profileData?.user?.email,
                link: `https://jadwali-webview.netlify.app/profile-view/${profileData?.user?.slug}`,
              }}
              validationSchema={formSchema}
              onSubmit={values => handleCreate(values.name)}>
              {({
                values,
                handleChange,
                touched,
                handleSubmit,

                errors,
              }) => (
                <>
                  <View mt={20} mx={5}>
                    <Text
                      fontSize={16}
                      mb={2}
                      ml={2}
                      fontFamily={'NotoSans-SemiBold'}>
                      {t('User Name')}
                    </Text>
                    <JdInputs
                      leftIconName={'user'}
                      placeholder={'Name'}
                      value={t(values.name)}
                      onChangeText={handleChange('name')}
                    />
                    {touched.name && errors.name && (
                      <View
                        flexDir={
                          currentLanguage === 'ar' ? 'row-reverse' : 'row'
                        }
                        alignItems={'center'}
                        mt={1}
                        ml={1}>
                        <View
                          bg={'red.500'}
                          h={2}
                          w={2}
                          rounded={'full'}
                          mx={1}
                        />
                        <Text color={'red.500'} fontSize={12}>
                          {t(errors.name)}
                        </Text>
                      </View>
                    )}
                    <Text
                      fontSize={16}
                      mt={6}
                      mb={2}
                      ml={2}
                      fontFamily={'NotoSans-SemiBold'}>
                      {t('Email Address')}
                    </Text>
                    <JdInputs
                      leftIconName={'mail'}
                      isDisabled={true}
                      placeholder={'Email'}
                      onFocus={() => {
                        setFocused(true);
                      }}
                      onFocusEnd={() => {
                        setFocused(false);
                      }}
                      value={values.email}
                    />

                    {emailError && (
                      <View
                        flexDir={
                          currentLanguage === 'ar' ? 'row-reverse' : 'row'
                        }
                        alignItems={'center'}
                        mt={1}
                        ml={1}>
                        <Text color={'red.500'} fontSize={12}>
                          {t(emailError)}
                        </Text>
                      </View>
                    )}
                    <Row
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      mx={2}>
                      <Text
                        fontSize={16}
                        mt={6}
                        mb={2}
                        fontFamily={'NotoSans-SemiBold'}>
                        {t('Profile Link')}
                      </Text>
                      <Text
                        fontSize={14}
                        mt={6}
                        underline
                        onPress={() => {
                          onCopy(values.link);
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
                        }}
                        color={'primary.50'}
                        mb={2}
                        fontFamily={'NotoSans-SemiBold'}>
                        {t('Copy')}
                      </Text>
                    </Row>
                    <Pressable
                      onPress={() => {
                        onCopy(values.link);
                        Linking.openURL(values.link);
                      }}>
                      <JdInputs
                        leftIconName={'link'}
                        isDisabled={true}
                        placeholder={'Email'}
                        onFocus={() => {
                          setFocused(true);
                        }}
                        onFocusEnd={() => {
                          setFocused(false);
                        }}
                        value={values.link}
                      />
                    </Pressable>

                    {/* <Text
                      fontSize={16}
                      mt={6}
                      mb={2}
                      ml={2}
                      fontFamily={'NotoSans-SemiBold'}>
                      Service:
                    </Text>
                    <Pressable
                      onPress={() => {
                        navigation.navigate('UpdateService');
                      }}
                      bg={'secondary'}
                      p={4}
                      rounded={'full'}
                      flexDir={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                      <Text
                        fontSize={16}
                        fontFamily={'NotoSans-SemiBold'}
                        w={'80%'}>
                        {userservice?.data[0]?.service_name ||
                          'Add Service here'}
                      </Text>
                      <Text
                        fontSize={12}
                        underline
                        color={'primary.50'}
                        fontFamily={'NotoSans-SemiBold'}>
                        Edit
                      </Text>
                    </Pressable>
                    {userservicetypes?.result?.length>0&&(<AppointmentComp
                      data={userservicetypes?.result}
                      onPress={res => handlePress(res)}
                    />)} */}

                    <View my={'20%'}>
                      <JdButton
                        title={'Update'}
                        loading={profileLoading}
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                  <BottomSheet
                    defaultOff={true}
                    height={'18%'}
                    width="100%"
                    openBottom={bottomSheetRef}>
                    <Stack
                      marginTop={10}
                    // mt={3}
                    // marginHorizontal={5}
                    // space={3}
                    >
                      {active === true ? (
                        <>
                          <View
                            position={'absolute'}
                            right={currentLanguage === 'ar' ? null : 0}
                            left={currentLanguage === 'ar' ? 0 : null}
                            top={-20}>
                            <Pressable
                              onPress={() => {
                                bottomSheetRef.current.close();
                              }}>
                              <Entypo
                                name={'cross'}
                                color={'black'}
                                size={18}
                              />
                            </Pressable>
                          </View>

                          <Loader />
                          <Text
                            fontSize={14}
                            mb={5}
                            fontFamily={'NotoSans-Medium'}
                            textAlign={'center'}>
                            {t('Connecting to Google....')}
                          </Text>
                        </>
                      ) : (
                        <>
                          <View
                            position={'absolute'}
                            right={currentLanguage === 'ar' ? null : 0}
                            left={currentLanguage === 'ar' ? 0 : null}
                            top={-20}>
                            <Pressable
                              onPress={() => {
                                bottomSheetRef.current.close();
                              }}>
                              <Entypo
                                name={'cross'}
                                color={'black'}
                                size={18}
                              />
                            </Pressable>
                          </View>
                          <Pressable
                            onPress={() => {
                              if (Platform.OS == "ios") {
                                bottomSheetRef.current.close();
                                setTimeout(() => {
                                  handleCamera();
                                }, 1000);
                              } else {
                                handleCamera();
                                bottomSheetRef.current.close();
                              }

                            }}>
                            <Row
                              alignItems={'center'}
                              flexDir={
                                currentLanguage === 'ar' ? 'row-reverse' : null
                              }>
                              <Feather
                                name={'camera'}
                                size={15}
                                color={'black'}
                              />
                              <Text
                                mx={4}
                                fontSize={14}
                                fontFamily={'NotoSans-Medium'}>
                                {t('Upload from Camera')}
                              </Text>
                            </Row>
                          </Pressable>
                          <Divider my={3} />
                          <Pressable
                            onPress={() => {
                              if (Platform.OS == "ios") {
                                bottomSheetRef.current.close();
                                setTimeout(() => {
                                  handlePickImage();
                                }, 1000);
                              } else {
                                bottomSheetRef.current.close();
                                handlePickImage();
                              }

                            }}>
                            <Row
                              alignItems={'center'}
                              flexDir={
                                currentLanguage === 'ar' ? 'row-reverse' : null
                              }>
                              <MaterialCommunityIcons
                                name={'image-outline'}
                                size={20}
                                color={'black'}
                              />
                              <Text
                                mx={4}
                                fontSize={14}
                                fontFamily={'NotoSans-Medium'}>
                                {t('Upload from Gallery')}
                              </Text>
                            </Row>
                          </Pressable>
                        </>
                      )}
                    </Stack>
                  </BottomSheet>
                </>
              )}
            </Formik>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
