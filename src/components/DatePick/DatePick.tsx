import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomSheet from '../bottomSheet/BottomSheet';
import Modal from 'react-native-modal';
import {Picker, DatePicker} from 'react-native-wheel-pick';
import JdButton from '../button/Buttons';
import {Button, Row} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
const DatePick = props => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = React.createRef();
  // console.log('prop', props?.active);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    closeBottomSheet();
  };

  // console.log('prop', props?.active);
  if (props?.active) {
    openBottomSheet;
  }
  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    } else {
    }
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    setModalVisible(false);
  };
  // const startTimeAM = [
  //   '13',
  //   '14',
  //   '15',
  //   '16',
  //   '17',
  //   '18',
  //   '19',
  //   '20',
  //   '21',
  //   '22',
  //   '23',
  //   '12',
  // ];
  const startTimePM = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
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
    '00',
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
  const [pressed, setPressed] = React.useState(1);

  const [startTimeHour, setStartTimeHour] = React.useState('8');
  const [startTimeMin, setStartTimeMin] = React.useState('00');
  const [startTimeAm, setStartTimeAm] = React.useState('am');
  const [endTimeHour, setEndTimeHour] = React.useState('17');
  const [endTimeMin, setEndTimeMin] = React.useState('00');
  const [endTimeAm, setEndTimeAm] = React.useState('pm');

  const navigation = useNavigation();
  const [currentLanguage, setLanguage] = React.useState();
  const [Item, setItem] = React.useState(false);
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  const {t} = useTranslation();
  React.useEffect(() => {
      props?.onStartTime &&
      props?.onStartTime(`${startTimeHour}:${startTimeMin}`);
      props?.onEndTime && props?.onEndTime(`${endTimeHour}:${endTimeMin}`);
  }, [
    startTimeHour,
    startTimeMin,
    endTimeHour,
    endTimeMin,
    startTimeAm,
    endTimeAm,
    Item,
    pressed,
  ]);
  const handlePress = () => {
    if (props?.isAvailable === true) {
      props?.plussPress && props?.plussPress('ok');
      setPress(true);
    } else return;
  };
  const delPress = () => {
    props?.delPress && props?.delPress('ok');
  };
  const [press, setPress] = React.useState(false);

  return (
    <Row alignItems={'center'}>
      <Pressable
        onPress={() => {
          if (props?.isAvailable === true && !props?.fromSchedule) {
            props?.onPress && props?.onPress();
            setPress(false);
            openBottomSheet();
          } else return;
        }}
        style={{
          backgroundColor: props?.fromDateOverride ? '#6C309C' : '#F7F7F7',
          borderRadius: 20,
          height: 40,

          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {props?.startTime && props?.endTime && props?.fromover === true ? (
          <Text
            style={{
              color: props?.color,
              fontSize: props?.fontSize,
              marginHorizontal: props?.margin,
              fontFamily: 'NotoSans-Regular',
              textAlign: 'center',
            }}>
            {props?.startTime}-{props?.endTime}
          </Text>
        ) : 
        (
          <>
            {props?.startTime &&
            props?.endTime &&
            props?.fromSchedule === true ? (
              <Text
                style={{
                  color: props?.color,
                  fontSize: props?.fontSize,
                  marginHorizontal: props?.margin,
                  fontFamily: 'NotoSans-Regular',
                  textAlign: 'center',
                }}>
                {props?.startTime}-{props?.endTime}
              </Text>
            ) : (
              <Text
                style={{
                  color: props?.color,
                  fontSize: props?.fontSize,
                  marginHorizontal: props?.margin,
                  fontFamily: 'NotoSans-Regular',
                  textAlign: 'center',
                }}>
                {`${startTimeHour}:${startTimeMin} ${t(startTimeAm)}`}-
                {`${endTimeHour}:${endTimeMin} ${t(endTimeAm)}`}
              </Text>
            )}
          </>
        )
        }
      </Pressable>
      <BottomSheet
        defaultOff={true}
        height={'45%'}
        width={'100%'}
        openBottom={bottomSheetRef}>
        <View style={{justifyContent: 'space-around', flex: 1}}>
          {/* <Text style={[styles.txtNotification, {marginLeft: 3}]}>Heelo</Text> */}
          <View
            style={{
              backgroundColor: '#F2F2F2',
              borderRadius: 20,
              width: '90%',
              height: '13%',

              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 5,
              }}>
              <Button
                bg={pressed === 2 ? 'transparent' : 'primary.50'}
                _text={{color: pressed === 2 ? '#979797' : 'white'}}
                rounded={'full'}
                w={'50%'}
                onPress={() => {
                  setPressed(1);
                }}>
                {t('Start Time')}
              </Button>
              <Button
                bg={pressed === 1 ? 'transparent' : 'primary.50'}
                _text={{color: pressed === 1 ? '#979797' : 'white'}}
                rounded={'full'}
                w={'50%'}
                onPress={() => {
                  setPressed(2);
                }}>
                {t('End Time')}
              </Button>
            </View>
          </View>
          <View
            style={{
              // flex: 1,
              // width: '100%',
              // backgroundColor: '#F2F2F2',
              // height: 42,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Picker
              style={{width: 100, backgroundColor: 'white', height: 170}}
              textSize={20}
              selectTextColor={'black'}
              isShowSelectBackground={true}
              selectLineColor="black"
              selectLineSize={0}
              //pickerData={time === 'PM' ? startTimePM : startTimeAM}
              pickerData={startTimePM}
              onValueChange={value => {
                if (pressed === 1) {
                  setStartTimeHour(value);
                } else {
                  setEndTimeHour(value);
                }
                // console.log('value', value);
              }}
            />
            <View style={{height:60,justifyContent:"flex-end"}}>
            <Text style={styles.txtNotification}>:</Text>
            </View>
            <Picker
              style={{width: 100, backgroundColor: 'white', height: 170}}
              textSize={20}
              selectTextColor={'black'}
              selectLineSize={0}
              isShowSelectBackground={true}
              selectLineColor="black"
              pickerData={timeMinutes}
              onValueChange={value => {
                if (pressed === 1) {
                  setStartTimeMin(value);
                } else {
                  setEndTimeMin(value);
                }
                // console.log('value', value);
              }}
            />

            <Picker
              style={{width: 100, backgroundColor: 'white', height: 170}}
              textSize={15}
              selectTextColor={'black'}
              isShowSelectBackground={true}
              selectLineSize={0}
              selectLineColor="black"
              pickerData={[t('AM'), t('PM')]}
              onValueChange={value => {
                if (pressed === 1) {
                  setStartTimeAm(value);
                } else {
                  setEndTimeAm(value);
                }
                // console.log(value);
              }}
            />
          </View>
          <View>
            <View style={{width: '80%', alignSelf: 'center'}}>
              <JdButton
                onPress={() => {
                  // if (props?.editAvailability === true) {
                  //   let fromEvent = true;
                  //   // console.log('pressed');
                  //   navigation.navigate('CustomHours', fromEvent);
                  // }
                  if (press === true) {
                    props?.savePress && props?.savePress();
                  }
                  closeBottomSheet();

                  // setItem(true);
                }}
                title="Save Time"
              />
            </View>
            <Pressable style={{marginBottom: 10, marginTop: 10}}>
              <Text
                style={{textAlign: 'center', color: '#6C309C'}}
                onPress={() => {
                  setStartTimeHour('0');
                  setEndTimeHour('0');
                  setStartTimeAm('Am');
                  setEndTimeAm('Am');
                  setEndTimeMin('00');
                  setStartTimeMin('00');
                  closeBottomSheet();
                }}>
                {t('Cancel')}
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
      {props?.fromDateOverride ? null : (
        <>
          {props?.index === 0 ? (
            <Pressable
              style={{
                padding: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}
              onPress={() => {
                if (!props?.fromSchedule) {
                  handlePress();
                }
              }}>
              <Entypo name={'plus'} color={'#6C309C'} size={20} />
            </Pressable>
          ) : (
            <Pressable
              style={{
                backgroundColor: '#676767',
                padding: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                marginLeft: 5,
              }}
              onPress={() => {
                if (!props?.fromSchedule) {
                  delPress();
                }
              }}>
              <Entypo name={'cross'} color={'white'} size={15} />
            </Pressable>
          )}
        </>
      )}
    </Row>
  );
};
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
});

export default DatePick;
// {
//   props?.index === 0 ? (
//     <Pressable
//       onPress={() => {
//         handlePress();
//       }}>
//       {/* // setActive(true);

//           // if (props?.editAvailability) { */}
//       {/* //   let fromEvent = true;
//           //   // navigation.navigate('CustomHours', fromEvent);
//           // } */}

//       <Entypo name={'plus'} color={'#6C309C'} size={25} />
//     </Pressable>
//   ) : (
//     <Pressable
//       style={{
//         backgroundColor: '#676767',
//         padding: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 20,
//         marginLeft: 5,
//       }}
//       onPress={props?.delPress}>
//       <Entypo name={'cross'} color={'white'} size={15} />
//     </Pressable>
//   );
// }
//  </>
//   ) : (
//     <Pressable
//       onPress={() => {
//         handlePress();
//       }}>
//       {/* // setActive(true);

//   // if (props?.editAvailability) { */}
//       {/* //   let fromEvent = true;
//   //   // navigation.navigate('CustomHours', fromEvent);
//   // } */}

//       <Entypo name={'plus'} color={'#6C309C'} size={25} />
//     </Pressable>
//   )}
// </>
