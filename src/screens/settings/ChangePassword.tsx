import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  Avatar,
  ScrollView,
  Stack,
  Pressable,
  Image,
  Divider,
  Row,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Header from '../../components/Header/Header';
import JdInputs from '../../components/inputs/inputs';
import {Formik} from 'formik';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';

import JdButton from '../../components/button/Buttons';
import * as Yup from 'yup';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import SettingsMenu from './components/SettingsMenu';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
import {useUpdatePasswordMutation} from '../../redux/auth/auth';
import AlertModal from '../../components/Modal/AlertModal';
import {useSelector} from 'react-redux';

const ChangePassword = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const uid = useSelector(state => state.auth.userData?.id);
  const [error, setError] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [
    updatePassword,
    {data: updatedData, error: isError, isLoading: Loading},
  ] = useUpdatePasswordMutation();
  const handleVisibility = () => {
    setVisible(false);
    navigation.goBack();
  };
  const formSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
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
  const handleCreate = (oP, nP, cP) => {
    const body = {
      user_id: `${uid}`,
      password: oP,
      newPassword: cP,
    };
    // console.log('create', body);
    updatePassword(body).then(res => {
      if (res?.data?.status === true) {
        setVisible(true);
      } else {
        setError(res?.error?.data?.message);
      }
    });
  };
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  React.useEffect(() => {
    if (isError) {
      setModalVisible(true);
    }
  }, [isError]);

  return (
    <View bg={'white'} flex={1}>
      <Header title={'Change Password'} />
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        translation={currentLanguage}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
          navigation.goBack();
        }}
        messageDescription={'Password changed successfullly'}
      />
      {/* <CustomSnackbar
        message={'Success'}
        visible={visible}
        onDismiss={() => {
          handleVisibility();
        }}
        messageDescription={'Password changed successfullly'}
      /> */}
      <ScrollView keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={formSchema}
          onSubmit={values =>
            handleCreate(
              values.oldPassword,
              values.newPassword,
              values.confirmPassword,
            )
          }>
          {({
            values,
            handleChange,
            touched,
            handleSubmit,

            errors,
          }) => (
            <>
              <View p={5} flex={1}>
                <View>
                  <JdInputs
                    placeholder={'Enter Old Password'}
                    leftIconName="lock"
                    value={values.oldPassword}
                    onChangeText={handleChange('oldPassword')}
                    autoCapitalize={'none'}
                    rightIcon
                    type={'password'}
                  />
                  {touched.oldPassword && errors.oldPassword && (
                    <View
                      flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
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
                        {t(errors.oldPassword)}
                      </Text>
                    </View>
                  )}
                </View>
                <View my={5}>
                  <JdInputs
                    type={'password'}
                    placeholder={'Enter New Password'}
                    leftIconName="lock"
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    autoCapitalize={'none'}
                    rightIcon
                  />
                  {touched.newPassword && errors.newPassword && (
                    <View
                      flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
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
                    type={'password'}
                    placeholder={'Confrim Password'}
                    leftIconName="lock"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    autoCapitalize={'none'}
                    rightIcon
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <View
                      flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
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
              <View mt={'90%'} mx={5}>
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
      <AlertModal
        heading={'Alert'}
        btntxt2={'OK'}
        // btntxt1={'No'}
        message={error}
        modalVisible={modalVisible}
        onPress={() => {
          setModalVisible(false);
        }}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
