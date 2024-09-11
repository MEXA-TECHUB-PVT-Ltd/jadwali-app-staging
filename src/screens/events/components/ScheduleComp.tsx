import {StyleSheet} from 'react-native';
import {
  Divider,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {setDefaultAvailability} from '../../../redux/fatures/addEvent';

const ScheduleComp = props => {
  const [selected, setSelected] = React.useState(1);
  const dispatch = useDispatch();
  React.useEffect(() => {
    props?.onPress && props?.onPress(selected);
  }, [selected]);
  const handleSelection = async id => {
    setSelected(id?.id);
    await dispatch(setDefaultAvailability(id?.name));
    if (id?.id === 2) {
      props?.onPress && props?.onPress(id?.id);
      navigation.navigate('CustomHours', {
        eventId: props?.eid,
        fromEdit: props?.fromEdit,
      });
    } else {
      props?.onPress && props?.onPress(id?.id);
    }
  };
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View ml={1} alignSelf={'center'} w={'75%'}>
      {props?.event?.map(item => {
        return (
          <Pressable onPress={() => handleSelection(item)} key={item?.id}>
            {/* <View mt={2} p={2}> */}

            {/* <Row alignItems={'center'}> */}
            <View
              mt={5}
              h={'12'}
              alignItems={'center'}
              justifyContent={'center'}
              //   w={'100%'}
              bg={selected === item?.id ? 'loc' : 'secondary'}
              borderColor={selected === item?.id ? 'primary.50' : 'transparent'}
              borderWidth={1}
              borderRadius={10}>
              <Text
                // ml={5}
                fontSize={15}
                fontFamily={'NotoSans-Regular'}
                color={'grey.400'}>
                {t(item?.name)}
              </Text>
            </View>
            {/* </Row> */}
            {/* // </View> */}
          </Pressable>
        );
      })}
    </View>
  );
};

export default ScheduleComp;

const styles = StyleSheet.create({});
