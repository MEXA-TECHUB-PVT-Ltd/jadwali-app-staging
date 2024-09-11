import { Alert, StyleSheet } from 'react-native';
import { Pressable, Text, View } from 'native-base';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Header = props => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <View
      mt={6}
      ml={3}
      mb={5}
      flexDir={currentLanguage === 'en' ? 'row' : 'row-reverse'}
      alignItems={'center'}
      justifyContent={props?.load ? null : 'space-between'}>
      <Pressable onPress={() => navigation.goBack()}>
        <Entypo
          name={currentLanguage === 'en' ? 'chevron-left' : 'chevron-right'}
          size={30}
          color={'#3D3D3D'}
        />
      </Pressable>

      {props?.load ? (
        <View style={styles.container}>
          <View style={[styles.progressBar, { width: `${props?.load}%` }]} />
        </View>
      ) : (
        <>
          <Text fontSize={22} fontFamily={'NotoSans-SemiBold'}>
            {t(props?.title)}
          </Text>
          <Entypo name="chevron-left" size={30} color={'transparent'} />
         {props.icondelete && <AntDesign onPress={()=>props.onPress()} name={"delete"} size={22} style={{right:20}} color={"red"}/>} 

        </>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    // marginTop: 20,

    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#E1E1E1',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#6C309C', // Green color
  },
  progressText: {
    textAlign: 'center',
    marginTop: 5,
  },
});
