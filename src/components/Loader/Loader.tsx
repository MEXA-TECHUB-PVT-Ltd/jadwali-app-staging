import {View, ActivityIndicator, Modal, StyleSheet} from 'react-native';
import React from 'react';

// import { COLORS } from "../../utils/COLORS";
import Lottie from 'lottie-react-native';

const LoaderModal = ({visible}) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.main_view}>
        <Lottie
          source={require('../../assets/spinner.json')}
          autoPlay
          loop
          style={{
            // marginBottom: 5,
            height: 80,
            width: 80,
            // backgroundColor: 'black',
          }}></Lottie>
      </View>
    </Modal>
  );
};

export default LoaderModal;
const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
