import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Box, Stack, useColorMode} from 'native-base';

interface Props {
  openBottom?: () => void;
  children: React.ReactNode;
  defaultOff?: boolean;
  height: string;
  width: string;
}

const BottomSheet = ({
  children,
  defaultOff,
  height,
  openBottom,
  width,
}: Props) => {
  // useEffect(() => {
  //   if (!defaultOff) openBottomSheet();
  // }, []);
  const bottomSheetRef = useRef(null);
  const {colorMode} = useColorMode();
  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  useEffect(() => {
    if (!defaultOff) {
      openBottomSheet();
    }
  }, []);

  return (
    <RBSheet
      ref={defaultOff ? openBottom : bottomSheetRef}
      closeOnDragDown={false}
      closeOnPressMask={defaultOff ? true : false}
      closeOnPressBack={true}
      openDuration={250}
      customStyles={{
        wrapper: styles.wrapper,
        container: [
          styles.container,
          {
            width: width,
            backgroundColor: colorMode === 'dark' ? '#1D2939' : 'white',
            height: height,
            borderColor: 'grey',
            borderWidth: 0.5,
          },
        ],
        draggableIcon: styles.draggableIcon,
      }}>
      {children}
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  container: {
    backgroundColor: '#fff',
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
  draggableIcon: {
    backgroundColor: 'transparent',
  },
});
