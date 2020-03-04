import React, { useState } from "react";
import { Modal, View, TextInput, StyleSheet, Button, Keyboard, TouchableWithoutFeedback, TouchableNativeFeedback } from "react-native";

const GoalInput = props => {

    const [enteredGoal, setEnteredGoal] = useState('')

    const goalInputHandler = (enteredGoal) => {
        setEnteredGoal(enteredGoal)
    }

    const addGoalHandler = () => {
        props.onAddGoal(enteredGoal)
        setEnteredGoal('')
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Course Goal'
                    style={styles.input}
                    onChangeText={goalInputHandler}
                    value={enteredGoal} />

                {/* Serve utilizzare una delle due scritture di sotto
             perchè chiamare props.onAddGoal() con le parentesi
             porteremmo a far chiamare automaticamente la funzione e non all'onPress */}

                {/* <Button title='ADD' onPress={props.onAddGoal.bind(this, enteredGoal)} /> */}
                <View style={styles.buttonWrapper}>
                    {/* non possiamo aggiungere uno style al button e quindi dobbiamo wrappare il button
                    all'interno di una view a cui assegniamo una larghezza */}
                    <View style={styles.button}><Button title='CANCEL' color='red' onPress={props.onCancel} /></View>
                    <View style={styles.button}><Button title='ADD' onPress={addGoalHandler} /></View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#ff0',
        width: '70%',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%'
    },
    button: {
        width: '60%' //40% della width del parent
    }
})

export default GoalInput