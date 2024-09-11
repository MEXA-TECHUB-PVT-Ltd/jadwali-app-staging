import {Pressable} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const AvailableComponent = props => {
  const [pressed, setPressed] = React.useState('Monday');
  const handlePress = id => {
    setPressed(id);
  };
  const {t} = useTranslation();
  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        handlePress(item);
      }}>
      <View
        style={[
          styles.item,
          {
            backgroundColor: item === pressed ? '#6C309C' : '#EFEFEF',
            width: props?.translation === 'ar' ? 90 : null,
          },
        ]}>
        <Text
          style={[
            styles.txt,
            {
              color: item === pressed ? 'white' : '#979797',
              fontFamily:
                item === pressed ? 'NotoSans-Medium' : 'NotoSans-Regular',
            },
          ]}>
          {t(item)}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View
      style={[
        styles.container,
        {alignItems: props?.translation === 'ar' ? 'flex-end' : null},
      ]}>
      <FlatList
        data={props?.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Set the number of columns as needed
        // columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
  },
  item: {
    // flex: 1,

    // height: '0%',
    // width: '28%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    // marginRight: 20,
    backgroundColor: '#6C309C',
    borderRadius: 20,
    // padding: 8,
    // padding: 10,
    // Adjust width based on the number of columns and spacing
  },
  columnWrapper: {
    // justifyContent: 'space-around',
  },
  txt: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'NotoSans-Regular',
    margin: 5,
    marginHorizontal: 14,
  },
});

export default AvailableComponent;
