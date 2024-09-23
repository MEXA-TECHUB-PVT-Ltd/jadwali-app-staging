import {View, Text, Row, Avatar, VStack, Pressable} from 'native-base';
import React from 'react';
import {adaptNavigationTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const NotifiComp = props => {
  const navigation = useNavigation();
  return (
    <>
      {props?.data?.map(item => {
        return (
          <View
            borderColor={item?.status === 'early' ? 'primary.50' : 'grey.400'}
            bg={'secondary'}
            mb={5}
            borderWidth={1}
            borderRadius={10}
            key={item?.id}>
            <Pressable>
              <Row alignItems={'center'} m={2} w={'100%'}>
                <Text
                  position={'absolute'}
                  right={5}
                  top={0}
                  color={'grey.400'}
                  fontSize={10}
                  fontFamily={'Jost-Regular'}>
                  {item?.time}
                </Text>
                <Row alignItems={'center'}>
                  <Avatar source={item?.img} h={9} w={9} mr={2} />

                  <VStack>
                    <Row alignItems={'center'} justifyContent={'space-between'}>
                      <Text
                        color={item?.status ? 'primary.50' : 'black'}
                        fontSize={14}
                        fontFamily={'Jost-Medium'}>
                        {item?.title}
                      </Text>
                    </Row>
                    <Text
                      numberOfLines={1}
                      mt={2}
                      color={'grey.400'}
                      fontSize={12}
                      fontFamily={'Jost-Regular'}>
                      {item?.message}
                    </Text>
                  </VStack>
                </Row>
              </Row>
            </Pressable>
          </View>
        );
      })}
    </>
  );
};
export default NotifiComp;
