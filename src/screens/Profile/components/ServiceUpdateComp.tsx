import {Alert, StyleSheet} from 'react-native';
import {Text, View, Pressable, ScrollView, FlatList} from 'native-base';
import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {useTranslation} from 'react-i18next';

import {useSelector} from 'react-redux';

import {ActivityIndicator} from 'react-native-paper';
import {
  useGetUserServicesQuery,
  useUpdateUserServiceMutation,
} from '../../../redux/auth/auth';
import JdButton from '../../../components/button/Buttons';
import AlertSnackBar from '../../../components/customSnackBar/AlertSnackBar';
import {
  useAddServiceMutation,
  useAllservicesQuery,
} from '../../../redux/services/services';

const ServiceUpdateComp = () => {
  const [selectedItem, setSelectedItem] = React.useState();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [alertVisible, setAlertVisible] = React.useState<boolean>(false);
  const uid = useSelector(state => state?.auth?.userData?.id);

  const navigation = useNavigation();
  const {data: isData, error, isLoading} = useAllservicesQuery();
  const [updateService, {error: isError, isLoading: updateLoading}] =
    useUpdateUserServiceMutation();
  const [addService, {isLoading: AddLoading}] = useAddServiceMutation();
  const {data: userservice, isLoading: serviceLoading} =
    useGetUserServicesQuery(uid);
  React.useEffect(() => {
    if (userservice?.data?.length > 0) {
      setSelectedItem(userservice?.data[0]?.service_id);
    }
  }, [userservice?.data]);
  const {t} = useTranslation();
  const handleColor = item => {
    setSelectedItem(item);
  };

  const handleNavigation = () => {
    if (selectedItem && userservice) {
      const body = {
        user_id: uid,
        attach_service_id: userservice?.data[0]?.attach_service_id,
        service_id: selectedItem,
      };
      updateService(body).then(res => {
        if (res?.data?.status === true) {
          navigation.navigate('EditAppointmentType', {
            name: res?.data?.data?.service_name,
            id: selectedItem,
            fromAppointment: false,
          });
        }
      });
    } else if (!userservice) {
      const body = {
        user_id: uid,
        service_id: selectedItem,
      };
      addService(body).then(res => {
        console.log('res', res);
        if (res?.data?.status === true) {
          navigation.navigate('EditAppointmentType', {
            name: res?.data?.data?.service_name,
            id: selectedItem,
            fromAppointment: false,
          });
        }
      });
    } else {
      setModalVisible(true);
    }
  };

  React.useEffect(() => {
    if (isError) {
      setAlertVisible(true);
    }
  }, [isError]);
  let body = {
    status: false,
    message: 'Please select at least one service',
  };
  return (
    <View flex={1}>
      <AlertSnackBar
        message={body}
        // status={ale?.status}
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
          if (!isError) {
          }
        }}
      />
      <AlertSnackBar
        message={
          isError?.data?.message
            ? isError?.data
            : {message: 'Availability Added Successfully! '}
        }
        // status={ale?.status}
        visible={alertVisible}
        onDismiss={() => {
          setAlertVisible(false);
          if (!isError) {
          }
        }}
      />
      {isLoading ? (
        <ActivityIndicator size={'small'} color="black" />
      ) : (
        <>
          <View h={'85%'}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={isData?.data}
              renderItem={({item, index}) => {
                return (
                  <Pressable key={index} onPress={() => handleColor(item?.id)}>
                    <View
                      my={1.5}
                      opacity={1}
                      p={3}
                      bg={
                        item?.id === selectedItem
                          ? 'rgba(108,48,156 , 0.11)'
                          : null
                      }
                      w={'100%'}
                      alignItems={'center'}
                      borderColor={
                        item?.id === selectedItem ? 'primary.50' : 'grey.400'
                      }
                      borderWidth={1}
                      rounded={'full'}>
                      <Text
                        color={
                          item?.id === selectedItem ? 'primary.50' : 'grey.400'
                        }
                        fontFamily={
                          item?.id === selectedItem
                            ? 'NotoSans-SemiBold'
                            : 'NotoSans-Regular'
                        }>
                        {t(item.name)}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
            />
          </View>
          <View mb={5} mt={2}>
            <JdButton
              title={userservice ? 'Update' : 'Add'}
              loading={AddLoading || updateLoading}
              onPress={() => {
                handleNavigation();
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ServiceUpdateComp;
