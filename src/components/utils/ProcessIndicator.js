import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, ActivityIndicator } from 'react-native';
// import { SkypeIndicator } from 'react-native-indicators';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subContainer: {
        alignSelf: 'center',
        height: 60,
    },
    textStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#fff',
    },
});

const ProcessIndicator = (props) => {
    return (
        <Modal animationType="fade" transparent={false} onRequestClose={() => {}} {...props}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    {/* <SkypeIndicator color={'#ff6a00'} size={20} /> */}
                    <ActivityIndicator size="large" color={'#ff6a00'} />
                    <Text style={styles.textStyle}>Please wait...</Text>
                </View>
            </View>
        </Modal>
    );
};

export default ProcessIndicator;
