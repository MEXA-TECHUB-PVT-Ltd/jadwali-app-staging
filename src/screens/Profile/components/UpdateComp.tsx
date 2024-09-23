import {Alert, StyleSheet} from 'react-native';
import {Text, View, Pressable, Row, FlatList} from 'native-base';
import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {
  useGetUserServiceTypesQuery,
  useUpdateUserServiceTypesMutation,
} from '../../../redux/auth/auth';
import AlertSnackBar from '../../../components/customSnackBar/AlertSnackBar';
import JdButton from '../../../components/button/Buttons';
import {useAddServiceTypesMutation} from '../../../redux/services/services';

const UpdateComp = props => {
  const [selectedItemArr, setSelectedItemArr] = React.useState([]);
  const [postServie, {data: isData, error: isError, isLoading}] =
    useUpdateUserServiceTypesMutation();
  const [attachServiceType, {isLoading: addLoading}] =
    useAddServiceTypesMutation();
  const uid = useSelector(state => state?.auth?.userData?.id);
  const {data: userservicetypes, isLoading: servicetypesLoading} =
    useGetUserServiceTypesQuery(uid);
  React.useEffect(() => {
    if (
      userservicetypes?.result?.length > 0 &&
      props?.fromAppointment === true
    ) {
      userservicetypes?.result?.map(item => {
        setSelectedItemArr(prev => {
          return [...prev, item?.service_type_id];
        });
      });
    }
  }, [userservicetypes?.result]);
  const navigation = useNavigation();

  const isItemSelected = id => {
    return selectedItemArr?.includes(id);
  };

  const handleColor = item => {
    setSelectedItemArr(prevItems => {
      // it will remove the item If the item is already selected
      if (prevItems?.includes(item)) {
        return prevItems.filter(selectedItem => selectedItem !== item);
      }

      // it willl remove one item from the arr and return the new arr
      else if (prevItems?.length >= 3) {
        setExtened(true);
        setModalVisible(true);
        // return [...prevItems.slice(1), item];
        return [...prevItems];
      }
      // in this if arr is smaller than 3 it will add the item
      // else if (prevItems.length === 3) return [...prevItems];
      else if (prevItems?.length < 3) {
        return [...prevItems, item];
      }
    });
  };

  const [extended, setExtened] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const {t} = useTranslation();

  const handleNavigation = () => {
    if (userservicetypes?.result) {
      const body = {
        user_id: uid,
        service_id: props?.id,
        service_type_id: selectedItemArr,
      };

      postServie(body).then(async res => {
        if (res?.data?.status === true) {
          if (props?.fromAppointment === true) {
            navigation.goBack();
          } else {
            navigation.navigate('Profile');
          }
        }
      });
    } else {
      const body = {
        user_id: uid,
        service_id: props?.id,
        service_type_id: selectedItemArr,
      };

      attachServiceType(body).then(async res => {
        if (res?.data?.status === true) {
          if (props?.fromAppointment === true) {
            navigation.goBack();
          } else {
            navigation.navigate('Profile');
          }
        }
      });
    }
  };
  let body = {
    status: false,
    message: extended
      ? t('You can select only upto 3 types')
      : t('Please Select three types'),
  };
  React.useEffect(() => {
    if (isError) {
      setModalVisible(true);
    }
  }, [isError]);
  return (
    <View>
      <View>
        <FlatList
          height={'68%'}
          data={props?.item}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Pressable key={index} onPress={() => handleColor(item?.id)}>
                <View
                  my={1.5}
                  opacity={1}
                  p={3}
                  bg={
                    isItemSelected(item?.id) ? 'rgba(108,48,156 , 0.11)' : null
                  }
                  w={'100%'}
                  alignItems={'center'}
                  borderColor={
                    isItemSelected(item?.id) ? 'primary.50' : 'grey.400'
                  }
                  borderWidth={1}
                  rounded={'full'}>
                  <Row
                    alignItems={'center'}
                    flexDir={
                      props?.currentLanguage === 'ar' ? 'row-reverse' : null
                    }>
                    <Text
                      color={
                        isItemSelected(item?.id) ? 'primary.50' : 'grey.400'
                      }
                      fontSize={12}
                      fontFamily={
                        isItemSelected(item?.id)
                          ? 'NotoSans-SemiBold'
                          : 'NotoSans-Regular'
                      }>
                      {t(item?.name)}
                    </Text>
                  </Row>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <View />
      <View mt={5}>
        <JdButton
          title={'Continue'}
          loading={isLoading || addLoading}
          onPress={() => {
            if (selectedItemArr.length >= 3) {
              handleNavigation();
            } else {
              setExtened(false);
              setModalVisible(true);
            }
          }}
        />
        <AlertSnackBar
          message={isError?.data?.message ? isError?.data : body}
          // status={ale?.status}
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
            if (!isError) {
            }
          }}
        />
      </View>
    </View>
  );
};

export default UpdateComp;

const styles = StyleSheet.create({});
