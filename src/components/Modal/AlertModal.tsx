import {VStack, Modal, Text, Button, Heading, Row, View} from 'native-base';
import React from 'react';

export default function ({
  modalVisible,
  setModalVisible,
  heading,
  message,
  btntxt1,
  btntxt2,
  children,
  onPress,
  fromSettings,
}) {
  // const [modalVisible, setModalVisible] = React.useState();
  return (
    <Modal isOpen={modalVisible} flex={1} p={2}>
      <Modal.Content
        w={'90%'}
        h={'22%'}
        _light={{bg: 'white'}}
        // alignItems={'flex-start'}
        _dark={{bg: 'black'}}>
        <Text
          mt={2}
          mx={5}
          // w={'100%'}
          color={'red.600'}
          fontFamily={'NotoSans-SemiBold'}
          fontSize={16}>
          {heading}
        </Text>

        <Text mt={2} fontSize={14} mx={5}>
          {message}
        </Text>
        <Button.Group
          // direction="coloumn"
          my="3"
          // flex={1}
          // w=
          alignSelf={'center'}
          // justifyContent="space-between"
          alignItems={'center'}
          // ml={5}
        >
          <Row
            alignSelf={'center'}
            alignItems={'center'}
            justifyContent="center">
            {btntxt1 ? (
              <Button
                rounded="full"
                // _stack={{bgColor: 'transparent'}}
                accessibilityLabel="modal-btn1"
                onPress={
                  () => {
                    setModalVisible(false);
                  }
                  // await storeScreenName('SCREENNAME', 'AddLocationScreen');
                  // navigation.navigate('AddLocationScreen');
                }
                mr={2}
                alignSelf={'center'}
                w={'42%'}
                variant="outline"
                _text={{
                  color: 'primary.50',
                  fontSize: 14,
                  fontFamily: 'NotoSans-Medium',
                }}
                borderColor={'primary.50'}
                borderWidth={1}
                // flex={1}
                size="sm">
                {btntxt1}
              </Button>
            ) : null}

            <Button
              _stack={{bgColor: 'transparent'}}
              // ml={1}
              borderWidth={1}
              accessibilityLabel="modal-btn2"
              onPress={
                // handleDontAllow();
                onPress
              }
              rounded="full"
              // flex={1}
              w={fromSettings ? '40%' : '80%'}
              // ml={fromSettings === true ? 2 : 16}
              size={btntxt1 ? 'sm' : 'sm'}
              bg={'primary.50'}
              _text={{
                color: 'white',
                fontSize: 14,
                fontFamily: 'NotoSans-Medium',
              }}
              //   variant="outline"
            >
              {btntxt2}
            </Button>
          </Row>
        </Button.Group>
        {/* </View> */}
      </Modal.Content>
    </Modal>
  );
}
