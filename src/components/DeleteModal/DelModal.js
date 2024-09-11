import { StyleSheet, Text, View, Modal, TouchableOpacity,Pressable, ActivityIndicator } from 'react-native'
import React from 'react'

const DelModal = ({ modalVisible, onPress,loader }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
             <Pressable
                android_ripple={{ color: 'transparent' }}
                onPress={(event) => event.target == event.currentTarget && onPress("No")}
                style={styles.modalContainer}
            >
                <View style={{ backgroundColor: "#fff", padding: 20, width: '90%', borderRadius: 10 }}>
                    <Text style={styles.modalText}>{"Are you sure to delete"}</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={()=>onPress("yes")} style={[styles.buttons,{backgroundColor:'#6C309C'}]}>
                           {loader ? <ActivityIndicator color={"#fff"}/> :  <Text style={[styles.ynTxt,{color:'#fff'}]}>Yes</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>onPress("No")}  style={[styles.buttons, { backgroundColor: null, borderWidth: 1 }]}>
                            <Text style={styles.ynTxt}>NO</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Pressable>
        </Modal>
    )
}

export default DelModal
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    ynTxt:{ fontFamily: 'NotoSans-Medium', fontSize: 16,color:'#000' },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
        color:'#000',
        fontFamily: 'NotoSans-Medium'
    },
    buttons: {
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#A8A8A8'
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop:20,
        justifyContent: 'space-around',

        // justifyContent: 'space-around', // Distribute buttons evenly
    },
    button: {
        flex: 1, // Make buttons equal width
        margin: 5,
    },
});