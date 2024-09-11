import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {View, Text} from 'native-base';

import {Picker, DatePicker} from 'react-native-wheel-pick';
import {useTranslation} from 'react-i18next';

const SpinnerTimer = props => {

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
    '24',
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
  const [pressed, setPressed] = React.useState(props?.spinner);
const [pressed1, setPressed1] = React.useState(props?.spinner);

  const [startTimeHour, setStartTimeHour] = React.useState('1');
  const [startTimeMin, setStartTimeMin] = React.useState('00');
  const [startTimeAm, setStartTimeAm] = React.useState('Am');
  const [endTimeHour, setEndTimeHour] = React.useState('5');
  const [endTimeMin, setEndTimeMin] = React.useState('00');
  const [endTimeAm, setEndTimeAm] = React.useState('Pm');

  const {t} = useTranslation();
  React.useEffect(() => {
    props?.onTimeSelect && props?.onTimeSelect(startTimeHour);
    props?.onMinSelect && props?.onMinSelect(startTimeMin);
  });
  return (
    <>
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
          style={{
            width: 100,
            backgroundColor: 'white',
            height: 170,
          }}
          textSize={20}
          selectTextColor={'black'}
          isShowSelectBackground={true}
          selectLineColor="black"
          selectLineSize={0}
          //pickerData={time === 'PM' ? startTimePM : startTimeAM}
          // pickerData={startTimePM}
             pickerData={pressed1 === 1 ? timeMinutes: startTimePM}

          onValueChange={value => {
            if (props?.fromAddEvent) {
              setStartTimeHour(value);
            } else {
              if (pressed === 1) {
                setStartTimeHour(value);
              } else {
                setEndTimeHour(value);
              }
            }
          }}
        />
        {
            props?.fromAddEvent ? null : (
          <>
            <Picker
              style={{width: 100, backgroundColor: 'white', height: 170}}
              textSize={20}
              selectTextColor={'black'}
              selectLineSize={0}
              isShowSelectBackground={true}
              selectLineColor="black"
                // pickerData={pressed === 1 ? startTimePM || ['00', '01', '02', '03', '04', '05', /* Add your minutes here */] : timeMinutes || ['00', '01', '02', '03', '04', '05', /* Add your minutes here */]}

              // pickerData={timeMinutes}
              onValueChange={value => {
                if (props?.fromAddEvent) {
                  setStartTimeMin(value);
                } else {
                  if (pressed === 1) {
                    setStartTimeMin(value);
                  } else {
                    setEndTimeMin(value);
                  }
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
          </>
        )
        }
      </View>
    </>
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

export default SpinnerTimer;
