import {ActivityIndicator, StyleSheet} from 'react-native';
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
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Header from '../../components/Header/Header';
import JdInputs from '../../components/inputs/inputs';
import {Formik} from 'formik';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import JdButton from '../../components/button/Buttons';
import * as Yup from 'yup';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import SettingsMenu from './components/SettingsMenu';
import AlertModal from '../../components/Modal/AlertModal';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
import {useSelector} from 'react-redux';
import {useGetUserByIdQuery} from '../../redux/auth/auth';
import {API_URL} from '../../constants/api';
import LoaderModal from '../../components/Loader/Loader';
import {useFocusEffect} from '@react-navigation/native';
import {PicPlaceholder} from '../../components/avatar/PicPlaceholder';
import { useGetSubscriptionPlansQuery } from '../../redux/subscription/subscriptionApi';

const Settings = ({navigation}) => {
  const refRBSheet = React.useRef();
  const userName = useSelector(state => state.auth.userData);
  const [imageUrl, setImageUrl] = React.useState<string>(
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
  );

  // console.log("profileData?.user?.upload_details?.filename",profileData?.user?.upload_details?.filename)
  const {data, isError, error, isLoading:load} = useGetSubscriptionPlansQuery();
  const {
    data: profileData,
    isLoading,
    refetch,
  } = useGetUserByIdQuery(userName?.id);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );
  const menu = [
    {
      id: 1,
      name: 'Account',
      img: require('../../assets/account.png'),
    },

    {
      id: 2,
      name: 'Change Password',
      img: require('../../assets/changePassword.png'),
    },
    {
      id: 8,
      name: 'Change Language',
      // img: require('../../assets/logout.png'),
    },

    {
      id: 3,
      name: 'Bank Details',
      img: require('../../assets/subscription.png'),
    },
    // {
    //   id: 4,
    //   name: 'Manage Subscription',
    //   img: require('../../assets/subscription.png'),
    // },
    {
      id: 5,
      name: 'Faqs',
      img: require('../../assets/faqs.png'),
    },
    {
      id: 6,
      name: 'Feedback',
      img: require('../../assets/feedback.png'),
    },
    {
      id: 9,
      name: 'Delete Account',
      // img: require('../../assets/logout.png'),
    },
    {
      id: 7,
      name: 'Logout',
      img: require('../../assets/logout.png'),
    },
   
    
  ];
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled" bg={'white'} flex={1}>
      {isLoading ? (
        <LoaderModal visible={isLoading} />
      ) : (
        <>
          <View bg={'pro'} h={'40'}>
            {/* <Header title={'Profile'} /> */}
            <Text
              m={5}
              mb={0}
              textAlign={'center'}
              fontSize={22}
              fontFamily={'NotoSans-SemiBold'}>
              {t('Settings')}
            </Text>
          </View>
          <View>
            <Stack position={'absolute'} mt={-50} alignSelf={'center'}>
              {profileData?.user?.upload_details?.filename ? (
                <Avatar
                  h={24}
                  w={24}
                  source={{
                    uri: `${API_URL}public/uploads/${profileData?.user?.upload_details?.filename}`,
                  }}
                />
              ) : (
                <PicPlaceholder height={24} width={24} size={60} />
              )}
            </Stack>
            <Text
              mt={16}
              mb={5}
              textAlign={'center'}
              color={'primary.50'}
              fontSize={18}
              fontFamily={'NotoSans-Bold'}>
              {profileData?.user?.full_name}
            </Text>
            <View mx={5}>
              <SettingsMenu translation={currentLanguage} menu={menu} />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
