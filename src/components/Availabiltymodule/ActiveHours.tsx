import { Alert, Platform, StyleSheet } from 'react-native';
import {
  Modal,
  Pressable,
  Switch,
  Text,
  View,
  FormControl,
  Input,
  Button,
  ScrollView,
  FlatList,
} from 'native-base';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import JdButton from '../button/Buttons';
import DatePick from '../DatePick/DatePick';
import { useNavigation } from '@react-navigation/native';
import { ScreenStackHeaderLeftView } from 'react-native-screens';
import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';
import { setAvailability } from '../../redux/fatures/addEvent';
import { useDispatch, useSelector } from 'react-redux';
import { useAddAvailabilityMutation } from '../../redux/auth/auth';
import AlertSnackBar from '../customSnackBar/AlertSnackBar';
import {
  usePostEventAvailabilityMutation,
  useUpdateAvailabilityMutation,
} from '../../redux/event/event';
import { storeData } from '../../Async/AsyncStorage/AsyncStorage';
import { setPassword } from '../../redux/fatures/auth';

const ActiveHours = props => {
  const [date, setDate] = useState('9:00');
  const dispatch = useDispatch();
  const uid = useSelector(state => state?.auth?.userData?.id);

  const [mode, setMode] = useState('17:00');
  // const [show, setShow] = useState('true');

  const [active, setActive] = React.useState(false);

  const navigation = useNavigation();
  const [post, { data: isData, error: isError, isLoading }] =
    useAddAvailabilityMutation();
  const [createAvailability] = usePostEventAvailabilityMutation();
  const [updateAvailability, { isLoading: updateLoading }] =
    useUpdateAvailabilityMutation();
  // if (Platform.OS === 'android') {
  //   SetOs(true);
  // }

  const [selectedItemArr, setSelectedItemArr] = React.useState([
    {
      day_of_week: 'Sunday',
      time_slot: [],
      is_available: false,
    },
    {
      day_of_week: 'Monday',
      time_slot: [],
      is_available: false,
    },
    {
      day_of_week: 'Tuesday',
      time_slot: [],
      is_available: false,
    },
    {
      day_of_week: 'Wednesday',
      time_slot: [],
      is_available: false,
    },
    {
      day_of_week: 'Thursday',
      time_slot: [],
      is_available: false,
    },

    {
      day_of_week: 'Friday',
      time_slot: [],
      is_available: false,
    },
    {
      day_of_week: 'Saturday',
      time_slot: [],
      is_available: false,
    },
  ]);

  React.useEffect(() => {
    if (props?.fromSchedule) {
      setSelectedItemArr(props?.userDeafult);
    } else if (props?.fromEditCustom && props?.fromEdit) {
      setSelectedItemArr(props?.userDeafult[0].availability);
    } else if (props?.fromDateOverride) {
      setSelectedItemArr(props?.userDeafult?.days);
    } else {
      setSelectedItemArr([
        {
          day_of_week: 'Sunday',
          time_slot: [],
          is_available: false,
        },
        {
          day_of_week: 'Monday',
          time_slot: [],
          is_available: false,
        },
        {
          day_of_week: 'Tuesday',
          time_slot: [],
          is_available: false,
        },
        {
          day_of_week: 'Wednesday',
          time_slot: [],
          is_available: false,
        },
        {
          day_of_week: 'Thursday',
          time_slot: [],
          is_available: false,
        },

        {
          day_of_week: 'Friday',
          time_slot: [],
          is_available: false,
        },
        {
          day_of_week: 'Saturday',
          time_slot: [],
          is_available: false,
        },
      ]);
    }
  }, [
    props?.fromDateOverride,
    props?.fromEdit,
    props?.fromEditCustom,
    props?.fromSchedule,
    props?.userDeafult,
  ]);
  // const navigation = useNavigation();

  const isItemSelected = item => {
    return selectedItemArr.includes(item);
  };

  const [currentLanguage, setLanguage] = React.useState();
  const [indess, setIndes] = React.useState(0);
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  const { t } = useTranslation();
  let timers = '';
  let endTimer = '';
  const handleToggle = React.useCallback(
    (e, index) => {
      const newObj = [...selectedItemArr];
      newObj[index].is_available = !e;
      if (newObj[index].is_available === true) {
        newObj[index]?.time_slot.unshift({
          start_time: date,
          end_time: mode,
        });
      } else {
        newObj[index].time_slot = [];
      }
      // Pushing new data into the 'time_slot' array of the specific item at 'index'

      setSelectedItemArr(newObj);

      setSelectedItemArr(newObj);

      // dispatch(setAvailability(newObj));
    },
    [date, mode],
  );
  const handleColor = React.useCallback(
    (e, index, time) => {
      const newObj = [...selectedItemArr];

      newObj[index].is_available = !e;
      if (newObj[index].is_available === true) {
        newObj[index].time_slot[indess] = {
          start_time: date === undefined ? `9:00` : time,
          end_time: mode === undefined ? `17:00` : mode,
        };
      }

      setSelectedItemArr(newObj);

      // dispatch(setAvailability(newObj));
    },
    [date, mode],
  );
  const handleColors = React.useCallback(
    (e, index, endtime) => {
      const newObj = [...selectedItemArr];

      newObj[index].is_available = !e;
      if (newObj[index].is_available === false) {
        return;
      } else {
        newObj[index].time_slot[indess] = {
          start_time: date === undefined ? `9:00` : date,
          end_time: mode === undefined ? `17:00` : endtime,
        };
      }

      // newObj[index].end_time = mode === undefined ? `17:00` : mode;
      setSelectedItemArr(newObj);
    },
    [date, mode],
  );

  const [modalVisible, setModalVisible] = React.useState(false);
  const handleNavigation = React.useCallback(() => {
    if (props?.editAvailability === true && props?.fromEdit === false) {
      const body = {
        user_id: uid,
        days: selectedItemArr,
      };

      post(body).then(async res => {
        if (res?.data?.status === true) {
          // navigation.navigate('Services');

          await createAvailability({
            event_id: props?.eventId,
            availability_id: res?.data?.result?.availability_profile?.id,
          }).then(Res => {
            if (Res?.data?.status === true) {
              navigation.goBack();
            }
          });
        }
      });
    } else if (props?.fromEdit === true) {
      const body = {
        user_id: uid,
        profile_id: props?.userDeafult[0].id,
        days: selectedItemArr,
      };

      updateAvailability(body).then(async res => {
        if (res?.data?.status === true) {
          navigation.goBack();
        }
      });
    } else if (props?.fromDateOverride === true) {
      const body = {
        user_id: uid,
        profile_id: props?.userDeafult?.id,
        days: selectedItemArr,
      };

      updateAvailability(body).then(async res => {
        if (res?.data?.status === true) {
          navigation.goBack();
        }
      });
    } else {
      const body = {
        user_id: uid,
        days: selectedItemArr,
      };

      post(body).then(async res => {
        if (res?.data?.status === true) {
          // navigation.navigate('Services')
          await storeData('uid', `${uid}`);
          await dispatch(setPassword(uid));
        }
      });
    }
  }, []);

  const handleCamera = async index => {
    const newObj = [...selectedItemArr];
    newObj[index]?.time_slot.unshift({
      start_time: date,
      end_time: mode,
    });
    setSelectedItemArr(newObj);
  };
  console.log("Check Array",selectedItemArr)

  return (
    <>
      {/* <ScrollView showVerticalIndicator={false}> */}
      <View>
        <FlatList
          height={props?.fromSchedule ? null : '75%'}
          data={selectedItemArr}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={e => {
                  if (props?.fromSchedule) {
                    props?.handleAlert && props?.handleAlert();
                  } else {
                    handleToggle(item?.is_available, index);
                  }
                }}>
                <View
                  key={item?.day_of_week}
                  flexDir={'row'}
                  w={'100%'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  my={2}>
                  <View
                    mt={2}
                    w={'50%'}
                    flexDir={'row'}
                    alignItems={'center'}
                    alignSelf={'flex-start'}>
                    <Switch
                      size={Platform.OS == "ios" ? "sm" : 'md'}
                      onToggle={e => {
                        handleToggle(item?.is_available, index);
                      }}
                      disabled={props?.fromSchedule === true ? true : false}
                      isChecked={item?.is_available}
                      onThumbColor={'primary.50'}
                      onTrackColor={'primary.400'}
                    />
                    <Text fontSize={14} fontFamily={'NotoSans-Medium'}>
                      {t(item?.day_of_week)}
                    </Text>
                  </View>
                  <Pressable
                    onPress={e => {
                      if (props?.fromSchedule) {
                        setModalVisible(true);
                        
                      } else {
                        handleColor(false, index, '9:00');
                      }
                    }}
                    w={'50%'}>
                    {props?.fromSchedule === true ? (
                      <>
                        {item?.time_slots?.map((slot, indes) => {
                          return (
                            <View mb={2}>
                              {item?.is_available && (
                                <DatePick
                                  startTime={slot?.start_time}
                                  endTime={slot?.end_time}
                                  plussPress={e => {
                                    handleCamera(indes, index);

                                    // handleCamera();
                                    // setSelectedItemArr(newObj);
                                  }}
                                  fromSchedule={props?.fromSchedule}
                                  savePress={() => {
                                    // handleCamera(indes, index);
                                  }}
                                  length={item.time_slots?.length}
                                  index={indes}
                                  onPress={e => handleColor(false, index)}
                                  color={'black'}
                                  fontSize={12}
                                  isAvailable={item?.is_available}
                                  margin={10}
                                  active={active}
                                  editAvailability={props?.editAvailability}
                                  delPress={() => {
                                    Alert.alert("Delete Press")
                                    const obj = [...selectedItemArr];
                                    obj[index].time_slots.splice(indes);
                                    setSelectedItemArr(obj);
                                    // const newObj=[...selectedItemArr];
                                    // newObj[index].time_slot=
                                  }}
                                  onStartTime={(time, e) => {
                                    if (props?.fromSchedule === true) {
                                      return;
                                    } else {
                                      setDate(time);
                                      timers = time;
                                      setIndes(indes);
                                      handleColor(false, index, time);
                                    }
                                  }}
                                  onEndTime={(endtime, e) => {
                                    if (props?.fromSchedule === true) {
                                      return;
                                    } else {
                                      endTimer = endtime;
                                      setMode(endtime);
                                      setIndes(indes);
                                      handleColors(false, index, endtime);
                                    }
                                  }}
                                />
                              )}
                            </View>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {item?.time_slot?.map((slot, indes) => {
                          return (
                            <View mb={2}>
                              {item?.is_available && (
                                <DatePick
                                  startTime={slot?.start_time}
                                  endTime={slot?.end_time}
                                  fromSchedule={props?.fromSchedule}
                                  plussPress={e => {
                                    handleCamera(index);


                                    // handleCamera();
                                    // setSelectedItemArr(newObj);
                                  }}
                                  savePress={() => {
                                    // handleCamera(indes, index);
                                  }}
                                  length={item.time_slot?.length}
                                  index={indes}
                                  // onPress={e => handleColor(false, index)}
                                  color={'black'}
                                  fontSize={12}
                                  isAvailable={item?.is_available}
                                  margin={10}
                                  active={active}
                                  editAvailability={props?.editAvailability}
                                  delPress={() => {
                                    Alert.alert("Delete Press")
                                    const obj = [...selectedItemArr];
                                    obj[index].time_slot.splice(indes);
                                    setSelectedItemArr(obj);
                                  }}
                                  onStartTime={(time, e) => {
                                    setDate(time);
                                    timers = time;
                                    setIndes(indes);
                                    handleColor(false, index, time);
                                  }}
                                  onEndTime={(endtime, e) => {
                                    // if
                                    endTimer = endtime;
                                    setMode(endtime);
                                    setIndes(indes);
                                    handleColors(false, index, endtime);
                                  }}
                                />
                              )}
                            </View>
                          );
                        })}
                      </>
                    )}
                    {props?.fromEdit ||
                      (props?.fromDateOverride && (
                        <>
                          {item?.time_slots?.map((slot, indes) => {
                            return (
                              <View mb={2}>
                                {item?.is_available && (
                                  <DatePick
                                    fromover={true}
                                    startTime={slot?.start_time}
                                    endTime={slot?.end_time}
                                    plussPress={e => {
                                      handleCamera(indes, index);

                                      // handleCamera();
                                      // setSelectedItemArr(newObj);
                                    }}
                                    savePress={() => {
                                      // handleCamera(indes, index);
                                    }}
                                    length={item.time_slots?.length}
                                    index={indes}
                                    onPress={e => handleColor(false, index)}
                                    color={'black'}
                                    fontSize={12}
                                    isAvailable={item?.is_available}
                                    margin={10}
                                    active={active}
                                    delPress={() => {
                                      const obj = [...selectedItemArr];
                                      obj[index].time_slots.splice(indes);
                                      setSelectedItemArr(obj);
                                      // const newObj=[...selectedItemArr];
                                      // newObj[index].time_slot=
                                    }}
                                    onStartTime={(time, e) => {
                                      setDate(time);
                                      timers = time;
                                      setIndes(indes);
                                      handleColor(false, index, time);
                                    }}
                                    onEndTime={(endtime, e) => {
                                      endTimer = endtime;
                                      setMode(endtime);
                                      setIndes(indes);
                                      handleColors(false, index, endtime);
                                    }}
                                  />
                                )}
                              </View>
                            );
                          })}
                        </>
                      ))}
                  </Pressable>
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        // numColumns={3} // Set the number of columns as needed
        // columnWrapperStyle={styles.columnWrapper}
        />
        {/* {selectedItemArr?.map((item, index) => { */}

        {/* })} */}
      </View>
      {!props?.fromSchedule && (
        <View mt={5} mb={5}>
          <JdButton
            title={'Save'}
            onPress={() => handleNavigation()}
            loading={isLoading ? isLoading : updateLoading}
          />
        </View>
      )}

      <AlertSnackBar
        message={
          isError?.data?.message
            ? isError?.data
            : {
              message: 'Availability Added Successfully! ',
              status: true,
            }
        }
        // status={ale?.status}
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
          if (!isError) {
          }
        }}
      />
      {/* </ScrollView> */}
    </>
  );
};

export default ActiveHours;

const styles = StyleSheet.create({});
