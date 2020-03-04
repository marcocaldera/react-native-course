import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import Card from '../components/Card'
import Input from '../components/Input'
import BodyText from '../components/BodyText'
import NumberContainer from '../components/NumberContainer'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'
import Colors from "../constants/colors";
import { reset } from "expo/build/AR";

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confimInputHandler = () => {

        const chosenNumber = parseInt(enteredValue)
        // se non ho inserito un numero Not-a-Number o è negativo o maggiore di 99
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number', 'Number has to be a number between 1 and 99.', [
                { text: 'Okay', style: 'destructive', onPress: resetInputHandler }
            ])
            return
        }

        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton
                    onPress={() => props.onStartGame(selectedNumber)} >
                    START GAME
                </MainButton>
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText style={styles.text}>Select a number</BodyText>
                    {/* blurOnSubmit serve su android per togliere la soft keyboard quando si preme invio */}
                    <Input
                        style={styles.input}
                        maxLength={2}
                        keyboardType='number-pad'
                        autoCorrent={false}
                        blurOnSubmit
                        autoCapitalize='none'
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                color={Colors.secondary}
                                title='Reset'
                                onPress={resetInputHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button
                                color={Colors.primary}
                                title='Confirm'
                                onPress={confimInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, // prende tutto lo spazio che ha a disposizione
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'

    },
    inputContainer: {
        width: 300,
        maxWidth: '80%', // nel caso dei dispositivi non abbiamo 300pixel di width setto che al max si può occupare l'80% dello spazio
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%', // prende tutto lo spazio a disposizone (questo spazio è determinato dal parent)
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: '40%'
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen;