import {Alert, StyleSheet} from 'react-native';
import {Text, View, Pressable, ScrollView, FlatList} from 'native-base';
import React from 'react';
import JdButton from '../button/Buttons';
import {useNavigation} from '@react-navigation/native';
import AlertModal from '../Modal/AlertModal';
import {useTranslation} from 'react-i18next';
import {
  useAddServiceMutation,
  useAllservicesQuery,
} from '../../redux/services/services';
import AddEvent from '../../screens/events/AddEvent';
import {useSelector} from 'react-redux';
import AlertSnackBar from '../customSnackBar/AlertSnackBar';
import {ActivityIndicator} from 'react-native-paper';

const ServicesComponent = () => {
  const [selectedItem, setSelectedItem] = React.useState();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [alertVisible, setAlertVisible] = React.useState<boolean>(false);
  const uid = useSelector(state => state?.auth?.userData?.id);

  const navigation = useNavigation();
  const {data: isData, error, isLoading} = useAllservicesQuery();
  const [addService, {data: data, error: isError, isLoading: AddLoading}] =
    useAddServiceMutation();

  const {t} = useTranslation();
  // const data = [
  //   'Hair Dresser',
  //   'Barber',
  //   'Fitness Coach',
  //   'Nail Technician',
  //   'Combat Trainer',
  //   'Yoga Teacher',
  //   'Consultant',
  //   'Private Tutor',
  //   'Other',
  // ];
  const handleColor = item => {
    setSelectedItem(item);
  };

  const handleNavigation = () => {
    if (selectedItem) {
      const body = {
        user_id: uid,
        service_id: selectedItem?.id,
      };

      addService(body).then(res => {
        if (res?.data?.status === true) {
          navigation.navigate('Appoinment', {
            name: selectedItem?.name,
            id: selectedItem?.id,
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
      {/* <AlertModal
        heading={t('Alert!')}
        btntxt2={t('OK')}
        onPress={() => {
          setModalVisible(false);
        }}
        // btntxt1={'No'}
        message={t('Please  Select  one   service')}
        modalVisible={modalVisible}
        onPress={() => {
          setModalVisible(false);
        }}
        setModalVisible={setModalVisible}
      /> */}
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
      {/* <AlertModal
        heading={t('Alert!')}
        btntxt2={t('OK')}
        onPress={() => {
          setAlertVisible(false);
        }}
        // btntxt1={'No'}
        message={isError?.data?.message}
        modalVisible={alertVisible}
        onPress={() => {
          setAlertVisible(false);
        }}
        setModalVisible={setModalVisible}
      /> */}
      {isLoading ? (
        <ActivityIndicator size={'small'} color="black" />
      ) : (
        <>
          <View h={'85%'}>
            {/* <ScrollView mb={5} showsVerticalScrollIndicator={false}> */}
            <FlatList
              showsVerticalScrollIndicator={false}
              data={isData?.data}
              renderItem={({item, index}) => {
                return (
                  <Pressable onPress={() => handleColor(item)}>
                    <View
                      my={1.5}
                      opacity={1}
                      p={3}
                      bg={
                        item?.id === selectedItem?.id
                          ? 'rgba(108,48,156 , 0.11)'
                          : null
                      }
                      w={'100%'}
                      alignItems={'center'}
                      borderColor={
                        item?.id === selectedItem?.id
                          ? 'primary.50'
                          : 'grey.400'
                      }
                      borderWidth={1}
                      rounded={'full'}>
                      <Text
                        color={
                          item?.id === selectedItem?.id
                            ? 'primary.50'
                            : 'grey.400'
                        }
                        fontFamily={
                          item?.id === selectedItem?.id
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
            {/* {isData?.data?.map((item, index) => {
           
          })}
        </ScrollView> */}
          </View>
          <View mb={5} mt={2}>
            <JdButton
              title={'Continue'}
              loading={AddLoading}
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

export default ServicesComponent;

const styles = StyleSheet.create({});
