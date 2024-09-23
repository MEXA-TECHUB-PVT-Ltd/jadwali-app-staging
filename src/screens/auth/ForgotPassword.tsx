import {
  //   KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  //   Text,
  TouchableWithoutFeedback,
  //   Button,
  Keyboard,
} from 'react-native';
import {
  Input,
  View,
  KeyboardAvoidingView,
  Text,
  Button,
  VStack,
  Heading,
  Center,
  NativeBaseProvider,
  ScrollView,
} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import JdInputs from '../../components/inputs/inputs';
import JdButton from '../../components/button/Buttons';
import Header from '../../components/Header/Header';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
import {useForgetPasswordMutation} from '../../redux/auth/auth';
import AlertModal from '../../components/Modal/AlertModal';
import AlertSnackBar from '../../components/customSnackBar/AlertSnackBar';

const ForgotPassword = ({navigation}) => {
  const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const [modalVisible, setModalVisible] = React.useState(false);
  const [emails, setEmails] = React.useState('');
  const [forgetPassword, {data, error, isLoading}] =
    useForgetPasswordMutation();
  const handleCreate = em => {
    const body = {
      email: em,
    };
    setEmails(em);
    forgetPassword(body).then(res => {
      if (res?.data?.status === true) {
        setModalVisible(true);
      }
    });
  };
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  React.useEffect(() => {
    if (error) {
      setModalVisible(true);
    }
  }, [error]);
  return (
    <View flex={1} bg={'white'}>
      <Header />
      <KeyboardAvoidingView
        h={{
          base: '900px',
          lg: 'auto',
        }}
        alignItems={'center'}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        bg={'white'}
        flex={1}>
        {/* <Center> */}

        <VStack flex="1" justifyContent="space-between" w="100%" maxW="300">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View alignItems={'center'}>
              <Heading mt={'40%'}>{t('Forgot Password')}</Heading>
              <Text color="grey.400" mt={'2'} fontSize={14}>
                {t('Enter your email for a verification code')}
              </Text>
            </View>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={formSchema}
              onSubmit={values => handleCreate(values.email)}>
              {({
                values,
                handleChange,

                handleSubmit,
                touched,
                errors,
              }) => (
                <>
                  <View mt={'50%'}>
                    <JdInputs
                      value={values.email}
                      onChangeText={handleChange('email')}
                      placeholder="Enter your Email"
                      leftIconName={'mail'}
                      height={50}
                      autoCapitalize={'none'}
                    />
                    {touched.email && errors.email && (
                      <View
                        flexDir={
                          currentLanguage === 'ar' ? 'row-reverse' : 'row'
                        }
                        alignItems={'center'}
                        mt={1}>
                        <View
                          bg={'red.500'}
                          h={2}
                          w={2}
                          rounded={'full'}
                          mr={1}></View>
                        <Text color={'red.500'} fontSize={12}>
                          {t(errors.email)}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View mt={'50%'} mb={10}>
                    <JdButton
                      title={'Send Code'}
                      onPress={handleSubmit}
                      loading={isLoading}
                    />
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
          <AlertSnackBar
            message={
              error?.data?.message
                ? error?.data
                : {message: 'Email Verification Successfull'}
            }
            // status={ale?.status}
            visible={modalVisible}
            onDismiss={() => {
              setModalVisible(false);
              if (!error) {
                navigation.navigate('VerifyOtp', {email: emails});
              }
            }}
          />
        </VStack>
        {/* </Center> */}
      </KeyboardAvoidingView>
      {/* <AlertModal
        heading={'Alert'}
        btntxt2={'OK'}
        onPress={() => {
          setModalVisible(false);
        }}
        // btntxt1={'No'}
        message={error?.data?.message}
        modalVisible={modalVisible}
        onPress={() => {
          setModalVisible(false);
        }}
        setModalVisible={setModalVisible}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
export default ForgotPassword;
