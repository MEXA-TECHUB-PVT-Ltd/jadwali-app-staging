import {StyleSheet, BackHandler, ActivityIndicator, TouchableOpacity, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  Switch,
  Divider,
  Select,
  CheckIcon,
  Checkbox,
  Radio, Alert,
} from 'native-base';
import { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import React from 'react';
import Header from '../../components/Header/Header';

import JdInputs from '../../components/inputs/inputs';
import JdButton from '../../components/button/Buttons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateType from './components/DateType';
import ScheduleComp from './components/ScheduleComp';
import EventsAvailabilityComp from './components/EventsAvailabilityComp';
import Eventtiming from './components/Eventtiming';
import {useTranslation} from 'react-i18next';
import i18n from '../../translations/i18n';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setNameEmail} from '../../redux/fatures/counter/counterSlice';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {setAllowInvitees} from '../../redux/fatures/addEvent';
import {
  useAddQuestionMutation,
  useGetAllEventDataQuery,
  useGetEventDataQuery,
  useGetUserAvailabilityQuery,
  usePostDateRangeMutation,
  usePostEventAvailabilityMutation,
} from '../../redux/event/event';
import ActiveHours from '../../components/Availabiltymodule/ActiveHours';
import {useAddAvailabilityMutation} from '../../redux/auth/auth';
import AlertSnackBar from '../../components/customSnackBar/AlertSnackBar';
import LoaderModal from '../../components/Loader/Loader';
import AlertModal from '../../components/Modal/AlertModal';
import CustomSnackbar from '../../components/customSnackBar/CustomSnackBar';

const SceduleEvent = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const count = useSelector(state => state.counter.nameEmail);
  const fromLocation = route?.params?.fromLocation;

  const days = useSelector(state => state.event?.meetingLimit);
  const invitee = useSelector(state => state.event?.allow_invitee);
  const before = useSelector(state => state.event?.before_meeting);
  const after = useSelector(state => state.event?.after_meeting);
  const uid = useSelector(state => state?.auth?.userData?.id);
  
  const [postDate, {isLoading: postLoading, isError: postError}] =
    usePostDateRangeMutation();
  const [value, setValue] = React.useState('one');
  const added = Number(before) + Number(after);
  // console.log(before, after, added);
  const {
    data: availabilityData,
    error: AvailabilityError,
    isLoading: AvailabilityLoading,
  } = useGetUserAvailabilityQuery(uid);

  let [service, setService] = React.useState('key0');
  const [share, setShare] = React.useState(
    'Please share anything that will help prepare for our meeting',
  );
  const formSchema = Yup.object().shape({
    question: Yup.string().required('Question cannot be empty'),
  });
  const dispatch = useDispatch();
  const [postQuestion, {isLoading: questionLoading, isError: questionError}] =
    useAddQuestionMutation();
  const DateRange = useSelector(state => state?.event?.date_range);

  const fromEdit = route?.params?.fromEdit;
  const ans = route?.params?.ans;
  const eid = route?.params?.id;
  const beforeMeeting = useSelector(state => state?.event?.before_meeting);
  const afterMeeting = useSelector(state => state?.event?.after_meeting);
  const leadTime = useSelector(state => state?.event?.booking_lead_time);
  const [custom, setCustom] = React.useState(false);

  const [lnth, setLnth] = React.useState(0);

  const {
    data: AllEventData,
    error: EventDataError,
    isLoading: eventDataloading,
    refetch,
  } = useGetAllEventDataQuery(eid);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );
  React.useEffect(() => {
    if (fromEdit && AllEventData?.result?.availability_profiles?.length > 0) {
      setLnth(AllEventData?.result?.availability_profiles?.length);
    } else if (availabilityData?.result?.length > 0) {
      // console.log('availability_profiles', availabilityData?.result?.length);÷
      setLnth(availabilityData?.result?.length);
    }
  }, [AllEventData, availabilityData]);

  const [Question, setQuestion] = React.useState(ans);

  const [selected, setSelected] = React.useState(false);
  const bottomSheetRef = React.createRef();

  const openBottomSheet = () => {
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

  const opt = [
    {id: 1, name: 'Into the future'},
    {id: 2, name: 'Custom date range'},
    // {id: 3, name: 'Indefinitely into the future'},
  ];
  const event = [
    {id: 1, name: 'Use Default Schedule'},
    {id: 2, name: 'Set custom hours'},
  ];
  const eventTiming = [
    {id: 1, name: 'Before event'},
    {id: 2, name: 'After event'},
  ];
  // const [post, {data: isData, error: isError, isLoading: loadingData}] =
  //   useAddAvailabilityMutation();
  const [
    createAvailability,
    {isLoading: loadingData, isError: postAvailabilityError},
  ] = usePostEventAvailabilityMutation();
  const working = [{id: 1, name: 'book'}];
  const {t} = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n?.language);
  }, [i18n.language]);
  const [webView, setWebView] = React.useState();
  const handleName = async () => {
    let fromEdits = true;
    dispatch(
      setNameEmail({
        ansType: 'oneLine',
        id: 1,
        ques: 'Name,Email',
        required: true,
        status: 'on',
      }),
    );
    navigation.navigate('AddQuestion', {
      fromEdits: fromEdits,
      // ansType: 'oneLine',
      // id: 1,
      // ques: 'Name,Email',
    });
  };
  const handleCreate = q => {
    bottomSheetRef?.current?.close();
    setShare(q);
  };
