import {
  View,
  Text,
  Divider,
  Row,
  HStack,
  ScrollView,
  Image,
  Pressable,
} from 'native-base';
import React from 'react';
import { Alert, Platform, StyleSheet } from 'react-native';
import JdButton from '../../components/button/Buttons';
import JdInputs from '../../components/inputs/inputs';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Header from '../../components/Header/Header';
import Logo from '../../components/logo/Logo';
import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';
import { useAuthenticateUserWithGoogleMutation } from '../../redux/googleAuth/googleAut';
import {
  GoogleSignin,
  statusCodes,
  GoogleAuth,
} from '@react-native-google-signin/google-signin';
import { useAddUserMutation, useLogninUserMutation } from '../../redux/auth/auth';
import AlertModal from '../../components/Modal/AlertModal';
import { useDispatch } from 'react-redux';
import { setPassword, setUserData } from '../../redux/fatures/auth';
import {
  getStorageData,
  getStorageObjectData,
  getUserProfileData,
  storeData,
  storeObjectData,
  storeUserProfileData,
} from '../../Async/AsyncStorage/AsyncStorage';
import { getProfileData } from 'react-native-calendars/src/Profiler';
import AlertSnackBar from '../../components/customSnackBar/AlertSnackBar';

const SignUp = ({ navigation }: any) => {
  const [currentLanguage, setLanguage] = React.useState();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);

  const [postUser, { data: userData, isLoading: SignupLoading, error: isError }] =
    useAddUserMutation();
  const [loginUser] = useLogninUserMutation();
  const [errorMessage, setErrormessage] = React.useState('');
  const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required(
        `A password with atleast 8 characters ${'\n'}Use a few words, avoid common phrases`,
      )
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]{8,}$/,
        'Password must contain at least 8 characters, including one letter and one number',
      ),
    name: Yup.string().required('Name is required'),
  });

  const handleCreate = (email, password, name) => {
    const body = {
      email: email,
      full_name: name,
      password: password,
      signup_type: 'email',
    };
    postUser(body).then(async res => {
      console.log(res);
      if (res?.data?.status === true) {
        setModalVisible(true);
        await dispatch(setUserData(res?.data?.result));
        let fromSignup = true;
        navigation.navigate('Welcome', fromSignup);
      }
    });
  };
  const { t } = useTranslation();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const handleData = async () => {
    // const datauser = await getStorageData('idToken');
    const dataa = await getStorageObjectData('USERDATA');
  };
  React.useEffect(() => {
    handleData();
  });

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
            setModalVisible(true);
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
            console.log("---------", signUpResponse)
            if (signUpResponse?.data?.status === true) {
              dispatch(setUserData(signUpResponse?.data?.result));
              await storeObjectData('USERDATA', {
                id: data?.user?.id,
                first_name: data?.user?.givenName,
                last_name: data?.user?.familyName,
                email: data?.user?.email,
                photo: data?.user?.photo,
              });
              // Alert.alert("else Hit")
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
          console.error('Error during login/signup:', error);
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
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      //   this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  console.log("isError", isError)
  return (
    <ScrollView keyboardShouldPersistTaps="handled" flex={1} bg={'white'}>
      <Header />
      <View mt={5} bg={'white'} alignItems={'center'} justifyContent={'center'}>
        <Logo
          // source={require('../../assets/Jadwali-Logo.png')}
          // alt="Alternate Text"
          resizeMode="contain"
          size="sm"
        />

        <Text mt={'5%'} mb={2} fontSize={30} fontFamily={'NotoSans-SemiBold'}>
          {t('Sign Up')}
        </Text>

        <Text
          mb={10}
          fontSize={16}
          fontFamily={'NotoSans-Regular'}
          color={'grey.400'}>
          {t('Sign Up to Jadwali')}
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
            touched,
            errors,
          }) => (
            <View w={'85%'}>
              <View>
                <JdInputs
                  placeholder={'Enter your Email'}
                  leftIconName={'mail'}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  height={50}
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
                  placeholder={'Enter your FullName'}
                  leftIconName={'person'}
                  height={50}

                  onChangeText={handleChange('name')}
                  value={values.name}
                  autoCapitalize={'none'}
                />
                {touched.name && errors.name && (
                  <View
                    flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
                    mt={1}
                    alignItems={'center'}>
                    <View bg={'red.500'} h={2} w={2} rounded={'full'} mx={1} />
                    <Text color={'red.500'} fontSize={12}>
                      {t(errors.name)}
                    </Text>
                  </View>
                )}
              </View>
              <View mt={5}>
                <JdInputs
                  autoCapitalize={'none'}
                  placeholder={'Enter your Password'}
                  leftIconName={'lock'}
                  height={50}

                  onChangeText={handleChange('password')}
                  value={values.password}
                  rightIcon
                  type={'password'}
                />
                {touched.password && errors.password && (
                  <View>
                    <View
                      flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
                      alignItems={'center'}
                      mt={1}>
                      <View
                        bg={'red.500'}
                        h={2}
                        w={2}
                        rounded={'full'}
                        mx={1}
                      />
                      <Text color={'red.500'} fontSize={12}>
                        {t('A password with aleast 8 characters')}
                      </Text>
                    </View>
                    <View
                      flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
                      alignItems={'center'}
                      mt={1}>
                      <View
                        bg={'red.500'}
                        h={2}
                        w={2}
                        rounded={'full'}
                        mx={1}
                      />
                      <Text color={'red.500'} fontSize={12}>
                        {t('Use a few words, avoid common phrases')}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <View mt={10}>
                <JdButton
                  title={'Continue'}
                  onPress={handleSubmit}
                  loading={SignupLoading}
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
            style={styles.logo}
            alt={'bg'}
          /> */}
          <Pressable onPress={() => googlelogin()}>
            <Image
              source={require('../../assets/google.png')}
              style={styles.logo}
              alt={'bg'}
            />
          </Pressable>

          {Platform.OS == "ios" &&
            <Image
              source={require('../../assets/apple.png')}
              style={styles.logo}
              alt={'bg'}
            />
          }

        </Row>
        <Row
          alignItems={'center'}
          flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}>
          <Text
            fontSize={14}
            color={'grey.400'}
            fontFamily={'NotoSans-Regular'}>
            {t('Already have an account')}
          </Text>
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text
              fontSize={16}
              fontFamily={'NotoSans-Bold'}
              color={'primary.50'}>
              {t('Sign In')}
            </Text>
          </Pressable>
        </Row>
      </View>
      <AlertSnackBar
        message={
          isError
            ? { message: isError.data?.message, status: false }
            : { message: 'Sign up successfully! ' }
        }
        // status={ale?.status}
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default SignUp;
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
