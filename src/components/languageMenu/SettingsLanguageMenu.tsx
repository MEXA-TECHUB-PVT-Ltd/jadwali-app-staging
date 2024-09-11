import { View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';

const SettingsLanguageMenu = ({ isVisible, onClose }) => {
    const [select, setSelect] = React.useState(1);

    const hideMenu = id => {
        if (id === 1) {
            setSelect(1);
            changeLanguage('en');
        } else if (id === 2) {
            setSelect(2);
            changeLanguage('ar');
        }
        onClose(); // Call onClose to hide the menu after selection
    };

    const [currentLanguage, setLanguage] = React.useState();
    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };

    const { t } = useTranslation();

    return (
        <View>
            <Menu
                style={{
                    borderRadius: 10,
                    marginTop: 30,
                }}
                visible={isVisible}
                onRequestClose={onClose}
            >
                <MenuItem
                    onPress={() => hideMenu(1)}
                    textStyle={{
                        color: select === 1 ? '#6C309C' : '#979797',
                        fontFamily: select === 1 ? 'NotoSans-Medium' : 'NotoSans-Regular',
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontSize: 14,
                    }}
                >
                    {t('English')}
                </MenuItem>
                <MenuDivider color="#979797" />
                <MenuItem
                    onPress={() => hideMenu(2)}
                    textStyle={{
                        color: select === 2 ? '#6C309C' : '#979797',
                        alignSelf: 'center',
                        fontFamily: select === 2 ? 'NotoSans-Medium' : 'NotoSans-Regular',
                    }}
                >
                    {t('Arabic')}
                </MenuItem>
            </Menu>
        </View>
    );
};

export default SettingsLanguageMenu;

const styles = StyleSheet.create({});