import {StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {
  Image,
  Input,
  Row,
  ScrollView,
  Text,
  TextArea,
  View,
  Icon,
  Pressable,
  Button,
} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import EventsMap from './components/eventsMap';
import JdInputs from '../../components/inputs/inputs';
import JdButton from '../../components/button/Buttons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import i18n from '../../translations/i18n';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import SpinnerTimer from '../dateOverride/components/SpinnerTimer';
import {useDispatch, useSelector} from 'react-redux';
import {setEventDetail, setUserEventDetail} from '../../redux/fatures/addEvent';
import {
  useAddEventDetaiMutation,
  useGetAllEventDataQuery,
  useGetUserEventsQuery,
  useGetUserOneEventQuery,
  useUpdateEventDetailMutation,
} from '../../redux/event/event';
import AlertSnackBar from '../../components/customSnackBar/AlertSnackBar';
import {Formik} from 'formik';
import {Picker, DatePicker} from 'react-native-wheel-pick';

const AddEvent = ({navigation, route}) => {
  const meetingType = route?.params?.one;
  // console.log("Check Metting Type",meetingType)
  const fromEdit = route?.params?.fromEdit;
  const [min, setMin] = React.useState();
  const id = route?.params?.id;
  const {
    data: AllEventData,
    error: EventDataError,
    isLoading: eventDataloading,
  } = useGetAllEventDataQuery(id);
  const {t} = useTranslation();
  const uid = useSelector(state => state?.auth?.userData?.id);
  const dispatch = useDispatch();
  const maxCount = 250;
  const [characetrLength, setCharacteracetrLength] = React.useState();
  const bottomSheetRef = React.createRef();
  const [currentLanguage, setLanguage] = React.useState();
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [deposit, setDeposit] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [duration1, setDuration1] = React.useState(null); //hour
  const [duration, setDuration] = React.useState(null); //min
const [pressed, setPressed] = React.useState(1);


const startTimePM = [
  '00',
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

  const [postEvent, {data: isData, error: isError, isLoading}] =
    useAddEventDetaiMutation();
  const [
    updateEvent,
    {data: updateData, error: updateError, isLoading: updateLoading},
  ] = useUpdateEventDetailMutation();

  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  React.useEffect(() => {
    if (fromEdit) {
      setDuration(AllEventData?.result?.duration_interval.hours);
      setDuration1(AllEventData?.result?.duration_interval.minutes);
      setPrice(AllEventData?.result?.event_price?.toString());
    }
  }, [AllEventData, eventDataloading]);

  const working = [{id: 1, name: 'book'}];
  const openBottomSheet = () => {
    setDuration1('00');
    setDuration('00');
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    } else {
    }
    // setModalVisible(true);
  };
  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    // setModalVisible(false);
  };

  const handleSaveTime = () => {
    // If only one value is selected, set the other to '00'
    const finalDuration1 = duration1 ? duration1 : '00';  // Use '00' if not selected
    const finalDuration = duration ? duration : '00';     // Use '00' if not selected
    // Update state with final values
    setDuration1(finalDuration1);
    setDuration(finalDuration);
    // Close the bottom sheet
    closeBottomSheet();
  };



  const [pressed1, setPressed1] = React.useState(2);
  const [modalVisible, setModalVisible] = React.useState(false);
  
  const handleFlow = async (name, price, deposit, desc) => {
    const duration_interval = (duration1 && duration) 
  ? `${duration1} hours ${duration} minutes` 
  : null;
    try {
      if (fromEdit === true) {
        const body = {
          user_id: uid,
          name: name,
          event_price: price,
          deposit_price: parseInt(price * 0.2),
          description: desc,
          duration_interval: duration_interval,
          one_to_one: meetingType,
          event_id: id,
        };
        const res = await updateEvent(body);
        if (res?.data?.status === true) {
          await dispatch(
            setEventDetail({
              name: name,
              depositPrice: price,
              price: price,
              description: desc,
              duration_interval: duration_interval,
              // duration: `${duration}:${min}`,
            }),
          );
          navigation.navigate('Location', {
            fromEdit: fromEdit,
            id: res?.data?.result?.id,
          });
        }
      } else {
        const body = {
          ...(uid && { user_id: uid }),
          ...(name && { name: name }),
          ...(price && { event_price: price, deposit_price: parseInt(price * 0.2) }),
          ...(desc && { description: desc }),
          ...(duration_interval && { duration_interval }),
           one_to_one: meetingType      
        };
      // console.log("Check Body",body)
        const res = await postEvent(body);
        if (res?.data?.status === true) {
          await dispatch(
            setEventDetail({
              name: name,
              depositPrice: parseInt(price * 0.2),
              price: price,
              description: desc,
              duration: duration,
              // duration: `${duration}:${min}`,
            }),
          );
          navigation.navigate('Location', {
            fromEdit: fromEdit,
            id: res?.data?.eventId[0].id,
            name: res?.data?.user_slug,
            slug: res?.data?.slug,
          });
        }
      }
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
      // You can also show a message to the user
      // For example:
      // Alert.alert('An error occurred. Please try again later.');
    }
  };
  

  // const handleFlow = async (name, price, deposit, desc) => {
  //   const duration_interval = `${duration1} hours ${duration} minutes`;
  //   if (fromEdit === true) {
  //     const body = {
  //       user_id: uid,
  //       name: name,
  //       event_price: price,
  //       deposit_price: parseInt(price * 0.2),
  //       description: desc,
  //       duration_interval: duration_interval,
  //       one_to_one: meetingType,
  //       event_id: id,
  //     };
  //     await updateEvent(body).then(async res => {
  //       await dispatch(
  //         setEventDetail({
  //           name: name,
  //           depositPrice: price,
  //           price: price,
  //           description: desc,
  //           duration_interval: duration_interval,
  //           // duration: `${duration}:${min}`,
  //         }),
  //       );
  //       if (res?.data?.status === true) {
  //         navigation.navigate('Location', {
  //           fromEdit: fromEdit,
  //           id: res?.data?.result?.id,
  //         });
  //       }
  //     });
  //   } else {
  //     const body = {
  //       user_id: uid,
  //       name: name,
  //       event_price: price,
  //       deposit_price: parseInt(price * 0.2),
  //       description: desc,
  //       duration_interval: duration_interval,
  //       // duration: `${duration}:${min}`,
  //       one_to_one: meetingType,
  //     };

  //     await postEvent(body).then(async res => {
  //       await dispatch(
  //         setEventDetail({
  //           name: name,
  //           depositPrice: parseInt(price * 0.2),
  //           price: price,
  //           description: desc,
  //           duration: duration,
  //           // duration: `${duration}:${min}`,
  //         }),
  //       );
  //       if (res?.data?.status === true) {
  //         navigation.navigate('Location', {
  //           fromEdit: fromEdit,
  //           id: res?.data?.eventId[0].id,
  //           name: res?.data?.user_slug,
  //           slug: res?.data?.slug,
  //         });
  //       }
  //     });
  //   }
  // };

  React.useEffect(() => {
    if (isError) {
      setModalVisible(true);
    }
  }, [isError]);
  const formSchema = Yup.object().shape({
    name: Yup.string().required('Name cannot be empty'),
    price: Yup.string().required('Price cannot be empty'),
    description: Yup.string().required('Description cannot be empty'),
  });


  
  return (
    <View bg={'white'} flex={1}>
      <Header title={fromEdit === true ? 'Edit Event' : 'Add Event'} />
      {eventDataloading && fromEdit ? (
        <ActivityIndicator size={'small'} color={'black'} />
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          flex={1}>
          <Formik
            initialValues={{
              name: fromEdit ? AllEventData?.result?.name : '',
              description: fromEdit ? AllEventData?.result?.description : '',
              price: fromEdit
                ? AllEventData?.result?.event_price?.toString()
                : '',
              deposit: fromEdit
                ? AllEventData?.result?.deposit_price?.toString()
                : `${price.toString() * 0.2}`,
            }}
            validationSchema={formSchema}
            onSubmit={values =>
              handleFlow(
                values.name,
                values?.price,
                values?.deposit,
                values?.description,
              )
            }>
            {({
              values,
              handleChange,
              handleSubmit,
              touched,
              errors,
            }) => (
              <View m={5}>
                <JdInputs
                  label={'Event name'}
                  fontFamily={'NotoSans-SemiBold'}
                  fontSize={18}
                  mt={2}
                  leftIconName={'award'}
                  value={values?.name}
                  onChangeText={handleChange('name')}
                />
                {touched.name && errors.name && (
                  <View flexDir={'row'} alignItems={'center'} mt={1}>
                    <View bg={'red.500'} h={2} w={2} rounded={'full'} mr={1} />
                    <Text color={'red.500'} fontSize={12}>
                      {errors.name}
                    </Text>
                  </View>
                )}
                {/* <JdInputs
                  label={'Event Price'}
                  fontFamily={'NotoSans-SemiBold'}
                  fontSize={18}
                  mt={2}
                  price
                  leftIconName={'currency-pound'}
                  keyboardType={'numeric'}
                  value={values?.price}
                  onChangeText={handleChange('price')}
                />
                {touched.price && errors.price && (
                  <View flexDir={'row'} alignItems={'center'} mt={1}>
                    <View bg={'red.500'} h={2} w={2} rounded={'full'} mr={1} />
                    <Text color={'red.500'} fontSize={12}>
                      {errors.price}
                    </Text>
                  </View>
                )} */}
                {/* <JdInputs
                  isDisabled={true}
                  label={'Deposit Price'}
                  optional={'20% of event price'}
                  price
                  leftIconName={'currency-pound'}
                  keyboardType={'numeric'}
                  fontFamily={'NotoSans-SemiBold'}
                  fontSize={18}
                  value={`${values?.price * 0.2}`.toString()}
                  onChangeText={handleChange('deposit')}
                  mt={2}
                /> */}
                <Row
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  mt={5}>
                  <Text fontFamily={'NotoSans-SemiBold'} fontSize={18}>
                    {t('Description')}
                  </Text>
                  <Text fontFamily={'NotoSans-SemiBold'} fontSize={10}>
                    {characetrLength}/{250}
                    {/* Max char : 250 */}
                  </Text>
                </Row>
                <TextArea
                  mt={2}
                  p={4}
                  borderRadius={10}
                  maxLength={maxCount}
                  bg={'secondary'}
                  borderWidth={0}
                  // numberOfLines={6}
                  placeholder="Enter Description"
                  onChange={e => {
                    setCharacteracetrLength(e?.nativeEvent?.text?.length);
                  }}
                  h={160}
                  value={values?.description}
                  onChangeText={handleChange('description')}
                  // boxSize={'sm'}
                />
                {touched.description && errors.description || characetrLength === 250 ? (
                  <View flexDir={'row'} alignItems={'center'} mt={1}>
                    <View bg={'red.500'} h={2} w={2} rounded={'full'} mr={1} />
                    <Text color={'red.500'} fontSize={12}>
                      {errors.description
                        ? errors.description
                        : '250 characters only'}
                    </Text>
                  </View>
                ) : null}
                <Pressable
                    onPressIn={() => openBottomSheet()}
                >
                  <Input
                    placeholder={t('Duration')}
                    placeholderTextColor={'black'}
                    isReadOnly={true}
                    mt={5}
                    
                    // onPressIn={()=>openBottomSheet()}
                    height={50}
                    value={duration1 === null && duration === null ? null : `${duration1 || '00'} hours ${duration || '00'} minutes`}                    // value={duration === '' ? null : `${duration1} hours ${duration} minutes`}
                    rounded={'full'}
                    bg={'secondary'}
                    borderWidth={0}
                    InputRightElement={
                      currentLanguage === 'en' ? (
                        <Icon
                          as={<AntDesign name={'right'} />}
                          size={4}
                          mr="2"
                          color="#7B7B7B"
                        />
                      ) : null
                    }
                    InputLeftElement={
                      currentLanguage === 'ar' ? (
                        <Icon
                          as={<AntDesign name={'left'} />}
                          size={4}
                          ml="2"
                          color="#7B7B7B"
                        />
                      ) : null
                    }
                    // label={'Location'}

                     InputLeftElement={
                      <Icon
                      as={<AntDesign name={'clockcircleo'} />}
                      size={5}
                      ml="3"
                      color="muted.600"
                      />
                     }
                    fontFamily={'NotoSans-SemiBold'}
                    fontSize={15}
                    // rightIcon={''}
                  />
                </Pressable>

                <View mt={12} mb={3}>
                  <JdButton
                    title={'Continue'}
                    onPress={handleSubmit}
                    loading={isLoading ? isLoading : updateLoading}
                  />
                </View>
              </View>
            )}
          </Formik>
          <BottomSheet
            defaultOff={true}
            height={'45%'}
            width={'100%'}
            openBottom={bottomSheetRef}
              // onOpen={() => {
              //   // Set default values if duration1 or duration are null
              //   setDuration1(duration1 || '00');
              //   setDuration(duration || '00');
              // }}
            >
            <Text fontSize={16} fontFamily={'NotoSans-SemiBold'} mt={5}>
              Duration
            </Text>
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
            <View style={{alignItems:'center'}}>
              <Text style={{fontFamily:'NotoSans-SemiBold'}}>Hours</Text>
              <Picker
              style={{width: 100, backgroundColor: 'white', height: 170}}
              textSize={20}
              selectTextColor={'black'}
              isShowSelectBackground={true}
              selectLineColor="black"
              selectLineSize={0}
              pickerData={startTimePM}
              onValueChange={startTimeHour => {
              setDuration1(startTimeHour)

              }}
            />
            </View>
           <View style={{alignItems:'center'}}>
           <Text style={{fontFamily:'NotoSans-SemiBold'}}>Min</Text>
           <Picker
              style={{width: 100, backgroundColor: 'white', height: 170}}
              textSize={20}
              selectTextColor={'black'}
              selectLineSize={0}
              isShowSelectBackground={true}
              selectLineColor="black"
              pickerData={timeMinutes}
              onValueChange={startTimeMin => {
              setDuration(startTimeMin)
              }}
            />
           </View>
          </View>
          <View>
              <View style={{width: '80%', alignSelf: 'center'}}>
                <JdButton
                  onPress={handleSaveTime}
                  // onPress={() => {
                  //   closeBottomSheet();
                  // }}
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
</>
            
            {/* <View style={{flexDirection:"row", justifyContent:"center"}}>
              <View style={{flexDirection:"column", justifyContent:"center"}}>
                <Text style={{margin:"5%", left:"15%", justifyContent:"center"}}>Hours</Text>
            <SpinnerTimer
             pressed={pressed}
              fromAddEvent
              onTimeSelect={(startTimeHour): string =>
                setDuration1(startTimeHour)
              }
              onMinSelect={(hour): string => setHour(hour)}
               initialHour={fromEdit ? AllEventData?.result?.duration_interval?.hours : undefined}
            />
              </View>
               <View style={{flexDirection:"column", justifyContent:"center"}}>
                <Text style={{margin:"5%", justifyContent:"center", left:"20%"}}>Min</Text>
                        <SpinnerTimer
                         pressed1={pressed1}
              fromAddEvent
              onTimeSelect={(startTimeHour): string =>
                setDuration(startTimeHour)
              }
              onMinSelect={(min): string => setMin(min)}
               initialHour={fromEdit ? AllEventData?.result?.duration_interval?.hours : undefined}
            />
            </View>
            </View>

            <View>
              <View style={{width: '80%', alignSelf: 'center'}}>
                <JdButton
                  onPress={() => {
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
            </View> */}
            {/* </View> */}
          </BottomSheet>
        </ScrollView>
      )}

      <AlertSnackBar
        message={
          isError?.data?.message ? isError?.data.message : null
        }
        // status={ale?.status}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({});



// ......................................................


// import {StyleSheet, ActivityIndicator} from 'react-native';
// import {
//   Image,
//   Input,
//   Row,
//   ScrollView,
//   Text,
//   TextArea,
//   View,
//   Icon,
//   Pressable,
//   Button,
// } from 'native-base';
// import React, { useState } from 'react';
// import Header from '../../components/Header/Header';
// import EventsMap from './components/eventsMap';
// import JdInputs from '../../components/inputs/inputs';
// import JdButton from '../../components/button/Buttons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {useTranslation} from 'react-i18next';
// import * as Yup from 'yup';
// import i18n from '../../translations/i18n';
// import BottomSheet from '../../components/bottomSheet/BottomSheet';
// import SpinnerTimer from '../dateOverride/components/SpinnerTimer';
// import {useDispatch, useSelector} from 'react-redux';
// import {setEventDetail} from '../../redux/fatures/addEvent';
// import {
//   useAddEventDetaiMutation,
//   useGetAllEventDataQuery,
//   useGetUserEventsQuery,
//   useGetUserOneEventQuery,
//   useUpdateEventDetailMutation,
// } from '../../redux/event/event';
// import AlertSnackBar from '../../components/customSnackBar/AlertSnackBar';
// import {Formik} from 'formik';

// const AddEvent = ({navigation, route}) => {
//   const meetingType = route?.params?.one;
//   const fromEdit = route?.params?.fromEdit;
//   const [min, setMin] = React.useState();
//   const [hour, setHour] = React.useState();
//   const id = route?.params?.id;
//   const {t} = useTranslation();
//   const uid = useSelector(state => state?.auth?.userData?.id);
//   const dispatch = useDispatch();
//   const maxCount = 250;
//   const [characetrLength, setCharacteracetrLength] = React.useState();
//   const bottomSheetRef = React.createRef();
//   const [currentLanguage, setLanguage] = React.useState();
//   const [name, setName] = React.useState('');
//   const [price, setPrice] = React.useState('');
//   const [deposit, setDeposit] = React.useState('');
//   const [desc, setDesc] = React.useState('');
//   const [duration, setDuration] = React.useState('');
//  const [duration1, setDuration1] = useState({min:"0", hour:"0"});
 
//   const [postEvent, {data: isData, error: isError, isLoading}] =
//     useAddEventDetaiMutation();
//   const [
//     updateEvent,
//     {data: updateData, error: updateError, isLoading: updateLoading},
//   ] = useUpdateEventDetailMutation();
//   const {
//     data: AllEventData,
//     error: EventDataError,
//     isLoading: eventDataloading,
//   } = useGetAllEventDataQuery(id);
// const [selectedHour, setSelectedHour] = React.useState('00'); // State variable for selected hour
// const [selectedMinute, setSelectedMinute] = React.useState('00'); // State variable for selected minute

//   React.useEffect(() => {
//     setLanguage(i18n.language);
//   }, [i18n.language]);
//   React.useEffect(() => {
//     if (fromEdit) {
//       setDuration(AllEventData?.result?.duration);
//       setPrice(AllEventData?.result?.event_price?.toString());
//     }
//   }, [AllEventData, eventDataloading]);
// const handleHourSelect = (hour) => {
//   setSelectedHour(hour.toString().padStart(2, '0')); // Ensure hour is formatted with leading zero if necessary
// };

// // Update handler for minute selection
// const handleMinuteSelect = (minute) => {
//   setSelectedMinute(minute.toString().padStart(2, '0')); // Ensure minute is formatted with leading zero if necessary
// };


//   const working = [{id: 1, name: 'book'}];
//   const openBottomSheet = () => {
//     if (bottomSheetRef.current) {
//       bottomSheetRef.current.open();
//     } else {
//     }
//     // setModalVisible(true);
//   };
// const handle_save = ()=>{
//   console.log(`Selected Hour: ${selectedHour}`);
//   console.log(`Selected Minute: ${selectedMinute}`);

// }
//   const closeBottomSheet = () => {
//     if (bottomSheetRef.current) {
//       bottomSheetRef.current.close();
//       handle_save();
//     }
//     // setModalVisible(false);
//   };

//   const [pressed, setPressed] = React.useState(1);
//   const [modalVisible, setModalVisible] = React.useState(false);
// // const selected_values = `${duration1.hour}:${duration1.min}`;
// // console.log(selected_values);
//   const handleFlow = async (name, price, deposit, desc) => {
//     if (fromEdit === true) {
//       const body = {
//         user_id: uid,
//         name: name,
//         event_price: price,
//         deposit_price: parseInt(price * 0.2),
//         description: desc,
//         duration: duration1,
//         // duration: `${duration}:${min}`,
//         one_to_one: meetingType,
//         event_id: id,
//       };
//       await updateEvent(body).then(async res => {
//         await dispatch(
//           setEventDetail({
//             name: name,
//             depositPrice: price,
//             price: price,
//             description: desc,
//             duration: duration1,
//             // duration: `${duration}:${min}`,
//           }),
//         );
//         if (res?.data?.status === true) {
//           navigation.navigate('Location', {
//             fromEdit: fromEdit,
//             id: res?.data?.result?.id,
//           });
//         }
//       });
//     } else {
//       const body = {
//         user_id: uid,
//         name: name,
//         event_price: price,
//         deposit_price: parseInt(price * 0.2),
//         description: desc,
//         duration: duration1,
//         // duration: `${duration}:${min}`,
//         one_to_one: meetingType,
//       };
//       await postEvent(body).then(async res => {
//         await dispatch(
//           setEventDetail({
//             name: name,
//             depositPrice: parseInt(price * 0.2),
//             price: price,
//             description: desc,
//             duration: duration,
//             // duration: `${duration}:${min}`,
//           }),
//         );
//         if (res?.data?.status === true) {
//           navigation.navigate('Location', {
//             fromEdit: fromEdit,
//             id: res?.data?.eventId[0].id,
//             name: res?.data?.user_slug,
//             slug: res?.data?.slug,
//           });
//         }
//       });
//     }
//   };

//   React.useEffect(() => {
//     if (isError) {
//       setModalVisible(true);
//     }
//   }, [isError]);
//   const formSchema = Yup.object().shape({
//     name: Yup.string().required('Name cannot be empty'),
//     price: Yup.string().required('Price cannot be empty'),
//     description: Yup.string().required('Description cannot be empty'),
//   });
//   return (
//     <View bg={'white'} flex={1}>
//       <Header title={fromEdit === true ? 'Edit Event' : 'Add Event'} />
//       {eventDataloading && fromEdit ? (
//         <ActivityIndicator size={'small'} color={'black'} />
//       ) : (
//         <ScrollView
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//           flex={1}>
//           <Formik
//             initialValues={{
//               name: fromEdit ? AllEventData?.result?.name : '',
//               description: fromEdit ? AllEventData?.result?.description : '',
//               price: fromEdit
//                 ? AllEventData?.result?.event_price?.toString()
//                 : '',
//               deposit: fromEdit
//                 ? AllEventData?.result?.deposit_price?.toString()
//                 : `${price.toString() * 0.2}`,
//             }}
//             validationSchema={formSchema}
//             onSubmit={values =>
//               handleFlow(
//                 values.name,
//                 values?.price,
//                 values?.deposit,
//                 values?.description,
//               )
//             }>
//             {({
//               values,
//               handleChange,
//               handleSubmit,

//               errors,
//             }) => (
//               <View m={5}>
//                 <JdInputs
//                   label={'Event name'}
//                   fontFamily={'NotoSans-SemiBold'}
//                   fontSize={18}
//                   mt={2}
//                   value={values?.name}
//                   onChangeText={handleChange('name')}
//                 />
//                 {errors.name && (
//                   <View flexDir={'row'} alignItems={'center'} mt={1}>
//                     <View bg={'red.500'} h={2} w={2} rounded={'full'} mr={1} />
//                     <Text color={'red.500'} fontSize={12}>
//                       {errors.name}
//                     </Text>
//                   </View>
//                 )}
//                 <JdInputs
//                   label={'Event Price'}
//                   fontFamily={'NotoSans-SemiBold'}
//                   fontSize={18}
//                   mt={2}
//                   price
//                   leftIconName={'currency-pound'}
//                   keyboardType={'numeric'}
//                   value={values?.price}
//                   onChangeText={handleChange('price')}
//                 />
//                 {errors.price && (
//                   <View flexDir={'row'} alignItems={'center'} mt={1}>
//                     <View bg={'red.500'} h={2} w={2} rounded={'full'} mr={1} />
//                     <Text color={'red.500'} fontSize={12}>
//                       {errors.price}
//                     </Text>
//                   </View>
//                 )}
//                 {/* <JdInputs
//                   isDisabled={true}
//                   label={'Deposit Price'}
//                   optional={'20% of event price'}
//                   price
//                   leftIconName={'currency-pound'}
//                   keyboardType={'numeric'}
//                   fontFamily={'NotoSans-SemiBold'}
//                   fontSize={18}
//                   value={`${values?.price * 0.2}`.toString()}
//                   onChangeText={handleChange('deposit')}
//                   mt={2}
//                 /> */}
//                 <Row
//                   alignItems={'center'}
//                   justifyContent={'space-between'}
//                   mt={5}>
//                   <Text fontFamily={'NotoSans-SemiBold'} fontSize={18}>
//                     {t('Description')}
//                   </Text>
//                   <Text fontFamily={'NotoSans-SemiBold'} fontSize={10}>
//                     {characetrLength}/{250}
//                     {/* Max char : 250 */}
//                   </Text>
//                 </Row>
//                 <TextArea
//                   mt={2}
//                   p={5}
//                   borderRadius={10}
//                   maxLength={maxCount}
//                   bg={'secondary'}
//                   borderWidth={0}
//                   // numberOfLines={6}
//                   onChange={e => {
//                     setCharacteracetrLength(e?.nativeEvent?.text?.length);
//                   }}
//                   h={160}
//                   value={values?.description}
//                   onChangeText={handleChange('description')}
//                   // boxSize={'sm'}
//                 />
//                 {errors.description || characetrLength === 250 ? (
//                   <View flexDir={'row'} alignItems={'center'} mt={1}>
//                     <View bg={'red.500'} h={2} w={2} rounded={'full'} mr={1} />
//                     <Text color={'red.500'} fontSize={12}>
//                       {errors.description
//                         ? errors.description
//                         : '250 characters only'}
//                     </Text>
//                   </View>
//                 ) : null}
//                 <Pressable
//                   onPress={() => {
//                     openBottomSheet();
//                     // navigation.navigate('Location');
//                   }}>
//                   <Input
//                     placeholder={t('Duration')}
//                     placeholderTextColor={'black'}
//                     isReadOnly={true}
//                     mt={5}
//                     value={duration1 === '' ? null : `${duration1.hour} hours : ${duration1.min} minutes`}
//                     rounded={'full'}
//                     bg={'secondary'}
//                     borderWidth={0}
//                     InputRightElement={
//                       currentLanguage === 'en' ? (
//                         <Icon
//                           as={<AntDesign name={'right'} />}
//                           size={4}
//                           mr="2"
//                           color="#7B7B7B"
//                         />
//                       ) : null
//                     }
//                     InputLeftElement={
//                       currentLanguage === 'ar' ? (
//                         <Icon
//                           as={<AntDesign name={'left'} />}
//                           size={4}
//                           ml="2"
//                           color="#7B7B7B"
//                         />
//                       ) : null
//                     }
//                     // label={'Location'}
//                     fontFamily={'NotoSans-SemiBold'}
//                     fontSize={15}
//                     // rightIcon={''}
//                   />
//                 </Pressable>

//                 <View mt={12} mb={3}>
//                   <JdButton
//                     title={'Continue'}
//                     onPress={handleSubmit}
//                     loading={isLoading ? isLoading : updateLoading}
//                   />
//                 </View>
//               </View>
//             )}
//           </Formik>
//           <BottomSheet
//             defaultOff={true}
//             height={'45%'}
//             width={'100%'}
//             openBottom={bottomSheetRef}>
//             {/* <Row> */}
//             <Text fontSize={16} fontFamily={'NotoSans-SemiBold'} mt={5}>
//               Duration
//             </Text>
//             {/* </Row> */}
//            <View style={{flexDirection:"row", justifyContent:"center"}}>
//              {/* <SpinnerTimer
//               fromAddEvent
//               // onTimeSelect={(startTimeMin): string =>
//               //     setDuration1(duration1 => ({...duration1,hour: startTimeMin}))
//               // }
//               onMinSelect={(hour): string => setHour(hour)}
    
//             />
//              <SpinnerTimer
//               fromAddEvent
//               // onTimeSelect={(startTimeHour): string =>
//               //   setDuration1(duration1 => ({...duration1, min: startTimeHour }))
//               // }
//               onMinSelect={(min): string => setMin(min)}
//             /> */}
//  <SpinnerTimer
//       fromAddEvent
//       onHourSelect={handleHourSelect} // Update selectedHour state variable
//     />
//     <SpinnerTimer
//       fromAddEvent
//       onMinSelect={handleMinuteSelect} // Update selectedMinute state variable
//     />

//            </View>
 
//             <View>
//               <View style={{width: '80%', alignSelf: 'center'}}>
//                 <JdButton
//                   onPress={() => {
//                     closeBottomSheet();
//                   }}
//                   title="Save Time"
//                 />
//               </View>
//               <Pressable style={{marginBottom: 10, marginTop: 10}}>
//                 <Text
//                   style={{textAlign: 'center', color: '#6C309C'}}
//                   onPress={() => {
//                     closeBottomSheet();
//                   }}>
//                   {t('Cancel')}
//                 </Text>
//               </Pressable>
//             </View>
//             {/* </View> */}
//           </BottomSheet>
//         </ScrollView>
//       )}

//       <AlertSnackBar
//         message={
//           isError?.data?.message
//             ? isError?.data
//             : {message: 'Sign in successfully! '}
//         }
//         // status={ale?.status}
//         visible={modalVisible}
//         onDismiss={() => setModalVisible(false)}
//       />
//     </View>
//   );
// };

// export default AddEvent;

// const styles = StyleSheet.create({});
