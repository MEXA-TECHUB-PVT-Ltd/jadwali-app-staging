import React, {useState, useMemo} from 'react';
// import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
// import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomSheet from '../bottomSheet/BottomSheet';
import Modal from 'react-native-modal';
import {Picker, DatePicker} from 'react-native-wheel-pick';
import JdButton from '../button/Buttons';
import {Button} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';

function CalenderComp(props) {
  const initDate = new Date();
  const [markedDates, setMarkedDates] = useState([]);
  React.useEffect(() => {
    // Assume you have fetched data from an API that provides dates to highlight
    if (props?.fromSchedule === true&&props?.markedDate?.length>0) {
      const markedDatesObj = {};
      props?.markedDate?.forEach(item => {
        const splited = item?.scheduling_time?.split('T');
        const simpleDate = splited[0];
        // const date = new Date(item?.event?.date_range?.start_date);
        // const day = String(date.getDate()).padStart(2, '0');
        // const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        // const year = String(date.getFullYear()).slice(-2);
        // // console.log('simpleDate: ',simpleDate);
        // const formattedDate = `${simpleDate[0]}-${simpleDate[2]}-${simpleDate[1]}`;

        markedDatesObj[simpleDate] = {
          selected: true,
          marked: true,
          selectedColor: '#6C309C',
          selectedTextColor: 'white',

          // You can set additional properties like selectedColor, etc., as needed
        };
      });
      
      setMarkedDates( markedDatesObj);
    }
  }, [props?.fromSchedule,props?.markedDate]);
  const [selected, setSelected] = useState('2023-12-28');
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: '#6C309C',
        selectedTextColor: 'white',
      },
    }),
    [selected],
  );

  const {t} = useTranslation();
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

  const [startTimeHour, setStartTimeHour] = React.useState('9');
  const [startTimeMin, setStartTimeMin] = React.useState('00');
  const [startTimeAm, setStartTimeAm] = React.useState('Am');
  const [endTimeHour, setEndTimeHour] = React.useState('5');
  const [endTimeMin, setEndTimeMin] = React.useState('00');
  const [endTimeAm, setEndTimeAm] = React.useState('Pm');

  return (
    <>
      <Calendar
        style={{borderRadius: 10, backgroundColor: '#F4F4F4'}}
        theme={{
          calendarBackground: '#F4F4F4',
          dayTextColor: '#7C86A2',
          textDisabledColor: '#E1E4E7',
          monthTextColor: '#6C309C',
          arrowColor: '#6C309C',
          selectedDayBackgroundColor: 'green', // Change this color as desired
          selectedDayTextColor: '#ffffff',
        }}
        initialDate={initDate}
        markedDates={props?.fromSchedule===true?markedDates:marked}
        onDayPress={day => {
          if (props?.fromOverride === true) {
            openBottomSheet();
            setSelected(day.dateString);
            props.onDaySelect && props.onDaySelect(day);
          } else {
            setSelected(day.dateString);
            props.onDaySelect && props.onDaySelect(day);
          }
        }}
        {...props}
      />
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
              }}
            />
            <Text style={styles.txtNotification}>:</Text>
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
              }}
            />
          </View>
          <View>
            <View style={{width: '80%', alignSelf: 'center'}}>
              <JdButton
                onPress={() => {
                  // if (props?.editAvailability === true) {
                  //   let fromEvent = true;

                  //   navigation.navigate('CustomHours', fromEvent);
                  // }
                  closeBottomSheet();
                }}
                title="Save Time"
              />
            </View>
            <Pressable style={{marginBottom: 10, marginTop: 10}}>
              <Text
                style={{textAlign: 'center', color: '#6C309C'}}
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
}
export default CalenderComp;
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
