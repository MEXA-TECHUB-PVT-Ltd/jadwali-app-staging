import { StyleSheet, ActivityIndicator, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  Divider,
  Select,
  CheckIcon,
  Checkbox,
  Radio,
  Link,


  Box, Center, HStack, VStack,
} from 'native-base';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import EventsMap from './components/eventsMap';
import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';
import {
  _getResults,
  useDeleteEventMutation,
  useGetAllEventDataQuery,
  useGetUserEventsQuery,
} from '../../redux/event/event';
import { useDispatch, useSelector } from 'react-redux';
import ActiveHours from '../../components/Availabiltymodule/ActiveHours';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoaderModal from '../../components/Loader/Loader';
import JdButton from '../../components/button/Buttons';
import AlertModal from '../../components/Modal/AlertModal';
import DelModal from '../../components/DeleteModal/DelModal';
import { deleteUserEvent } from '../../redux/fatures/addEvent';
const Events = ({ route, navigation }) => {
  const uid = useSelector(state => state.auth.userData.id);
  const [modalVisible, setmodalVisible] = useState(false
  )

  const dispatch = useDispatch();
  const eventId = route?.params?.eventId;
  const { data: isData, refetch } = useGetUserEventsQuery(uid);
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    setEvents(isData?.events);
  }, [isData?.events]);
  const {
    data: AllEventData,
    error: EventDataError,
    isLoading: eventDataloading,
  } = useGetAllEventDataQuery(eventId);
  const [
    deleteEvent,
    { data: isData2, error: isError2, isLoading }
  ] = useDeleteEventMutation();

  const Data = [
    {
      id: 1,
      name: 'Mondays',
      startTime: '09:00',
      am: 'am',
      pm: 'pm',
      endTime: '05:00',
    },
    {
      id: 2,
      name: 'Tuesdays',
      startTime: '09:00',
      am: 'am',
      pm: 'pm',
      endTime: '05:00',
    },
    {
      id: 3,
      name: 'Wednesdays',
      startTime: '09:00',
      am: 'am',
      pm: 'pm',
      endTime: '05:00',
    },
    {
      id: 4,
      name: 'Thursdays',
      startTime: '09:00',
      am: 'am',
      pm: 'pm',
      endTime: '05:00',
    },
    {
      id: 5,
      name: 'Fridays',
      startTime: '09:00',
      am: 'am',
      pm: 'pm',
      endTime: '05:00',
    },
    {
      id: 6,
      name: 'Saturdays',
      startTime: '09:00',
      am: 'am',
      pm: 'pm',
      endTime: '05:00',
    },
    {
      id: 7,
      name: 'Sundays',
      startTime: '09:00',
      am: 'am',
      pm: 'pm',
      endTime: '05:00',
    },
  ];
  const { t } = useTranslation();
  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  const des =
    'Its a scheduled meeting for the Combat training session for more details check the notes';
  let lnth = AllEventData?.result?.availability_profiles?.length - 1;

  const renderQuestion = (question, index) => {
    if (question?.type === 'oneline' || question?.type === 'number') {
      return (
        <Pressable bg={'secondary'} key={index} p={3} mb={5} rounded={'md'}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'}>{question?.text}</Text>
          </Row>
        </Pressable>
      );
    } else if (question?.type === 'name' || question?.type === 'email') {
      return (
        <Pressable bg={'secondary'} key={index} p={3} mb={5} rounded={'md'}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'}>{question?.text}</Text>
          </Row>
        </Pressable>
      );
    } else if (question?.type === 'multipleLine') {
      return (
        <Pressable bg={'secondary'} key={index} p={5} mb={5} rounded={'md'}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'}>{question?.text}</Text>
          </Row>
        </Pressable>
      );
    } else if (question?.type === 'radio' || question?.type === 'checkboxes') {
      return (
        <Pressable bg={'secondary'} key={index} p={5} mb={5} rounded={'md'}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'}>{question?.text}</Text>
          </Row>
          {question?.options?.map(item => {
            return (
              <>
                {question?.type === 'radio' ? (
                  <Radio.Group
                    name="myRadioGroup"
                    accessibilityLabel="favorite number"
                    onChange={nextValue => { }}>
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
                    _text={{ color: 'grey.400', ml: 0 }}>
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
              onChange={() => { }}>
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
        <Pressable bg={'secondary'} key={index} p={5} mb={5} rounded={'md'}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'}>{question?.text}</Text>
          </Row>
          <Select
            mt={5}
            isDisabled
            onValueChange={() => { }}
            borderRadius={10}
            borderColor={'primary.50'}
            placeholder="Select"
            dropdownIcon={
              <AntDesign
                color={'black'}
                size={15}
                name={'down'}
                style={{ marginRight: 15 }}
              />
            }
            _item={{ _text: { fontSize: 14 } }}
            _selectedItem={{
              _text: { color: 'primary.50' },
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
            style={{ width: 120 }}>
            <Select.Item label="Name" value="key0" p={2} />
            <Select.Item label="First Name, Last Name" value="key1" p={2} />
          </Select>
        </Pressable>
      );
    }
  };


  const _fetchData = () => {
    _getResults(uid).then((responce) => {
      if (responce) {
        navigation.goBack();
      }
    }).catch((error) => {
      if (error.response.data.message == "No events found for the specified user") {
        navigation.goBack();
      }
    })
  }

  const handleDelete = async (val) => {
    if (val === "yes") {
      const body = {
        user_id: uid,
        event_id: eventId

      };
      const res = await deleteEvent(body);
      if (res?.data?.status === true) {
        setmodalVisible(false);
        _fetchData();

      }
    } else {
      setmodalVisible(false)
    }


  }

  return (
    <View bg={'white'} flex={1}>
      <Header title={'Event Details'}
        icondelete={true}
        onPress={() => setmodalVisible(true)}
      />
      {eventDataloading ? (
        <LoaderModal visible={eventDataloading} />
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View m={5}>
            <View bg={'secondary'} p={5} borderRadius={10}>
              <Row
                justifyContent={'space-between'}
                flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}>
                <Text fontSize={15} fontFamily={'NotoSans-Medium'}>
                  {t('Name')}
                </Text>
                <Text
                  fontSize={15}
                  color={'primary.50'}
                  fontFamily={'NotoSans-Medium'}>
                  {AllEventData?.result?.name}
                </Text>
              </Row>
              <Row
                justifyContent={'space-between'}
                flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}>
                <Text fontSize={15} fontFamily={'NotoSans-Medium'}>
                  {t('Event Price')}
                </Text>
                <Text
                  fontSize={15}
                  color={'primary.50'}
                  fontFamily={'NotoSans-Medium'}>
                  $ {AllEventData?.result?.event_price}
                </Text>
              </Row>
              {/* <Row
                justifyContent={'space-between'}
                flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}>
                <Text fontSize={15} fontFamily={'NotoSans-Medium'}>
                  {t('Deposit Price')}
                </Text>
                <Text
                  fontSize={15}
                  color={'primary.50'}
                  fontFamily={'NotoSans-Medium'}>
                  $ {AllEventData?.result?.deposit_price}
                </Text>
              </Row> */}
              <Row
                justifyContent={'space-between'}
                flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
                my={2}>
                <Text fontSize={15} fontFamily={'NotoSans-Medium'}>
                  {t('Duration')}
                </Text>
                <Text
                  fontSize={16}
                  color={'primary.50'}
                  fontFamily={'NotoSans-Medium'}>
                  {/* {AllEventData?.result?.duration} */}
                  {AllEventData?.result?.duration_interval?.hours} hours {AllEventData?.result?.duration_interval?.minutes} minutes
                </Text>
              </Row>
              <Row
                flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}
                justifyContent={'space-between'}>
                <Text fontSize={15} fontFamily={'NotoSans-Medium'}>
                  {t('Status')}
                </Text>
                <Text
                  color={'primary.50'}
                  fontSize={16}
                  fontFamily={'NotoSans-Medium'}>
                  {t('On')}
                </Text>
              </Row>
              <Text fontSize={15} mt={2} fontFamily={'NotoSans-SemiBold'}>
                {t('Description')}
              </Text>
              {/* <Text
                fontSize={12}
                color={'grey.400'}
                mt={1}
                fontFamily={'NotoSans-SemiBold'}>
                {t('Invitees will not see this')}
              </Text> */}
              <Text
                fontSize={15}
                color={'primary.50'}
                mt={1}
                fontFamily={'NotoSans-SemiBold'}>
                {AllEventData?.result?.description}
              </Text>
            </View>
            <View bg={'secondary'} p={5} borderRadius={10} my={5}>
              <Text fontSize={16} fontFamily={'NotoSans-SemiBold'} mb={2}>
                {t('Days and Time')}
              </Text>
              {AllEventData?.result?.availability_profiles?.length > 0 && (
                <ActiveHours
                  fromSchedule={true}
                  userDeafult={
                    AllEventData?.result?.availability_profiles[lnth]
                      .availability
                  }
                />
              )}
            </View>
            <View bg={'secondary'} p={5} borderRadius={10} my={5}>
              <Text fontSize={16} fontFamily={'NotoSans-SemiBold'} mb={3}>
                {t('Location')}
              </Text>
              <View bg={'loc'} p={5}>
                <Row
                  alignItems={'center'}
                  flexDir={currentLanguage === 'ar' ? 'row-reverse' : 'row'}>
                  {AllEventData?.result?.locations?.[0]?.type === 'physical' ? (
                    <>
                      <Ionicons
                        name={'location'}
                        size={18}
                        color={'#A8A8A8'}
                        style={{ marginLeft: 5 }}
                      />
                      <View mx={5}>
                        <Text
                          fontSize={12}
                          fontFamily={'NotoSans-Medium'}
                          color={'#555555'}>
                          Address
                        </Text>
                        <Text
                          mt={2}
                          fontSize={16}
                          fontFamily={'NotoSans-SemiBold'}>
                          {AllEventData?.result?.locations?.[0]?.address || 'No address available'}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <Text>No Location</Text>
                    // <>
                    //   <Image
                    //     source={require('../../assets/primary.png')}
                    //     alt={'png'}
                    //   />
                    //   <View mx={5}>
                    //     <Text
                    //       fontSize={12}
                    //       fontFamily={'NotoSans-Medium'}
                    //       color={'#555555'}>
                    //       {t('Web Conference')}
                    //     </Text>
                    //     {AllEventData?.result?.locations?.[0]?.platform_name === 'zoom' ? (
                    //       <Text
                    //         mt={2}
                    //         fontSize={16}
                    //         fontFamily={'NotoSans-SemiBold'}>
                    //         Zoom
                    //       </Text>
                    //     ) : (
                    //       <Text
                    //         mt={2}
                    //         fontSize={16}
                    //         fontFamily={'NotoSans-SemiBold'}>
                    //         Google Meet
                    //       </Text>
                    //     )}
                    //   </View>
                    // </>
                  )}

                  {/* {AllEventData?.result?.locations[0]?.type === 'physical' ? (
                    <>
                      <Ionicons
                        name={'location'}
                        size={18}
                        color={'#A8A8A8'}
                        style={{marginLeft: 5}}
                      />
                      <View mx={5}>
                        <Text
                          fontSize={12}
                          fontFamily={'NotoSans-Medium'}
                          color={'#555555'}>
                          Address
                        </Text>
                        <Text
                          mt={2}
                          fontSize={16}
                          fontFamily={'NotoSans-SemiBold'}>
                          {AllEventData?.result?.locations[0]?.address}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <Image
                        source={require('../../assets/primary.png')}
                        alt={'png'}
                      />
                      <View mx={5}>
                        <Text
                          fontSize={12}
                          fontFamily={'NotoSans-Medium'}
                          color={'#555555'}>
                          {t('Web Conference')}
                        </Text>
                        {AllEventData?.result?.locations[0]?.platform_name ===
                        'zoom' ? (
                          <Text
                            mt={2}
                            fontSize={16}
                            fontFamily={'NotoSans-SemiBold'}>
                            Zoom
                          </Text>
                        ) : (
                          <Text
                            mt={2}
                            fontSize={16}
                            fontFamily={'NotoSans-SemiBold'}>
                            Google Meet
                          </Text>
                        )}
                      </View>
                    </>
                  )} */}
                </Row>
              </View>
            </View>
            <View bg={'secondary'} p={5} borderRadius={10} my={5}>
              <Text fontSize={16} fontFamily={'NotoSans-SemiBold'} mb={3}>
                {t('Questions')}
              </Text>
              {AllEventData?.result?.questions?.length > 0 ? (
                <>
                  {AllEventData?.result?.questions?.map((question, index) =>
                    renderQuestion(question, index),
                  )}
                </>
              ) : null}
            </View>
          </View>
        </ScrollView>
      )}

      <View>
        <DelModal
          modalVisible={modalVisible}
          loader={isLoading}
          onPress={(res) => handleDelete(res)}
        />
      </View>
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute buttons evenly
    // width: '100%', // Fill the available width
  },
  button: {
    flex: 1, // Make buttons equal width
    margin: 5,
  },
});
