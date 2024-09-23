import {Alert, StyleSheet} from 'react-native';
import {Text, View, Pressable, Row, FlatList} from 'native-base';
import React from 'react';
import JdButton from '../button/Buttons';
import {useNavigation} from '@react-navigation/native';
import AlertModal from '../Modal/AlertModal';
import {useTranslation} from 'react-i18next';
import {useAddServiceTypesMutation} from '../../redux/services/services';
import {useSelector, useDispatch} from 'react-redux';
import AlertSnackBar from '../customSnackBar/AlertSnackBar';
import {storeData} from '../../Async/AsyncStorage/AsyncStorage';
import {setPassword} from '../../redux/fatures/auth';

const AppoinmentTypesComp = props => {
  const [selectedItemArr, setSelectedItemArr] = React.useState([]);
  const [postServie, {data: isData, error: isError, isLoading}] =
    useAddServiceTypesMutation();
  const uid = useSelector(state => state?.auth?.userData?.id);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isItemSelected = item => {
    return selectedItemArr?.includes(item);
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
      else if (prevItems?.length < 3) return [...prevItems, item];
    });
  };

  const [extended, setExtened] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const {t} = useTranslation();

  const handleNavigation = () => {
    const body = {
      user_id: uid,
      service_id: props?.id,
      service_type_id: selectedItemArr,
    };

    postServie(body).then(async res => {
      if (res?.data?.status === true) {
        await storeData('uid', `${uid}`);
        await dispatch(setPassword(uid));
      }
    });
  };
  let body = {
    status: false,
    message: extended
      ? t('You can select only upto 3 types')
      : t('Please Select three types'),
  };
  React.useEffect(() => {
    if (isError) setModalVisible(true);
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
      <View></View>
      <View mt={5}>
        <JdButton
          title={'Continue'}
          loading={isLoading}
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

export default AppoinmentTypesComp;

const styles = StyleSheet.create({});
