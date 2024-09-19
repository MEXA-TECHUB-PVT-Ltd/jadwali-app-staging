import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'native-base';
import { Snackbar } from 'react-native-paper';

const AlertSnackBarOne = props => {
    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View
            position={'absolute'}
            bottom={16}
            flexDir={'column-reverse'}
            zIndex={1}
            width={'100%'}
            alignSelf={'flex-end'}>
            <Snackbar
                visible={props?.visible}
                onDismiss={props?.onDismiss}
                style={{
                    alignItems: 'flex-end',
                    backgroundColor: props?.status === false ? '#FF3434' : '#6C3',
                }}
                duration={2000}
                {...props}>
                <Text
                    style={{
                        color: 'white',
                    }}>
                    {props?.message || 'Something went wrong!'}
                </Text>
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default AlertSnackBarOne;