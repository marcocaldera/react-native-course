import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from "react-native";
import NumberContainer from "../components/NumberContainer";
import DefaultStyles from "../constants/default-styles";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import { Ionicons } from "@expo/vector-icons";
import { ScreenOrientation } from "expo";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <Text>{itemData.item}</Text>
    </View>
)
// const renderListItem = (value, numOfRound) => (
//     <View key={numOfRound} style={styles.listItem}>
//         <BodyText>#{numOfRound}</BodyText>
//         <Text>{value}</Text>
//     </View>
// )

const GameScreen = props => {

    // blocchiamo l'orientation
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    // useRef esattamente come useState salva un valore anche in caso di re-render di un componente ma
    // a differenza di useState non ritrigghera il render del componente (molto utile per ottimizzare il codice
    // quando la modifica non comporta una modifica da mostare visivamente)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    // faccio questo cos?? nel useEffect andiamo a mettere come condizioni per richiamarlo solamente questi valori e non tutte
    // le props che abbiamo, altrimenti ogni qual volta cambia una singola props (anche tra quelle a cui non siamo interessati)
    // viene richiamato lo useEffect
    const { userChoice, onGameOver } = props

    // anche se il codice ?? qua questa funzione viene chiamata alla fine del render/esecuzione di tutto il componente
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    useEffect(() => {

        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width)
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }

        Dimensions.addEventListener('change', updateLayout)

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
                { text: 'Sorry!', style: 'cancel' }
            ])
            return
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        //setRounds(curGuess => curGuess + 1)
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <View style={styles.newLayout}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                        <Ionicons name="md-remove" size={24} color={'white'} />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color={'white'} />
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
                </ScrollView> */}

                    <FlatList
                        contentContainerStyle={styles.list}
                        keyExtractor={(item, index) => index.toString()}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color={'white'} />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color={'white'} />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
                </ScrollView> */}

                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={(item, index) => index.toString()}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, //prendo tutto lo spazio che c'?? e lo metto a disposizione della view
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    listContainer: {
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        flex: 1 // altrimenti su android non ?? scrollabile
    },
    list: {
        flexGrow: 1, //la quantit?? di spazio che richiede la lista ?? flessibile
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    newLayout: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }
})

export default GameScreen