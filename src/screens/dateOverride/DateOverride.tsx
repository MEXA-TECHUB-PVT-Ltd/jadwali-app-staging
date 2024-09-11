import {FlatList, Row, ScrollView, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import CalenderComp from '../../components/calendarComp/CalendaerComp';
import JdButton from '../../components/button/Buttons';
import DateOverrideComp from '../../components/DateOverrideComp/DateOverrideComp';
import DatePick from '../../components/DatePick/DatePick';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
import {useGetUserAvailabilityQuery} from '../../redux/event/event';
import {useSelector} from 'react-redux';
import ActiveHours from '../../components/Availabiltymodule/ActiveHours';
import LoaderModal from '../../components/Loader/Loader';
const DateOverride = ({navigation}) => {
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const bottomSheetRef = React.createRef();
  const uid = useSelector(state => state.auth.userData?.id);
  const {
    data: availabilityData,
    error: AvailabilityError,
    isLoading: AvailabilityLoading,
  } = useGetUserAvailabilityQuery(uid);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    closeBottomSheet();
  };

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    setModalVisible(false);
  };

  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <View bg={'white'} flex={1}>
      <Text
        fontSize={22}
        mt={5}
        fontFamily={'NotoSans-SemiBold'}
        textAlign={'center'}>
        {t('Adjust Availability')}
      </Text>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        mx={4}
        showsVerticalScrollIndicator={false}
        mt={7}
        flex={1}>
        {AvailabilityLoading ? (
          <LoaderModal visible={AvailabilityLoading} />
        ) : (
          <>
            <Text
              m={2}
              fontSize={16}
              fontFamily={'NotoSans-Medium'}
              color={'grey.400'}>
              All Availabilities Display here Select and edit your
              Availabilities
            </Text>
            <FlatList
              data={availabilityData?.result}
              keyExtractor={item => item?.id}
              renderItem={({item, index}) => {
                return (
                  <View my={5}>
                    <Text fontSize={16} fontFamily={'NotoSans-Bold'}>
                      {t('Availability')}: {index + 1}
                    </Text>
                    <ActiveHours
                      fromSchedule={true}
                      handleAlert={() => {
                        navigation.navigate('CustomHours', {
                          fromDateOverride: true,
                          availability: item,
                        });
                      }}
                      userDeafult={item?.days}
                    />
                  </View>
                );
              }}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default DateOverride;

const styles = StyleSheet.create({});
