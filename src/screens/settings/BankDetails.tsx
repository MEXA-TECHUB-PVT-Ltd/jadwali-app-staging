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
  Switch,
} from 'native-base';

import React from 'react';
import Header from '../../components/Header/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
import {useGetAllFaqsQuery} from '../../redux/faqs/faqApi';
import {Formik} from 'formik';
import * as Yup from 'yup';
import JdInputs from '../../components/inputs/inputs';
import JdButton from '../../components/button/Buttons';
import {
  useGetBankDetailsQuery,
  usePostBankDetailsMutation,
  useUpdateBankDetailsMutation,
} from '../../redux/auth/auth';
import {useSelector} from 'react-redux';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import LoaderModal from '../../components/Loader/Loader';

const BankDetails = ({navigation}) => {
  const [selected, setSelected] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const uid = useSelector(state => state?.auth?.userData?.id);
  const detailsAdded = useSelector(
    state => state?.auth?.userData?.is_bank_details,
  );
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  const {data: bankData, isLoading, isError} = useGetBankDetailsQuery(uid);
  console.log(bankData);
  const [postAccount, {isLoading: postLoading}] = usePostBankDetailsMutation();
  const [updateAccount, {isLoading: updateLoading}] =
    useUpdateBankDetailsMutation();
  const formSchema = Yup.object().shape({
    holderName: Yup.string().required('Account holder name is required'),
    bankName: Yup.string().required('Bank nmae is required'),
    accountName: Yup.string().required('Account name is required'),
    bankNumber: Yup.string().required('Account number is required'),
  });
  const handleCreate = (name, bName, bNumber, AName) => {
    if (bankData?.result?.length > 1) {
      let body = {
        id: 1,
        user_id: uid,
        bank_name: bName,
        account_number: bNumber,
        account_name: AName,
        account_holder_number: name,
      };
      updateAccount(body).then(res => {
        console.log('res', res);
        if (res?.data?.status === true) {
          setVisible(true);
        }
      });
    } else {
      let body = {
        user_id: uid,
        bank_name: bName,
        account_number: bNumber,
        account_name: AName,
        account_holder_number: name,
      };
      postAccount(body).then(res => {
        console.log('res', res);
        if (res?.data?.status === true) {
          setVisible(true);
        }
      });
    }
  };
  return (
    <View bg={'white'} flex={1}>
      <Header title={'Bank Details'} />
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        translation={currentLanguage}
        height={'8%'}
        onDismiss={() => {
          setVisible(false);
          navigation.goBack();
        }}
        messageDescription={
          detailsAdded
            ? 'Bank details updated successfullly'
            : 'Bank details Added successfully'
        }
      />
      {isLoading ? (
        <LoaderModal visible={isLoading} />
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          flex={1}
          showsVerticalScrollIndicator={false}>
          <View mt={5} mx={4}>
            <Formik
              validateOnChange
              initialValues={{
                holderName:
                  bankData?.result?.length > 0
                    ? bankData?.result[0]?.account_holder_number
                    : '',
                bankName:
                  bankData?.result?.length > 0
                    ? bankData?.result[0]?.bank_name
                    : '',
                bankNumber:
                  bankData?.result?.length > 0
                    ? bankData?.result[0]?.account_number
                    : '',
                accountName:
                  bankData?.result?.length > 0
                    ? bankData?.result[0]?.account_name
                    : '',
              }}
              validationSchema={formSchema}
              onSubmit={values =>
                handleCreate(
                  values.holderName,
                  values.bankName,
                  values.bankNumber,
                  values.accountName,
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
                        label={'Account Holder Name'}
                        fontSize={16}
                        fontFamily={'NotoSans-Medium'}
                        placeholder={'Enter Account Holder Name'}
                        value={values.holderName}
                        onChangeText={handleChange('holderName')}
                        autoCapitalize={'none'}
                      />
                      {touched.holderName && errors.holderName && (
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
                            {t(errors.holderName)}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View my={5}>
                      <JdInputs
                        fontSize={16}
                        fontFamily={'NotoSans-Medium'}
                        label={'Bank Name'}
                        placeholder={'Enter Bank Name'}
                        value={values.bankName}
                        onChangeText={handleChange('bankName')}
                        autoCapitalize={'none'}
                      />
                      {touched.bankName && errors.bankName && (
                        <View
                          flexDir={
                            currentLanguage === 'ar' ? 'row-reverse' : 'row'
                          }
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
                            {t(errors.bankName)}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View mb={5}>
                      <JdInputs
                        fontSize={16}
                        fontFamily={'NotoSans-Medium'}
                        label={'Account Name'}
                        placeholder={'Enter Account Name'}
                        value={values.accountName}
                        onChangeText={handleChange('accountName')}
                        autoCapitalize={'none'}
                      />
                      {touched.accountName && errors.accountName && (
                        <View
                          flexDir={
                            currentLanguage === 'ar' ? 'row-reverse' : 'row'
                          }
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
                            {t(errors.accountName)}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View>
                      <JdInputs
                        fontSize={16}
                        fontFamily={'NotoSans-Medium'}
                        label={'Account Number'}
                        placeholder={'Enter Account Number'}
                        value={values.bankNumber}
                        onChangeText={handleChange('bankNumber')}
                        autoCapitalize={'none'}
                      />
                      {touched.bankNumber && errors.bankNumber && (
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
                            {t(errors.bankNumber)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View mt={'20%'} mx={5}>
                    <JdButton
                      title={detailsAdded === true ? 'Update' : 'Add'}
                      fontSize={14}
                      onPress={handleSubmit}
                      loading={postLoading || updateLoading}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default BankDetails;

const styles = StyleSheet.create({});
