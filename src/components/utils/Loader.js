import React, { Component } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

export default class Loader extends Component {
    render() {
        return (
            <Modal
                transparent
                animationType="fade"
                onRequestClose={() => {

                }}
                {...this.props}
            >
                <View style={[styles.container]}>
                    {/* <WaveIndicator
                        count={2}
                        waveFactor={0.4}
                        color={Color.themeColor}
                        size={30}
                    /> */}
                    <ActivityIndicator size="large" color={this.props.loaderColor ? this.props.loaderColor : 'orange'} />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