//   const showToast = () => {
//   ToastAndroid.show('Question deleted successfully', ToastAndroid.SHORT); // Show toast message
// };
const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
const handleDeleteQuestion = async () => {
    try {
      const questionId = await AsyncStorage.getItem('questionId'); // Retrieve question ID from local storage
       console.log(questionId)
      const response = await fetch(`https://jadwali-be.mtechub.com/api/questions/delete/${questionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        
        // Question deleted successfully
      console.log('Success', 'Question deleted successfully');
      showToast('Question deleted successfully');
        // You can navigate back or update the UI as needed
      } else {
        // Failed to delete question
       console.log('Error', 'Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    console.log('Error', 'Failed to delete question. Please try again later.');
    }
  };
  const renderQuestion = (question, index) => {
    if (question?.type === 'oneline' || question?.type === 'number') {
      return (
        <Pressable
           onPress={() => {
    console.log("Index:", index);
    console.log("Event ID:", eid);
    navigation.navigate('AddQuestion', {
      fromEvent: true,
      question: question,
      ind: index,
      id: eid,
    })
  }
}
          bg={'secondary'}
          key={index}
          p={3}
          mb={5}
          rounded={'md'}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'} w={'80%'}>
              {question?.text}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddQuestion', {
                  fromEvent: true,
                  question: question,
                  ind: index,
                  id: eid,
                })
              }>
             
                            <Ionicons
                name={'pencil-outline'}
                size={18}
                color={'purple'}
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
            {/* <View style={{margin:""}}></View> */}
                <TouchableOpacity
                    onPress={() => { handleDeleteQuestion()}}
                    style={{margin:"2%"}}
                    >
                       <Ionicons
                      name={'trash-outline'}
                      size={18}
                      color={'red'}
                      style={{marginLeft: 5,}}
                    />
              {/* <Text
                color={'primary.50'}
                underline
                fontSize={14}
                margin={2}
                fontFamily={'NotoSans-Medium'}>
                Delete
              </Text> */}
            
            </TouchableOpacity>
          </Row>
        </Pressable>
      );
    } else if (question?.type === 'multipleLine') {
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('AddQuestion', {
              fromEvent: true,
              question: question,
              ind: index,
              id: eid,
            })
          }
          bg={'secondary'}
          key={index}
          p={5}
          mb={5}
          rounded={'md'}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'} w={'80%'}>
              {question?.text}
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('AddQuestion', {
                  fromEvent: true,
                  question: question,
                  ind: index,
                  id: eid,
                })
              }>
              <Ionicons
                name={'pencil-outline'}
                size={18}
                color={'purple'}
                style={{marginLeft: 5}}
              />
            </Pressable>
             <TouchableOpacity
                    onPress={() => { handleDeleteQuestion()}}
                    >
                       <Ionicons
                      name={'trash-outline'}
                      size={18}
                      color={'red'}
                      style={{marginLeft: 5}}
                    />
                    </TouchableOpacity>

            
          </Row>
        </Pressable>
      );
    } else if (question?.type === 'radio' || question?.type === 'checkboxes') {
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('AddQuestion', {
              fromEvent: true,
              question: question,
              ind: index,
              id: eid,
            })
          }
          bg={'secondary'}
          key={index}
          p={5}
          mb={5}
          rounded={'md'}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'} w={'80%'}>
              {question?.text}
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('AddQuestion', {
                  fromEvent: true,
                  question: question,
                  ind: index,
                  id: eid,
                })
              }>
              {/* <Text
                color={'primary.50'}
                underline
                fontSize={14}
                fontFamily={'NotoSans-Medium'}>
                Edit
              </Text> */}
              <Ionicons
  name={'pencil-outline'}
  size={18}
  color={'purple'}
  // style={{marginLeft: 5}}
/>
            </Pressable>
            <View style={{margin:"3%"}}></View>
              <TouchableOpacity
                    onPress={() => { handleDeleteQuestion()}}
                    >
                       <Ionicons
                      name={'trash-outline'}
                      size={18}
                      color={'red'}
                      style={{right: "5%"}}
                    />
                    </TouchableOpacity>

          </Row>
          {question?.options?.map(item => {
            return (
              <>
                {question?.type === 'radio' ? (
                  <Radio.Group
                    name="myRadioGroup"
                    accessibilityLabel="favorite number"
                    value={value}
                    onChange={nextValue => {
                      setValue(nextValue);
                    }}>
                    <Radio value={item} my={1} isDisabled size={'sm'}>
                      {item}
                    </Radio>
                  </Radio.Group>
                ) : null}
                {question?.type === 'checkbox' && (
                  <Checkbox
                    value={item}
                    my={1}
                    size={'sm'}
                    isDisabled
                    _text={{color: 'grey.400', ml: 0}}>
                    {item}
                  </Checkbox>
                )}
              </>
            );
          })}
          {question?.type === 'checkbox' && (
            <Checkbox isDisabled value={'one'}>
              <Input
                w={'80%'}
                ml={0}
                placeholder={'other'}
                h={10}
                p={2}
                isDisabled
                bg={'white'}
                borderRadius={10}
              />
            </Checkbox>
          )}
          {question?.type === 'radio' && (
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={value}
              onChange={nextValue => {
                setValue(nextValue);
              }}>
              <Radio isDisabled value={'one'}>
                <Input
                  w={'80%'}
                  ml={0}
                  placeholder={'other'}
                  h={10}
                  p={2}
                  isDisabled
                  bg={'white'}
                  borderRadius={10}
                />
              </Radio>
            </Radio.Group>
          )}
        </Pressable>
      );
    } else if (question?.type === 'dropdown') {
      return (
        <Pressable
          bg={'secondary'}
          key={index}
          p={5}
          mb={5}
          rounded={'md'}
          onPress={() =>
            navigation.navigate('AddQuestion', {
              fromEvent: true,
              question: question,
              ind: index,
              id: eid,
            })
          }>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'} w={'80%'}>
              {question?.text}
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('AddQuestion', {
                  fromEvent: true,
                  question: question,
                  ind: index,
                  id: eid,
                })
              }>
              {/* <Text
                color={'primary.50'}
                underline
                fontSize={14}
                fontFamily={'NotoSans-Medium'}>
                Edit
              </Text> */}
              <Ionicons
  name={'pencil-outline'}
  size={18}
  color={'purple'}
  style={{marginLeft: 5}}
/>
            </Pressable>
              <TouchableOpacity
                    onPress={() => { handleDeleteQuestion()}}
                    >
                       <Ionicons
                      name={'trash-outline'}
                      size={18}
                      color={'red'}
                      style={{marginLeft: 5}}
                    />
                    </TouchableOpacity>

          </Row>
          <Select
            mt={5}
            isDisabled
            onValueChange={itemValue => setService(itemValue)}
            selectedValue={service}
            borderRadius={10}
            borderColor={'primary.50'}
            placeholder="Select"
            dropdownIcon={
              <AntDesign
                color={'black'}
                size={15}
                name={'down'}
                style={{marginRight: 15}}
              />
            }
            _item={{_text: {fontSize: 14}}}
            _selectedItem={{
              _text: {color: 'primary.50'},
              endIcon: (
                <CheckIcon
                  size="5"
                  position={'absolute'}
                  right={2}
                  color={'primary.50'}
                />
              ),
            }}
            // _actionSheet={{height: 10}}
            // _actionSheetContent={{height: 40}}
            // _actionSheetBody={{b}}

            defaultValue="key0"
            mode="dropdown"
            style={{width: 120}}>
            <Select.Item label="Name" value="key0" p={2} />
            <Select.Item label="First Name, Last Name" value="key1" p={2} />
          </Select>
        </Pressable>
      );
    }
  };

  const [press, setPress] = React.useState(1);
  const [alert, setAlert] = React.useState(false);
  const handleNavigation = async () => {
    if (Object.keys(DateRange)?.length > 0) {
      if (fromEdit === false) {
        await postQuestion({
          type: 'name',
          text: 'Name',
          is_required: true,
          status: true,
          event_id: eid,
        }).then(res => {});
        await postQuestion({
          type: 'multipleLine',
          text: share,
          is_required: true,
          status: true,
          event_id: eid,
        }).then(res => {});
        await postQuestion({
          type: 'email',
          text: 'What is your email address?',
          is_required: true,
          status: true,
          event_id: eid,
        }).then(res => {});
      }
      if (press === 1) {
        const body = {
          event_id: eid,
          availability_id: availabilityData?.result[0].id,
        };
        await createAvailability(body).then(async res => {});
      }

      let body = {
        ...DateRange,
        book_leading_time: leadTime,
        after_time: afterMeeting,
        before_time: beforeMeeting,
      };
      await postDate(body);

      if (
        postLoading === false &&
        loadingData === false &&
        questionLoading === false &&
        eventDataloading === false
      ) {
        navigation.navigate('EventAdded', {
          fromEdit: fromEdit,
          name: AllEventData?.result?.user_slug,
          slug: AllEventData?.result?.slug,
        });
      }
    } else {
      setAlert(true);
    }

    postLoading ? postLoading : loadingData || questionLoading;
  };
  let body = {
    status: false,
    message: 'Please complete Event details',
  };
  React.useEffect(() => {
    if (questionError || postError || postAvailabilityError) {
      setModalVisible(true);
    }
  }, [questionError, postError, postAvailabilityError]);
  // console.log(
  //   '----------------------------------------------------------------',
  // );
  // console.log('prs', press);
  // console.log(
  //   '----------------------------------------------------------------',
  // );
  return (
    <View bg={'white'} flex={1}>
      <CustomSnackbar
        message={'Alert'}
        visible={alert}
        height={'8%'}
        onDismiss={() => {
          setAlert(false);
        }}
        messageDescription={'Please select date range'}
      />
      {/* <AlertModal
        heading={'Alert'}
        btntxt2={'OK'}
        onPress={() => {
          setAlert(false);
        }}
        // btntxt1={'No'}
        message={'Please select date Range'}
        modalVisible={alert}
        setModalVisible={setAlert}
      /> */}
      <Header title={fromEdit === true ? 'Edit Event' : 'Add Event'} />
      <AlertSnackBar
        message={
          questionError
            ? questionError
            : null || postError
            ? postError
            : null || postAvailabilityError
            ? postAvailabilityError
            : null
        }
        // status={ale?.status}
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}
      />
      {eventDataloading ? (
        <LoaderModal
          visible={
            eventDataloading || questionLoading || loadingData || postLoading
          }
        />
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          flex={1}>
          <LoaderModal
            visible={
              eventDataloading || questionLoading || loadingData || postLoading
            }
          />
          <View m={5}>
            <Text
              mt={5}
              ml={1}
              // color={'grey.40'}
              fontSize={18}
              fontFamily={'NotoSans-SemiBold'}>
              {t('Date Range')}
            </Text>
            <Text
              ml={1}
              mt={2}
              color={'grey.400'}
              fontSize={14}
              fontFamily={'NotoSans-Regular'}>
              {t('Set a range of dates when you can accept meetings')}
            </Text>
            <Text
              mt={5}
              ml={1}
              // color={'grey.40'}
              fontSize={18}
              fontFamily={'NotoSans-SemiBold'}>
              {t('Invitees can schedule')}
            </Text>
            <Text
              ml={1}
              mt={2}
              color={'grey.400'}
              fontSize={12}
              fontFamily={'NotoSans-Regular'}>
              {t('You can add maximum of 60 days for scheduling your meetings')}
            </Text>

            <DateType
              opt={opt}
              translation={currentLanguage}
              eid={eid}
              fromedit={fromEdit}
              eventData={AllEventData?.result}
            />
            <Text
              ml={1}
              fontSize={16}
              fontFamily={'NotoSans-Medium'}
              alignSelf={currentLanguage === 'ar' ? 'flex-end' : null}
              w={currentLanguage === 'ar' ? '60%' : '80%'}
              my={5}>
              {t(
                'How do you want to offer your availability for this event type?',
              )}
            </Text>
            <Text
              ml={currentLanguage === 'ar' ? 5 : 1}
              // mt={2}
              // ml={}
              color={'grey.400'}
              fontSize={14}
              fontFamily={'NotoSans-Regular'}>
              {t(
                'Select one of your schedules or define custom hours specific to this type of event.',
              )}
            </Text>
            {eventDataloading ? null : (
              <ScheduleComp
                event={event}
                eid={eid}
                fromEdit={fromEdit}
                onPress={id => setPress(id)}
              />
            )}
          </View>
          <View mx={0} mb={5} bg={'secondary'}>
            {/* <EventsAvailabilityComp
            translation={currentLanguage}
            item={data}
            availability={av => console.log(av)}
          /> */}
            {AvailabilityLoading || eventDataloading ? (
              <ActivityIndicator size={'small'} color={'black'} />
            ) : (
              <>
                {eventDataloading ||
                AllEventData?.result?.availability_profiles?.length === 0 ||
                availabilityData?.result?.length === 0 ? null : (
                  <View mx={5}>
                    {fromEdit === true ? (
                      <ActiveHours
                        fromSchedule={true}
                        handleAlert={() => {
                          setActive(true);
                        }}
                        userDeafult={
                          fromEdit && press === 2
                            ? AllEventData?.result?.availability_profiles[0]
                                .availability
                            : availabilityData?.result[0]?.days
                        }
                      />
                    ) : (
                      <ActiveHours
                        fromSchedule={true}
                        handleAlert={() => {
                          setActive(true);
                        }}
                        userDeafult={
                          press === 2
                            ? availabilityData?.result[lnth - 1]?.days
                            : availabilityData?.result[0]?.days
                        }
                      />
                    )}
                  </View>
                )}
              </>
            )}
          </View>

          <View mx={5}>
            <Text
              ml={1}
              fontSize={16}
              fontFamily={'NotoSans-Medium'}
              alignSelf={currentLanguage === 'ar' ? 'flex-end' : null}
              w={'80%'}
              mb={5}>
              {t('Want to add time before or after your events?')}
            </Text>
            <Text
              ml={1}
              // mt={2}
              color={'grey.400'}
              fontSize={14}
              fontFamily={'NotoSans-Regular'}>
              {t(
                'Keep in mind, the extra time before and after bookings will add up together.',
              )}
            </Text>
            <Pressable>
              <Input
                my={5}
                mb={0}
                mx={5}
                p={4}
                placeholder={t('30 min meeting')}
                placeholderTextColor={'black'}
                value={t(`${added ? added : 0} min meeting`)}
                borderRadius={10}
                bg={'primary.20'}
                isReadOnly={true}
                borderWidth={0}
                InputRightElement={
                  currentLanguage === 'en' ? (
                    <Icon
                      as={<View h={5} w={5} rounded={'full'} bg={'red.600'} />}
                      size={4}
                      mr="2"
                      color="#EA4335"
                    />
                  ) : null
                }
                InputLeftElement={
                  currentLanguage === 'ar' ? (
                    <Icon
                      as={<View h={5} w={5} rounded={'full'} bg={'red.600'} />}
                      size={4}
                      ml="2"
                      color="#EA4335"
                    />
                  ) : null
                }
                // placeholderTextColor={'black'}
                // label={'Location'}
                fontFamily={'NotoSans-Regular'}
                fontSize={14}
                // rightIcon={''}
              />
            </Pressable>
            <Eventtiming
              translation={currentLanguage}
              event={eventTiming}
              event_id={eid}
            />
            <Text
              mt={5}
              ml={1}
              fontSize={16}
              fontFamily={'NotoSans-Medium'}
              alignSelf={currentLanguage === 'ar' ? 'flex-end' : null}
              w={'80%'}>
              {t('Booking Lead Time')}
            </Text>
            <Text
              ml={1}
              mt={2}
              // mb={5}
              color={'grey.400'}
              fontSize={14}
              fontFamily={'NotoSans-Regular'}>
              {t(
                'The minimum amount of time required before a client can book an appointment',
              )}
            </Text>
            <Eventtiming
              translation={currentLanguage}
              event={working}
              event_id={eid}
            />
            <View mt={5} mx={4}>
              <Text
                ml={2}
                color={'black'}
                fontSize={16}
                mb={5}
                fontFamily={'NotoSans-SemiBold'}>
                Invitees Questions
              </Text>
              <View bg={'secondary'} p={3} rounded={'md'}>
                <Row alignItems={'center'} justifyContent={'space-between'}>
                  <Text color={'grey.400'}>Name,Email</Text>
                  {/* <Pressable
                    onPress={() => {
                      setSelected(false);
                      openBottomSheet();
                    }}>
                    <Text
                      color={'primary.50'}
                      underline
                      fontSize={14}
                      fontFamily={'NotoSans-Medium'}>
                      Edit
                    </Text>
                  </Pressable> */}
                </Row>
              </View>

              <View bg={'secondary'} my={5} p={3} mb={5} rounded={'md'}>
                <Row alignItems={'center'} justifyContent={'space-between'}>
                  <Text color={'grey.400'} w={'80%'}>
                    {share}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setSelected(true);
                      openBottomSheet();
                    }}>
                    {/* <Text
                      color={'primary.50'}
                      underline
                      fontSize={14}
                      fontFamily={'NotoSans-Medium'}>
                      Edit 
                    </Text> */}
                    <Ionicons
                      name={'pencil-outline'}
                      size={18}
                      color={"purple"}
                      style={{marginLeft: 5}}
/>
                  </Pressable>
                  
                </Row>
              </View>
              {AllEventData?.result?.questions?.length > 0 ? (
                <>
                  {AllEventData?.result?.questions?.map((question, index) =>
                    renderQuestion(question, index),
                  )}
                </>
              ) : null}

              {ans ? (
                <View bg={'secondary'} p={3} mb={5} rounded={'md'}>
                  <Row alignItems={'center'} justifyContent={'space-between'}>
                    <Text color={'grey.400'}>questions</Text>
                    <Pressable
                      onPress={() => {
                        let fromEdits = true;
                        navigation.navigate('AddQuestion', fromEdits);
                      }}>
                      {/* <Text
                        color={'primary.50'}
                        underline
                        fontSize={14}
                        fontFamily={'NotoSans-Medium'}>
                        Edit
                      </Text> */}
                      <Ionicons
  name={'pencil-outline'}
  size={18}
  color={'purple'}
  style={{marginLeft: 5}}
/>
                    </Pressable>
                     <Pressable
                      onPress={() => {
                        let fromEdits = true;
                        navigation.navigate('AddQuestion', fromEdits);
                      }}>
                      {/* <Text
                        color={'primary.50'}
                        underline
                        fontSize={14}
                        fontFamily={'NotoSans-Medium'}>
                        Edit
                      </Text> */}
                      <Ionicons
  name={'pencil-outline'}
  size={18}
  color={'purple'}
  style={{marginLeft: 5}}
/>
                    </Pressable>
                  </Row>
                </View>
              ) : null}
              <Pressable
                onPress={() => navigation.navigate('AddQuestion', {id: eid})}>
                <View>
                  <Text
                    underline
                    color={'primary.50'}
                    textAlign={'center'}
                    fontSize={14}
                    fontFamily={'NotoSans-SemiBold'}>
                    Add New Questions
                  </Text>
                </View>
              </Pressable>
            </View>
            <View mt={10} mb={5} mx={5}>
              <JdButton
                title={'Next'}
                onPress={() => {
                  handleNavigation();
                }}
              />
            </View>
          </View>
        </ScrollView>
      )}
      <BottomSheet
        defaultOff={true}
        height={'47%'}
        width={'100%'}
        openBottom={bottomSheetRef}>
        <Pressable
          position={'absolute'}
          right={2}
          top={2}
          onPress={() => {
            closeBottomSheet();
          }}>
          <Entypo name={'cross'} color={'black'} size={20} />
        </Pressable>
        {/* <Row> */}
        <>
          {selected === true ? (
            <ScrollView keyboardShouldPersistTaps="handled" mt={5} flex={1}>
              <Text fontSize={16} fontFamily={'NotoSans-SemiBold'}>
                Edit Question
              </Text>

              <Formik
                initialValues={{
                  question: share,
                }}
                validationSchema={formSchema}
                onSubmit={values => handleCreate(values.question)}>
                {({
                  values,
                  handleChange,
                  touched,
                  handleSubmit,

                  errors,
                }) => (
                  <View flex={1}>
                    <Text mt={5} fontSize={14} fontFamily={'NotoSans-Medium'}>
                      Question:
                    </Text>
                    <Input
                      mt={2}
                      rounded={'full'}
                      bg={'secondary'}
                      value={values.question}
                      onChangeText={handleChange('question')}
                    />
                    {touched.question && errors.question && (
                      <View flexDir={'row'} alignItems={'center'} mt={1}>
                        <View
                          bg={'red.500'}
                          h={2}
                          w={2}
                          rounded={'full'}
                          mr={1}
                        />
                        <Text color={'red.500'} fontSize={12}>
                          {errors.question}
                        </Text>
                      </View>
                    )}
                    <View mt={'32%'} w={'80%'} alignSelf={'center'}>
                      <JdButton title={'Apply'} onPress={handleSubmit} />
                      <Pressable onPress={() => closeBottomSheet()}>
                        <Text
                          mt={2}
                          underline
                          color={'primary.50'}
                          textAlign={'center'}
                          fontSize={16}
                          fontFamily={'NotoSans-Medium'}>
                          Cancel
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </Formik>
            </ScrollView>
          ) : (
            <View mt={5} flex={1}>
              <Text fontSize={16} fontFamily={'NotoSans-SemiBold'}>
                Edit Name Question
              </Text>
              <Text mt={5} fontSize={14} fontFamily={'NotoSans-Regular'}>
                Name Input
              </Text>
              <Select
                mt={5}
                onValueChange={itemValue => setService(itemValue)}
                selectedValue={service}
                borderRadius={10}
                borderColor={'primary.50'}
                dropdownIcon={
                  <AntDesign
                    color={'black'}
                    size={15}
                    name={'down'}
                    style={{marginRight: 15}}
                  />
                }
                _item={{_text: {fontSize: 14}}}
                _selectedItem={{
                  _text: {color: 'primary.50'},
                  endIcon: (
                    <CheckIcon
                      size="5"
                      position={'absolute'}
                      right={2}
                      color={'primary.50'}
                    />
                  ),
                }}
                // _actionSheet={{height: 10}}
                // _actionSheetContent={{height: 40}}
                // _actionSheetBody={{b}}

                defaultValue="key0"
                mode="dropdown"
                style={{width: 120}}>
                <Select.Item label="Name" value="key0" p={2} />
                <Select.Item label="First Name, Last Name" value="key1" p={2} />
              </Select>
              {/* </View> */}
              <Row mt={5} alignItems={'center'}>
                <Checkbox mr={2} alignSelf={'flex-start'} />
                <Text textAlign={'left'} mr={5}>
                  Autofill invitee Name,Email and text Reminder Phone Number
                  (When Applicable) from Prior bookings
                </Text>
              </Row>
              <View
                position={'absolute'}
                bottom={2}
                alignSelf={'center'}
                w={'80%'}>
                <JdButton
                  title={'Apply'}
                  onPress={() => {
                    closeBottomSheet();
                  }}
                />
              </View>
            </View>
          )}
        </>
      </BottomSheet>
      <AlertSnackBar
        message={{
          message: 'Pleaase select custom hours for editing',

          status: false,
        }}
        // status={ale?.status}
        visible={active}
        onDismiss={() => {
          setActive(false);
        }}
      />
    </View>
  );
};

export default SceduleEvent;

const styles = StyleSheet.create({});
