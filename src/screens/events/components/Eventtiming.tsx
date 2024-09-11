import {StyleSheet} from 'react-native';
import {Pressable, Row, Input, Icon, Text, View} from 'native-base';
import {Picker, DatePicker} from 'react-native-wheel-pick';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomSheet from '../../../components/bottomSheet/BottomSheet';
import JdButton from '../../../components/button/Buttons';
import {useTranslation} from 'react-i18next';
import i18n from '../../../translations/i18n';
import {useDispatch} from 'react-redux';
import {
  setAfterMeeting,
  setBeforeMeeting,
  setBookingLead,
} from '../../../redux/fatures/addEvent';
import {usePostDateRangeMutation} from '../../../redux/event/event';

const Eventtiming = props => {
  const [postDate, {isLoading}] = usePostDateRangeMutation();

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  const [selected, setSelected] = React.useState(1);
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
    }
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    setModalVisible(false);
  };
  const handleSelection = id => {
    setSelected(id);
  };
  const navigation = useNavigation();

  const [pressed, setPressed] = React.useState(1);

  const [startTimeHour, setStartTimeHour] = React.useState('1');
  const [startTimeMin, setStartTimeMin] = React.useState('00');
  const [startTimeAm, setStartTimeAm] = React.useState('Am');
  const [endTimeHour, setEndTimeHour] = React.useState('1');
  const [endTimeMin, setEndTimeMin] = React.useState('00');
  const [endTimeAm, setEndTimeAm] = React.useState('Pm');

  const startTimePM = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '00',
  ];
  const timeMinutes = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
  ];

  return (
    <View alignSelf={'center'} w={'90%'}>
      {props?.event?.map(item => {
        return (
          <>
            <Pressable
              mt={5}
              onPress={() => {
                handleSelection(item?.id);
                openBottomSheet();
              }}>
              <View>
                {item?.name === 'book' ? null : (
                  <Row
                    alignItems={'center'}
                    flexDir={
                      props?.translation === 'ar' ? 'row-reverse' : null
                    }>
                    <View
                      bg={selected === item?.id ? 'primary.50' : 'secondary'}
                      h={3}
                      w={3}
                      rounded={'full'}
                    />

                    <Text mx={5} fontSize={16} fontFamily={'NotoSans-Medium'}>
                      {t(item?.name)}
                    </Text>
                  </Row>
                )}
              </View>
              <>
                {item?.name === 'book' ? (
                  <Input
                    alignSelf="center"
                    // w={'90%'}
                    mt={5}
                    p={3}
                    placeholder="Working hours"
                    // {item?.name==='book'}
                    value={`${startTimeHour} ${t('hour')}`}
                    rounded={'full'}
                    // borderRadius={10}
                    bg={'secondary'}
                    // _text={{color: 'grey.400'}}
                    color={'grey.400'}
                    isReadOnly={true}
                    borderWidth={0}
                    InputRightElement={
                      props?.translation === 'en' ? (
                        <Icon
                          as={<AntDesign name={'down'} />}
                          size={4}
                          mr="5"
                          color="#6C309C"
                        />
                      ) : null
                    }
                    InputLeftElement={
                      props?.translation === 'ar' ? (
                        <Icon
                          as={<AntDesign name={'down'} />}
                          size={4}
                          ml="5"
                          color="#6C309C"
                        />
                      ) : null
                    }
                    // placeholderTextColor={'black'}
                    // label={'Location'}
                    fontFamily={'NotoSans-Regular'}
                    fontSize={14}
                    // rightIcon={''}
                  />
                ) : (
                  <Input
                    alignSelf="center"
                    w={'80%'}
                    mt={5}
                    p={3}
                    placeholder="Working hours"
                    // {item?.name==='book'}
                    value={
                      item?.id === 1
                        ? `${startTimeMin} ${t('min')}`
                        : `${endTimeMin} ${t('min')}`
                    }
                    // rounded={''}/
                    borderRadius={10}
                    bg={'secondary'}
                    // _text={{color: 'grey.400'}}
                    color={'grey.400'}
                    isReadOnly={true}
                    borderWidth={0}
                    InputRightElement={
                      props?.translation === 'en' ? (
                        <Icon
                          as={<AntDesign name={'down'} />}
                          size={4}
                          mr="2"
                          color="#EA4335"
                        />
                      ) : null
                    }
                    InputLeftElement={
                      props?.translation === 'ar' ? (
                        <Icon
                          as={<AntDesign name={'down'} />}
                          size={4}
                          ml="2"
                          color="#EA4335"
                        />
                      ) : null
                    }
                    // InputRightElement={
                    //   <Icon
                    //     as={<AntDesign name={'down'} />}
                    //     size={4}
                    //     mr="2"
                    //     color={'#EA4335'}
                    //   />
                    // }
                    // placeholderTextColor={'black'}
                    // label={'Location'}
                    fontFamily={'NotoSans-Regular'}
                    fontSize={14}
                    // rightIcon={''}
                  />
                )}
              </>
            </Pressable>
            <BottomSheet
              defaultOff={true}
              height={'45%'}
              width={'100%'}
              openBottom={bottomSheetRef}>
              <View style={styles.sheetContainer}>
                {/* <Text style={[styles.txtNotification, {marginLeft: 3}]}>Heelo</Text> */}
                {item?.name === 'book' ? (
                  <Text fontSize={20} fontFamily={'NotoSans-SemiBold'}>
                    {t('Booking Lead Time')}
                  </Text>
                ) : (
                  <Text fontSize={20} fontFamily={'NotoSans-SemiBold'}>
                    {selected === 1
                      ? t('Before Event Time')
                      : t('After Event Time')}
                  </Text>
                )}

                <View style={styles.pickerContainer}>
                  {item?.name === 'book' ? (
                    <>
                      <Picker
                        style={styles.pickerStyle}
                        textSize={20}
                        selectTextColor={'black'}
                        // isShowSelectBackground={true}
                        selectLineColor="black"
                        selectLineSize={0}
                        //pickerData={time === 'PM' ? startTimePM : startTimeAM}
                        pickerData={startTimePM}
                        onValueChange={value => {
                          if (selected === 1) {
                            setStartTimeHour(value);
                          } else {
                            setEndTimeHour(value);
                          }
                        }}
                      />
                      <Text color={'grey.400'} position={'absolute'} right={20}>
                        {t('hour')}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Picker
                        style={styles.pickerStyle}
                        textSize={22}
                        selectTextColor={'black'}
                        selectLineSize={0}
                        isShowSelectBackground={true}
                        selectLineColor="black"
                        pickerData={timeMinutes}
                        onValueChange={value => {
                          if (selected === 1) {
                            setStartTimeMin(value);
                          } else {
                            setEndTimeMin(value);
                          }
                        }}
                      />
                      <Text color={'grey.400'} position={'absolute'} right={20}>
                        {t('min')}
                      </Text>
                    </>
                  )}
                </View>
                <View>
                  <View style={styles.saveBtn}>
                    <JdButton
                      loading={isLoading}
                      onPress={async () => {
                        closeBottomSheet();
                        if (selected === 1) {
                          await dispatch(setBeforeMeeting(startTimeMin));
                        }
                        if (selected === 2) {
                          await dispatch(setAfterMeeting(endTimeMin));
                        } else {
                          await dispatch(setBookingLead(startTimeHour));
                        }
                      }}
                      title="Save Time"
                    />
                  </View>
                  <Pressable style={styles.cancelBtn}>
                    <Text
                      style={styles.cancelText}
                      onPress={() => {
                        closeBottomSheet();
                      }}>
                      {t('Cancel')}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </BottomSheet>
          </>
        );
      })}
    </View>
  );
};

export default Eventtiming;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  horizontalLine: {
    marginHorizontal: 10,
    borderBottomWidth: 5,
    marginTop: 3,
  },
  timeAndEdit: {
    flexDirection: 'row',
  },
  imgPen: {
    marginLeft: 5,
  },
  notifications: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginTop: 5,
  },
  txtTime: {
    fontSize: 3,
  },
  txtNotification: {
    backgroundColor: '#F2F2F2',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  pickerStyle: {
    width: 500,
    backgroundColor: 'white',
    height: 170,
  },
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtn: {marginBottom: 10, marginTop: 10},
  cancelText: {textAlign: 'center', color: '#6C309C'},
  saveBtn: {width: '80%', alignSelf: 'center'},
  sheetContainer: {justifyContent: 'space-around', flex: 1},
});
