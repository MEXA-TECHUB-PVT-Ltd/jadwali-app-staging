import { View, Text, Row, VStack, Pressable } from 'native-base';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';

const LanguageMenu = props => {
  const [visible, setVisible] = React.useState(false);
  const [select, setSelect] = React.useState(1);

  const hideMenu = id => {
    if (id === 1) {
      setSelect(1);
      changeLanguage('en');
      // setVisible(false);
    } else if (id === 2) {
      setSelect(2);
      changeLanguage('ar');
      // setVisible(false);
    } else {
      setVisible(false);
    }
  };
  const [currentLanguage, setLanguage] = React.useState();
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };
  const showMenu = () => setVisible(true);
  const { t } = useTranslation();

  return (
    <View style={{ margin: 10 }}>
      <Menu
        // color={'red'}
        style={{
          
          borderRadius: 10,
          marginTop: 30,

        }}
        visible={visible}
        anchor={
          <Pressable
            style={{
              backgroundColor: '#6C309C', height: 23, width: 23,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}
            onPress={() => {
              showMenu();
            }}>
            <Ionicons
              name={'language'}
              color={'white'}
              size={20}
            />
          </Pressable>
        }
        onRequestClose={() => hideMenu(0)}>
        <MenuItem
          onPress={() => hideMenu(1)}
          textStyle={{
            color: select === 1 ? '#6C309C' : '#979797',
            // width: '10%',
            fontFamily: select === 1 ? 'NotoSans-Medium' : 'NotoSans-Regular',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 14,
          }}>
          {t('English')}
        </MenuItem>
        <MenuDivider color="#979797" />
        <MenuItem
          onPress={() => hideMenu(2)}
          textStyle={{
            color: select === 2 ? '#6C309C' : '#979797',
            alignSelf: 'center',

            fontFamily: select === 2 ? 'NotoSans-Medium' : 'NotoSans-Regular',
          }}>
          {t('Arabic')}
        </MenuItem>
      </Menu>
    </View>
  );
};

export default LanguageMenu;

const styles = StyleSheet.create({});
