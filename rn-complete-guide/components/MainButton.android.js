import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, Button } from 'react-native'
import Colors from '../constants/colors'

const MainButton = (props) => {

    // Per usarlo come JSX serve abbia la lettera maiuscola
    let ButtonComponent = TouchableOpacity

    if (Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback // cosi abbiamo il "ripple effect" su Android
    }

    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.8} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 20
    },
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    }

})

export default MainButton

