import {StyleSheet} from 'react-native';
import {
  Input,
  Row,
  ScrollView,
  Text,
  View,
  Pressable,
  Select,
  CheckIcon,
  Checkbox,
  Radio,
} from 'native-base';
import React from 'react';
import Header from '../../components/Header/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Questions = ({route}) => {
  //   const fromEdit = route?.params;
  const questions = route?.params?.questions;
  console.log('questions: ', questions);

  const renderQuestion = (question, index) => {
    if (question?.type === 'oneline' || question?.type === 'number') {
      return (
        <Pressable bg={'secondary'} key={index} p={3} mb={5} rounded={'md'}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'}>{question?.text}</Text>
          </Row>
          {question?.type === 'oneline' || question?.type === 'number' ? (
            <>
              {question?.responses?.map(res => {
                return (
                  <Row alignItems={'center'} justifyContent={'space-between'}>
                    <Text
                      color={'black'}
                      fontSize={14}
                      fontFamily={'NotoSans-SemiBold'}>
                      {res?.text}
                    </Text>
                  </Row>
                );
              })}
            </>
          ) : null}
        </Pressable>
      );
    } else if (question?.type === 'name' || question?.type === 'email') {
      return (
        <Pressable bg={'secondary'} key={index} p={3} mb={5} rounded={'md'}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'}>{question?.text}</Text>
          </Row>
          {question?.type === 'name' || question?.type === 'email' ? (
            <>
              {question?.responses?.map(res => {
                return (
                  <Row alignItems={'center'} justifyContent={'space-between'}>
                    <Text
                      color={'black'}
                      fontSize={14}
                      fontFamily={'NotoSans-SemiBold'}>
                      {res?.text}
                    </Text>
                  </Row>
                );
              })}
            </>
          ) : null}
        </Pressable>
      );
    } else if (question?.type === 'multipleLine') {
      return (
        <Pressable bg={'secondary'} key={index} p={5} mb={5} rounded={'md'}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Text color={'grey.400'}>{question?.text}</Text>
          </Row>
          {question?.type === 'multipleLine' ? (
            <>
              {question?.responses?.map(res => {
                return (
                  <Row alignItems={'center'} justifyContent={'space-between'}>
                    <Text
                      color={'black'}
                      fontSize={14}
                      fontFamily={'NotoSans-SemiBold'}>
                      {res?.text}
                    </Text>
                  </Row>
                );
              })}
            </>
          ) : null}
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
                    onChange={nextValue => {}}>
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
              onChange={() => {}}>
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
            onValueChange={() => {}}
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

  return (
    <View bg={'white'} flex={1}>
      <Header title={'Questions'} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        flex={1}>
        <View m={5}>
          {questions?.map((question, index) => renderQuestion(question, index))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Questions;
