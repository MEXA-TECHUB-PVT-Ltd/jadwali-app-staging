import {View, Text, Row, VStack, Pressable, Divider} from 'native-base';
import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import i18n from '../../translations/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import BottomSheet from '../bottomSheet/BottomSheet';
import {useTranslation} from 'react-i18next';

const LanguageSelection = props => {
  const {t} = useTranslation();

  const [currentLanguage, setLanguage] = useState('en');
  // console.log(i18n.language);
  const changeLanguage = value => {
    // console.log('changeLanguage', value);
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };
  const [visible, setVisible] = React.useState(false);
  const [select, setSelect] = React.useState(1);

  const hideMenu = id => {
    if (id === 1) {
      setSelect(1);
      setVisible(false);
    } else if (id === 2) {
      setSelect(2);
      setVisible(false);
    } else {
      setVisible(false);
    }
  };
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = React.createRef();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    closeBottomSheet();
  };

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
      setVisible(true);
    }
    // setModalVisible(true);
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      setModalVisible(false);
    }
  };
  const showMenu = () => setVisible(true);
  React.useEffect(() => {
    if (visible == true) {
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  });

  return (
    <View
      p={3}
      borderColor={'primary.50'}
      borderWidth={1}
      rounded={'full'}
      // alignSelf={'center'}
      alignContent={'center'}
      alignItems={'center'}>
      <Pressable
        onPress={() => {
          openBottomSheet();
        }}>
        {i18n.language === 'ar' ? (
          <Row
            alignItems={'center'}
            // flexDir={i18n.language === 'ar' ? 'row-reverse' : null}
            justifyContent={'center'}>
            <Ionicons
              name={visible === true ? 'chevron-up' : 'chevron-down'}
              size={15}
              color={'#6C309C'}
            />

            <Text
              // onPress={showMenu}
              fontSize={16}
              fontFamily={'NotoSans-Medium'}
              color={'primary.50'}
              mx={2}>
              {t('Change Language')}
            </Text>
            <Ionicons
              name={'language'}
              color={'white'}
              size={20}
              style={{backgroundColor: '#6C309C', borderRadius: 5}}
            />
          </Row>
        ) : (
          <Row
            alignItems={'center'}
            // flexDir={currentLanguage === 'ar' ? 'row-reverse' : null}
            justifyContent={'center'}>
            <Ionicons
              name={'language'}
              color={'white'}
              size={20}
              style={{backgroundColor: '#6C309C', borderRadius: 5}}
            />
            <Text
              // onPress={showMenu}
              fontSize={16}
              fontFamily={'NotoSans-Medium'}
              color={'primary.50'}
              mx={2}>
              {t('Change Language')}
            </Text>

            <Ionicons
              name={visible === true ? 'chevron-up' : 'chevron-down'}
              size={15}
              color={'#6C309C'}
            />
          </Row>
        )}
      </Pressable>

      <BottomSheet
        defaultOff={true}
        width={'80%'}
        height={'14%'}
        openBottom={bottomSheetRef}>
        <View mt={5}>
          <Pressable
            onPress={() => {
              changeLanguage('en');
              hideMenu(1);
            }}>
            <Text
              textAlign={'center'}
              fontSize={16}
              fontFamily={select == 1 ? 'NotoSans-Bold' : 'NotoSans-SemiBold'}
              color={select == 1 ? 'primary.50' : 'grey.400'}>
              {t('English')}
            </Text>
          </Pressable>
          <Divider my={2} />
          <Pressable
            onPress={() => {
              changeLanguage('ar');
              hideMenu(2);
            }}>
            <Text
              textAlign={'center'}
              fontSize={16}
              fontFamily={select == 2 ? 'NotoSans-Bold' : 'NotoSans-SemiBold'}
              color={select == 2 ? 'primary.50' : 'grey.400'}>
              {t('Arabic')}
            </Text>
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  );
};

export default LanguageSelection;

const styles = StyleSheet.create({});
