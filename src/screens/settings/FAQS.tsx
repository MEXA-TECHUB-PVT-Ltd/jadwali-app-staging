import {StyleSheet} from 'react-native';
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
  Switch,
} from 'native-base';

import React from 'react';
import Header from '../../components/Header/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
import {useGetAllFaqsQuery} from '../../redux/faqs/faqApi';

const FAQS = ({navigation}) => {
  const data = [
    {
      id: 1,
      que: 'What is the purpose of this appointment scheduling app?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
    {
      id: 2,
      que: 'How do I schedule an appointment using the app?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
    {
      id: 3,
      que: 'Can I cancel or reschedule an appointment?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
    {
      id: 4,
      que: 'Is my personal information secure on this app?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
    {
      id: 5,
      que: 'What if I encounter technical issues with the app?',
      ans: 'This app is designed to help users easily book and manage appointments with Professional Doctors or service providers.',
    },
  ];
  const [selected, setSelected] = React.useState();
  const handleSelection = id => {
    if (selected === id) {
      setSelected();
    }
  };
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  const {data: questions, isLoading, isError} = useGetAllFaqsQuery();

  return (
    <View bg={'white'} flex={1}>
      <Header title={'FAQs'} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View m={5} mx={4}>
          {questions?.result?.map(item => {
            return (
              <Pressable
                borderRadius={10}
                key={item?.id}
                onPress={() => {
                  setSelected(item?.id);
                  handleSelection(item?.id);
                }}
                bg={item?.id === selected ? '#F4E9FD' : null}
                p={2}>
                <Row
                  // mx={2}
                  flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}>
                  <Text
                    fontSize={item?.id === selected ? 14 : 16}
                    fontFamily={'NotoSans-Medium'}
                    w={'90%'}
                    color={item?.id === selected ? 'primary.50' : 'black'}>
                    {t(item?.question)}
                  </Text>
                  <AntDesign
                    name={item?.id === selected ? 'up' : 'down'}
                    color={'black'}
                    size={15}
                  />
                </Row>
                {item?.id === selected ? (
                  <Text
                    fontSize={12}
                    fontFamily={'NotoSans-Regular'}
                    ml={currentLanguage === 'ar' ? 2 : 0}
                    mr={currentLanguage === 'en' ? 2 : 0}
                    mt={2}>
                    {t(item?.answer)}
                  </Text>
                ) : null}

                <Divider
                  my={currentLanguage === 'ar' ? 4 : 2}
                  bg={
                    item?.id === selected || item?.id === 5
                      ? 'transparent'
                      : null
                  }
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default FAQS;

const styles = StyleSheet.create({});
