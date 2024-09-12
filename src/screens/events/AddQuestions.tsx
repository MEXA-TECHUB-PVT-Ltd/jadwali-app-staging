import {
  View,
  Text,
  Switch,
  Row,
  Pressable,
  Divider,
  ScrollView,
  Input,
  DeleteIcon,
  AddIcon,
  Checkbox,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Header from '../../components/Header/Header';
import BottomSheet from '../../components/bottomSheet/BottomSheet';
import JdInputs from '../../components/inputs/inputs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import JdButton from '../../components/button/Buttons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AlertModal from '../../components/Modal/AlertModal';
import {useSelector, useDispatch} from 'react-redux';
import {setNameEmail} from '../../redux/fatures/counter/counterSlice';
import {
  useAddQuestionMutation,
  useUpdateQuestionMutation,
} from '../../redux/event/event';
import AlertSnackBar from '../../components/customSnackBar/AlertSnackBar';
import { Platform } from 'react-native';

const AddQuestion = ({route, navigation}) => {
  const fromEdits = route?.params?.fromEdits;
  const fromEvent = route?.params?.fromEvent;
  console.log("form event",fromEvent);
  // console.log(fromEdits);
  const eid = route.params?.id;
  const id = route?.params?.ind;
  console.log("question id",id);
  const eventQuestion = route?.params?.question; // Move this line here

  const [status, setStatus] = React.useState(
    eventQuestion ? eventQuestion.status : false
  );
  // const [status, setStatus] = React.useState(false);
  const [
    updateQuestion,
    {data: isDatas, error: isErrors, isLoading: updateLoading},
  ] = useUpdateQuestionMutation();

  const count = useSelector(state => state.counter.nameEmail);
  const [required, setRequired] = React.useState(
    eventQuestion?.is_required ? eventQuestion?.is_required : false,
  );
  const dispatch = useDispatch();
  const [questions, setQuestions] = React.useState(count);
  const [value, setValue] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  let body = {
    status: false,
    message: 'Please select at least one type',
  };
  const [postQuestion, {data: isData, error: isError, isLoading}] =
    useAddQuestionMutation();

  const formSchema = Yup.object().shape({
    question: Yup.string().required('Question cannot be empty'),
  });

  const [modalVisible, setModalVisible] = React.useState(false);
  const [options, setOptions] = React.useState(
    eventQuestion?.options
      ? eventQuestion?.options
      : ['Answer 1', 'Answer 2', 'Answer 3'],
  );
  const [incl, setInclude] = React.useState(false);
  const handleCreate = async q => {
    if (!fromEvent) {
      if (ans != null && ans != undefined && ans !== '') {
        if (ans === 'oneline' || ans === 'multipleLine' || ans === 'number') {
          const newQuestion = {
            type: ans,
            text: q,
            is_required: required,
            status: status,
            event_id: eid,
          };
          postQuestion(newQuestion).then(async res => {
            console.log('Add Question Response:', res);
            if (res?.data?.status === true) {

              await setQuestions([...questions, res?.data?.result]);
              const questionId = res?.data?.result?.id; // Extract question ID from response
    console.log('Question ID:', questionId); // Log the question ID


              await dispatch(setNameEmail([...questions, res?.data?.result]));
 try {
      await AsyncStorage.setItem('questionId', JSON.stringify(questionId));
      console.log('Question ID saved locally:', questionId);
    } catch (error) {
      console.error('Error saving question ID locally:', error);
    }
              navigation.goBack();

              // navigation.goBack();
            }
          });
        } else if (ans === 'radio' || ans === 'checkboxes') {
          const newQuestion = {
            type: ans,
            text: q,
            options: options,
            others: incl,
            is_required: required,
            event_id: eid,
            status: status,
          };

          postQuestion(newQuestion).then(async res => {
            console.log('Add Question Response:', res);
            if (res?.data?.status === true) {
                 const questionId = res?.data?.result?.id; // Extract question ID from response
    console.log('Question ID:', questionId); // Log the question ID

              await setQuestions([...questions, res?.data?.result]);

              await dispatch(setNameEmail([...questions, res?.data?.result]));
try {
      await AsyncStorage.setItem('questionId', JSON.stringify(questionId));
      console.log('Question ID saved locally:', questionId);
    } catch (error) {
      console.error('Error saving question ID locally:', error);
    }
              navigation.goBack();
            }
          });
        } else {
          const newQuestion = {
            type: ans,
            text: q,
            others: incl,
            options: options,
            is_required: required,
            event_id: eid,
            status: status,
          };

          postQuestion(newQuestion).then(async res => {
            console.log('Add Question Response:', res);
            if (res?.data?.status === true) {
              await setQuestions([...questions, res?.data?.result]);

              await dispatch(setNameEmail([...questions, res?.data?.result]));

              navigation.goBack();
            }
          });
        }
      }
      //   if (count?.id === 1) {
      //     navigation.navigate('SceduleEvent');
      //   }
      else {
        setModalVisible(true);
      }
    } else {
      if (ans != null && ans != undefined) {
        if (ans === 'oneline' || ans === 'multipleLine' || ans === 'number') {
          const newQuestion = {
            type: ans,
            text: q,
            is_required: required,
            status: status,
            event_id: eid,
            question_id: eventQuestion?.id,
          };

          updateQuestion(newQuestion).then(async res => {
            console.log('Add Question Response:', res);
            if (res?.data?.status === true) {
              const newObj = [...questions];
              newObj[id] = res?.data?.result;

              await dispatch(setNameEmail(newObj));
              navigation.goBack();
            }
          });
        } else if (ans === 'radio' || ans === 'checkboxes') {
          const newQuestion = {
            type: ans,
            text: q,
            options: options,
            others: incl,
            is_required: required,
            status: status,
            event_id: eid,
            question_id: eventQuestion?.id,
          };

          updateQuestion(newQuestion).then(async res => {
            console.log('Add Question Response:', res);
            if (res?.data?.status === true) {
              const newObj = [...questions];
              newObj[id] = res?.data?.result;

              await dispatch(setNameEmail(newObj));
              navigation.goBack();
            }
          });
        } else {
          const newQuestion = {
            type: ans,
            text: q,
            options: options,
            others: incl,
            is_required: required,
            status: status,
            event_id: eid,
            question_id: eventQuestion?.id,
          };

          updateQuestion(newQuestion).then(async res => {
            console.log('Add Question Response:', res);
            if (res?.data?.status === false) {
              const newObj = [...questions];
              newObj[id] = res?.data?.result;

              await dispatch(setNameEmail(newObj));
              navigation.goBack();
            }
          });
        }
      }
    }
  };

  const bottomSheetRef = React.createRef();
  const [ans, setAns] = React.useState(
    eventQuestion?.type ? eventQuestion?.type : '',
  );
  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    } else {
    }
    // setModalVisible(true);
  };
  const del = index => {
    setOptions(prev => {
      return options.filter(item => options.indexOf(item) !== index);
    });
  };
  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };
  const handleSelection = id => {
    if (id === 1) {
      setAns('oneline');
    }
    if (id === 2) {
      setAns('multipleLine');
    }
    if (id === 3) {
      setAns('radio');
    }
    if (id === 4) {
      setAns('checkboxes');
    }
    if (id === 5) {
      setAns('dropdown');
    }
    if (id === 6) {
      setAns('number');
    }
    closeBottomSheet();
  };
  return (
    <View bg={'white'} flex={1}>
      <Header title={fromEvent === true ? 'Edit Questions' : 'Add Questions'} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            question: fromEvent ? eventQuestion?.text : '',
            option: '',
          }}
          validationSchema={formSchema}
          onSubmit={values => handleCreate(values.question)}>
          {({
            values,
            handleChange,
            handleSubmit,
            touched,
            errors,
          }) => (
            <View mx={5} my={5}>
              <JdInputs
                label="Question"
                fontFamily={'NotoSans-SemiBold'}
                fontSize={18}
                // placeholder={'Questions'}
                leftIconName={'questioncircleo'}
                value={values.question}
                onChangeText={handleChange('question')}
              />
              {touched.question && errors.question && (
                <View flexDir={'row'} alignItems={'center'} mt={1}>
                  <View bg={'red.500'} h={2} w={2} rounded={'full'} mr={1} />
                  <Text color={'red.500'} fontSize={12}>
                    {errors.question}
                  </Text>
                </View>
              )}
              <Row my={5} ml={1} alignItems={'center'}>
                <Switch
                  size={Platform.OS == "ios" ? "sm" : 'md'}
                  onThumbColor={'primary.50'}
                  onToggle={() => setRequired(!required)}
                  isChecked={required}
                  onTrackColor={'#6C309C26'}
                />
                <Text fontSize={14} fontFamily={'NotoSans-Medium'} ml={2}>
                  Required
                </Text>
              </Row>
              <Pressable
                onPress={() => openBottomSheet()}
                bg={'secondary'}
                p={3}
                rounded={'full'}>
                <Row alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontSize={16} color={'grey.400'}>
                    {ans === '' ? 'Answer type' : ans}
                  </Text>
                  <AntDesign name="down" color={'#B0B0B0'} size={15} />
                </Row>
              </Pressable>

              <Text
                ml={1}
                color={'black'}
                mt={5}
                fontSize={16}
                fontFamily={'NotoSans-Medium'}>
                Status
              </Text>
              <Row my={5} ml={1} alignItems={'center'}>
                <Switch
                  size={Platform.OS == "ios" ? "sm" : 'md'}
                  onThumbColor={'primary.50'}
                  onTrackColor={'#6C309C26'}
                  onToggle={() => setStatus(!status)}
                  isChecked={status}

                />
                <Text fontSize={14} fontFamily={'NotoSans-Medium'} ml={2}>
                  {status ? 'On' : 'Off'}
                </Text>
              </Row>
              {ans === 'radio' || ans === 'checkboxes' || ans === 'dropdown' ? (
                <>
                  <Text fontSize={14} fontFamily={'NotoSans-SemiBold'} mt={5}>
                    Answers
                  </Text>
                  <Text
                    fontSize={11}
                    fontFamily={'NotoSans-Regular'}
                    mt={5}
                    color={'grey.400'}>
                    Invitee can select one of the following
                  </Text>

                  <View mt={5}>
                    <View alignItems={'center'} w={'100%'} alignSelf={'center'}>
                      {options?.map((item, index) => {
                        return (
                          <Row alignItems={'center'} mb={4}>
                            <Input
                              w={'80%'}
                              onChangeText={txt => {
                                options[index] = txt;
                              }}
                              borderRadius={10}
                              bg={'secondary'}
                              placeholder={`${item.split(' ')[0]} ${index + 1}`}
                            />
                            <DeleteIcon
                              size={'sm'}
                              color={'primary.50'}
                              ml={5}
                              onPress={() => del(index)}
                            />
                          </Row>
                        );
                      })}
                      <Pressable
                        onPress={() => {
                          if (options?.length > 0) {
                            const lnth = options?.length + 1;

                            setOptions([...options, `Answer ${lnth}`]);
                          } else {
                            setOptions(['Answer 1']);
                          }
                        }}>
                        <Row alignItems={'center'}>
                          <AddIcon
                            size={'xs'}
                            color={'primary.50'}
                            alignSelf={'center'}
                          />
                          <Text
                            fontSize={14}
                            fontFamily={'NotoSans-Medium'}
                            textAlign={'center'}
                            color={'primary.50'}>
                            Add Another
                          </Text>
                        </Row>
                      </Pressable>
                    </View>
                    {ans === 'dropdown' ? null : (
                      <Checkbox
                        alignSelf={'flex-start'}
                        mt={4}
                        value="ok"
                        _text={{fontSize: 14, ml: 0}}
                        onChange={() => {
                          setInclude(!incl);
                        }}
                        isChecked={incl}>
                        Include "other" option
                      </Checkbox>
                    )}
                  </View>
                </>
              ) : null}
              <View mt={10}>
                <JdButton
                  title={fromEvent === true ? 'Edit' : 'Add'}
                  onPress={handleSubmit}
                  loading={isLoading ? isLoading : updateLoading}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <BottomSheet
        defaultOff={true}
        height={'45%'}
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
        <View mt={5}>
          <Pressable>
            <Text mb={2} fontSize={14} fontFamily={'NotoSans-SemiBold'}>
              Select Answer Type
            </Text>
          </Pressable>
          <View mx={2}>
            <Pressable onPress={() => handleSelection(1)}>
              <Text color={'grey.400'} fontSize={16} ml={2}>
                One Line
              </Text>
              <Divider my={3} />
            </Pressable>
            <Pressable onPress={() => handleSelection(2)}>
              <Text color={'grey.400'} fontSize={16} ml={2}>
                Multiple Lines
              </Text>
              <Divider my={3} />
            </Pressable>
            <Pressable onPress={() => handleSelection(3)}>
              <Text color={'grey.400'} fontSize={16} ml={2}>
                Radio Buttons
              </Text>
              <Divider my={3} />
            </Pressable>
            <Pressable onPress={() => handleSelection(4)}>
              <Text color={'grey.400'} fontSize={16} ml={2}>
                Check boxes
              </Text>
              <Divider my={2} />
            </Pressable>
            <Pressable onPress={() => handleSelection(5)}>
              <Text color={'grey.400'} fontSize={16} ml={2}>
                Dropdown
              </Text>
              <Divider my={2} />
            </Pressable>
            <Pressable onPress={() => handleSelection(6)}>
              <Text color={'grey.400'} fontSize={16} ml={2}>
                Phone Number
              </Text>
            </Pressable>
          </View>
          {/* <TextArea bg={'secondary'} borderRadius={12} h={16} borderWidth={0} /> */}
        </View>
        {/* </View> */}
      </BottomSheet>
      <AlertSnackBar
        message={isError?.data?.message ? isError?.data : body}
        // status={ale?.status}
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
          if (!isError) {
          }
        }}
      />
    </View>
  );
};
export default AddQuestion;
