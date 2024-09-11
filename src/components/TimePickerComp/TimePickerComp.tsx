import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomSheet from '../bottomSheet/BottomSheet';
import Modal from 'react-native-modal';

const TimePickerComp = props => {
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

  return (
    <View style={styles.container}>
      <Pressable onPress={openBottomSheet}>
        <Text>Unavailable</Text>
      </Pressable>
      <BottomSheet defaultOff={true} height={'50%'} openBottom={bottomSheetRef}>
        <View style={styles.bottomSheetContent}>
          <Modal isVisible={modalVisible} onBackdropPress={closeBottomSheet}>
            <View style={styles.modalContent}>
              {show === true && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'time'}
                  display="spinner"
                  is24Hour={false}
                  onChange={onChange}
                />
              )}
            </View>
          </Modal>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheetContent: {
    flex: 1,
    // justifyContent: 'flex-end',
    // margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default TimePickerComp;
