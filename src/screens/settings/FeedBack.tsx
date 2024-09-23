import {StyleSheet} from 'react-native';
import {View, Text, ScrollView, TextArea} from 'native-base';

import React from 'react';
import Header from '../../components/Header/Header';
import Logo from '../../components/logo/Logo';
import JdButton from '../../components/button/Buttons';
import {Rating} from 'react-native-ratings';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
import {usePostFeedBackMutation} from '../../redux/feedaback/feedbackApi';
import {useSelector} from 'react-redux';
const FeedBack = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const uid = useSelector(state => state?.auth?.userData?.id);
  const [value, setValue] = React.useState<string>();

  const [createFeedback, {isLoading}] = usePostFeedBackMutation();
  const [star, setStar] = React.useState(0);
  const handleVisibility = () => {
    setVisible(false);
    navigation.goBack();
  };
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      bg={'white'}
      flex={1}
      showsVerticalScrollIndicator={false}>
      <Header title={'Feedback'} />
      <CustomSnackbar
        message={'Success'}
        visible={visible}
        onDismiss={() => {
          handleVisibility();
        }}
        messageDescription={'Feedback submitted successfully'}
      />
      <View mx={5} flex={1} alignItems={'center'} mt={20} mb={10}>
        <Logo height={'30%'} width={'25%'} resizeMode={'contain'} />
        <Text fontSize={18} mt={10} fontFamily={'NotoSans-SemiBold'}>
          {t('How was your experience using')}
        </Text>
        <Text
          fontSize={18}
          color={'primary.50'}
          mt={1}
          fontFamily={'NotoSans-Bold'}>
          {t('Jadwali')}
          {currentLanguage === 'ar' ? '؟' : '?'}
        </Text>
        <Rating
          type="custom"
          // showRating
          onFinishRating={e => {
            setStar(e);
          }}
          //   ratingColor="#3498db"

          ratingBackgroundColor="#DBDBDB"
          imageSize={30}
          style={{paddingVertical: 5, borderWidth: 0}}
        />
        <TextArea
          mt={10}
          value={value}
          onChangeText={(txt: string) => {
            setValue(txt);
          }}
          placeholder={t('wanna say something?')}
          h={32}
          borderRadius={10}
          bg={'secondary'}
          borderWidth={0}
        />
      </View>

      <View mt={'40%'} mb={'2%'} mx={5}>
        <JdButton
          title={'Submit'}
          loading={isLoading}
          onPress={() => {
            if (value) {
              try {
                createFeedback({
                  user_id: uid,
                  comment: value,
                  rating: star,
                });
                setVisible(true);
              } catch (err) {
                console.log(err);
              }
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default FeedBack;

const styles = StyleSheet.create({});
