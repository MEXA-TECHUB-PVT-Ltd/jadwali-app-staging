import {
  View,
  Text,
  Divider,
  Row,
  ScrollView,
  Image,
  Pressable,
} from 'native-base';
import React from 'react';
import { Alert, Platform, StyleSheet } from 'react-native';
import JdButton from '../../components/button/Buttons';
import JdInputs from '../../components/inputs/inputs';
import * as Yup from 'yup';

import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';

import { Formik } from 'formik';
import Header from '../../components/Header/Header';
import Logo from '../../components/logo/Logo';

import { useAddUserMutation, useLogninUserMutation } from '../../redux/auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword, setUserData } from '../../redux/fatures/auth';
import AlertSnackBar from '../../components/customSnackBar/AlertSnackBar';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { storeData, storeObjectData } from '../../Async/AsyncStorage/AsyncStorage';

const SignIn = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const d = useSelector(state => state?.auth?.userData);

  // console.log('userData is: ', d);

  const [
    loginUser,
    { data: userData, isLoading: SignInLoading, error: isError },
  ] = useLogninUserMutation();
  const [postUser] = useAddUserMutation();

  const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const handleCreate = (email, password) => {
    const body = {
      email: email,
      password: password,
      type: 'email',
    };
    loginUser(body).then(async res => {
      if (res?.data?.status === true) {
        await storeData('uid', `${res?.data?.result?.id}`);
        await dispatch(setPassword(res?.data?.result?.id));

        // setAlert(res?.data);

        await dispatch(setUserData(res?.data?.result));
        setModalVisible(true);
      }
    });
  };
  const { t } = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  React.useEffect(() => {
    if (isError) {
      setModalVisible(true);
    }
  }, [isError]);

  const googlelogin = async () => {
    try {
      signOut();
      GoogleSignin.configure({
        webClientId: '213240793812-65iltp2jkv7cjgkbj7ffbg45fp088q2f.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();

      if (data) {
        const loginBody = {
          email: data.user.email,
          type: 'google',
          token: data?.idToken,
        };

        try {
          const loginResponse = await loginUser(loginBody);
          if (loginResponse?.data?.message === 'Sign in successfully!') {
            
            await storeData('uid', `${loginResponse?.data?.result?.id}`);
            await dispatch(setPassword(loginResponse?.data?.result?.id));
            await dispatch(setUserData(loginResponse?.data?.result));
            //setModalVisible(true);
            // await dispatch(setPassword(loginResponse?.data?.result?.id));
            // setModalVisible(true);
            // await dispatch(setUserData(loginResponse?.data?.result));
          }
          else {
            const signUpBody = {
              signup_type: 'google',
              email: data?.user?.email,
              full_name: `${data.user.familyName} ${data.user.givenName}`,
              google_access_token: data?.idToken,
            };

            const signUpResponse = await postUser(signUpBody);
            if (signUpResponse?.data?.status === true) {
              dispatch(setUserData(signUpResponse?.data?.result));
              await storeObjectData('USERDATA', {
                id: data?.user?.id,
                first_name: data?.user?.givenName,
                last_name: data?.user?.familyName,
                email: data?.user?.email,
                photo: data?.user?.photo,
              });
              await storeData('uid', `${signUpResponse?.data?.result?.id}`);
              await dispatch(setPassword(signUpResponse?.data?.result?.id));
              await dispatch(setUserData(signUpResponse?.data?.result));
              // setModalVisible(true);
              // storeData('idToken', data?.idToken);
              // Alert.alert("Congrates====")
              // let fromSignin = true;
              // navigation.navigate('Welcome', fromSignin);
              // await dispatch(setUserData(res?.data?.result));
              // let fromSignup = true;
              // navigation.navigate('Welcome', fromSignup);
            }
          }
        } catch (error) {
          console.error('Error during login/signup:', error.response);
          // Handle error during login/signup
        }
      }
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        errorMessage = 'Login was cancelled.';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        errorMessage = 'Login is already in progress.';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorMessage = 'Google Play Services is not available or outdated.';
      }
      console.error('Google login error:', error);
      // Handle Google login error
    }
  };

  // const googlelogin = async () => {
  //   signOut();
  //   try {
  //     GoogleSignin.configure({
  //       webClientId:
  //         '626538884992-i10ru8d2sq4ml8mtuhcj540qtmcomk3n.apps.googleusercontent.com',
  //     });
  //     await GoogleSignin.hasPlayServices();
  //     const data = await GoogleSignin.signIn();
  //     console.log("check Data", data)

  //     if (data) {
  //       const body = {
  //         email: data.user.email,
  //         type: 'google',
  //         token: data?.idToken,
  //       };
  //       loginUser(body).then(async res => {
  //         if (res?.data?.message === 'Sign in successfully!') {
  //           await dispatch(setPassword(res?.data?.result?.id));
  //           setModalVisible(true);
  //           await dispatch(setUserData(res?.data?.result));
  //         }
  //       });
  //       // const {displayName, uid, email} = data;
  //       // const array = data?.user?.name?.split(' ');
  //     }
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       console.log(error);
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //       console.log(error);
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //       console.log(error);
  //     } else {
  //       // some other error happened
  //       console.log(error);
  //     }
  //   }
  // };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      //   this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <ScrollView keyboardShouldPersistTaps="handled" flex={1} bg={'white'}>
      <Header />
      <View mt={5} alignItems={'center'} justifyContent={'center'}>
        <Logo
          // source={require('../../assets/Jadwali-Logo.png')}
          // alt="Alternate Text"
          resizeMode="contain"
          size="sm"
        />

        <Text
          mt={'10%'}
          mb={2}
          fontSize={'30'}
          fontFamily={'NotoSans-SemiBold'}>
          {t('Sign In')}
        </Text>

        <Text
          mb={10}
          fontSize={14}
          fontFamily={'NotoSans-Regular'}
          color={'grey.400'}>
          {t('Sign In to your Jadwali account')}
        </Text>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={formSchema}
          onSubmit={values =>
            handleCreate(values.email, values.password, values.name)
          }>
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched
          }) => (
            <View w={'85%'}>
              <View>
                <JdInputs
                  placeholder={'Enter your Email'}
                  leftIconName={'mail'}
                  height={50}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  autoCapitalize={'none'}
                />
                {touched.email && errors.email && (
                  <View
                    flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
                    alignItems={'center'}
                    mt={1}>
                    <View bg={'red.500'} h={2} w={2} rounded={'full'} mx={1} />
                    <Text color={'red.500'} fontSize={12}>
                      {t(errors.email)}
                    </Text>
                  </View>
                )}
              </View>
              <View mt={5}>
                <JdInputs
                  placeholder={'Enter your Password'}
                  rightIcon
                  leftIconName={'lock'}
                  type={'password'}
                  height={50}

                  onChangeText={handleChange('password')}
                  value={values.password}
                  autoCapitalize={'none'}
                />

                {touched.password && errors.password && (
                  <View
                    flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
                    alignItems={'center'}
                    mt={1}>
                    <View bg={'red.500'} h={2} w={2} rounded={'full'} mx={1} />
                    <Text color={'red.500'} fontSize={12}>
                      {t(errors.password)}
                    </Text>
                  </View>
                )}
              </View>

              <Pressable
                onPress={() => navigation.navigate('ForgotPassword')}
                alignSelf={
                  currentLanguage === 'ar' ? 'flex-start' : 'flex-end'
                }>
                <Text
                  // textAlign={currentLanguage === 'ar' ? 'left' : 'right'}
                  mr={'2'}
                  mt={2}
                  fontFamily={'NotoSans-SemiBold'}
                  color={'primary.50'}
                  fontSize={'14'}>
                  {t('Forgot Password')}
                </Text>
              </Pressable>

              <View mt={10}>
                <JdButton
                  title={'Sign In'}
                  onPress={handleSubmit}
                  loading={SignInLoading}
                />
              </View>
            </View>
          )}
        </Formik>
        <Row
          // w={'90%'}
          mx={10}
          alignItems={'center'}
          justifyContent={'space-between'}
          mt={10}>
          <Divider w={'50%'} />
          <Text fontSize={16} fontFamily={'NotoSans-Medium'} mx={2}>
            {t('or')}
          </Text>
          <Divider w={'50%'} />
        </Row>
        <Row>
          {/* <Image
            source={require('../../assets/Facebook.png')}
            alt={'bg'}
            style={styles.logo}
          /> */}
          <Pressable
            onPress={() => {
              googlelogin();
            }}>
            <Image
              source={require('../../assets/google.png')}
              style={styles.logo}
              alt={'bfg'}
            />
          </Pressable>
          {Platform.OS == "ios" &&
            <Image
              source={require('../../assets/apple.png')}
              alt={'bg'}
              style={styles.logo}
            />
          }

        </Row>
        <Row
          alignItems={'center'}
          flexDirection={currentLanguage === 'ar' ? 'row-reverse' : null}>
          <Text
            fontSize={14}
            fontFamily={'NotoSans-Regular'}
            color={'grey.400'}>
            {t("Don't have an account")}{' '}
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text
              fontSize={14}
              fontFamily={'NotoSans-Bold'}
              color={'primary.50'}>
              {t('Create Account')}
            </Text>
          </Pressable>
        </Row>
      </View>
      {/* <AlertModal
        heading={'Alert'}
        btntxt2={'OK'}
        onPress={() => {
          setModalVisible(false);
        }}
        // btntxt1={'No'}
        message={isError?.data?.message}
        modalVisible={modalVisible}
        onPress={() => {
          setModalVisible(false);
        }}
        setModalVisible={setModalVisible}
      /> */}
      <AlertSnackBar
        message={isError ? {
          message: isError.data?.message,
          status: false
        } : { message: 'Sign in successfully! ' }}
        // status={ale?.status}
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  img: {
    // marginTop: '10%',
    height: '40',
    width: '40',
  },
  logo: {
    height: 40,
    width: 40,
    marginVertical: 20,
    marginHorizontal: 10,
  },
});
