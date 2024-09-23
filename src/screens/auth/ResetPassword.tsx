import {
  //   KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  //   Text,
  TouchableWithoutFeedback,
  //   Button,
  Keyboard,
} from 'react-native';
import React from 'react';
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
import {Platform} from 'react-native';
import JdInputs from '../../components/inputs/inputs';
import JdButton from '../../components/button/Buttons';
import Header from '../../components/Header/Header';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useResetPasswordMutation} from '../../redux/auth/auth';
import AlertModal from '../../components/Modal/AlertModal';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import AlertSnackBar from '../../components/customSnackBar/AlertSnackBar';
const ResetPassword = ({navigation, route}) => {
  const email = route?.params?.email;
  const [visible, setVisible] = React.useState(false);
  const [
    updatePassword,
    {data: updatedData, error: isError, isLoading: Loading},
  ] = useResetPasswordMutation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const formSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]{8,}$/,
        'Password must contain at least 8 characters, including one letter and one number',
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleCreate = (nP, cP) => {
    const body = {
      email: email,

      new_password: cP,
    };
    // console.log('create', body);
    updatePassword(body).then(res => {
      console.log('res', res);
      if (res?.data?.status === true) {
        setModalVisible(true);
      }
    });
  };
  const {t} = useTranslation();
  React.useEffect(() => {
    if (isError) {
      setModalVisible(true);
    }
  }, [isError]);
  return (
    <View flex={1} bg={'white'}>
      <Header />
      {/* <CustomSnackbar
        message={'Success'}
        visible={visible}
        // translation={currentLanguage}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
          navigation.navigate('SignIn');
        }}
        messageDescription={'Password reset successfullly'}
      /> */}
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View alignItems={'center'}>
              <Heading mt={'25%'}>{t('Reset Password')}</Heading>
              <Text color="grey.400" mt={'2'} fontSize={14}>
                {t('Create a strong password')}
              </Text>
            </View>

            <Formik
              initialValues={{
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={formSchema}
              onSubmit={values =>
                handleCreate(values.newPassword, values.confirmPassword)
              }>
              {({
                values,
                handleChange,

                handleSubmit,
                touched,
                errors,
              }) => (
                <>
                  <View mt={'35%'}>
                    <View my={5}>
                      <JdInputs
                        type={'password'}
                        placeholder={'Enter New Password'}
                        leftIconName="lock"
                        value={values.newPassword}
                        autoCapitalize={'none'}
                        height={50}
                        onChangeText={handleChange('newPassword')}
                        rightIcon
                      />
                      {touched.newPassword && errors.newPassword && (
                        <View
                          flexDir={'row'}
                          alignItems={'center'}
                          mt={1}
                          mx={1}>
                          <View
                            bg={'red.500'}
                            h={2}
                            w={2}
                            rounded={'full'}
                            mx={1}
                          />
                          <Text color={'red.500'} fontSize={12}>
                            {t(errors.newPassword)}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View>
                      <JdInputs
                        placeholder={'Confrim Password'}
                        leftIconName="lock"
                        value={values.confirmPassword}
                        type={'password'}
                        height={50}
                        autoCapitalize={'none'}
                        onChangeText={handleChange('confirmPassword')}
                        rightIcon
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <View
                          flexDir={'row'}
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
                            {t(errors.confirmPassword)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View mt={'45%'} mx={5}>
                    <JdButton
                      title={'Change'}
                      fontSize={14}
                      onPress={handleSubmit}
                      loading={Loading}
                    />
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
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
        message={isError?.data?.message}
        modalVisible={modalVisible}
        onPress={() => {
          setModalVisible(false);
        }}
        setModalVisible={setModalVisible}
      /> */}
      <AlertSnackBar
        message={
          isError ? isError?.data : {message: 'Password reset Successfully!'}
        }
        // status={ale?.status}
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
          if (!isError) {
            navigation.navigate('SignIn');
          }
        }}
      />
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
export default ResetPassword;
