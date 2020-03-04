import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'

import BodyText from '../components/BodyText'
import Colors from '../constants/colors'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const GameOverScreen = (props) => {

    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={1000} // fade in
                    resizeMode='cover' // cover è il default
                    style={styles.image}
                    source={require('../assets/success.png')}
                //source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Summit_of_the_Matterhorn.jpg' }}
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    You phone needed: <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
                guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
            </View>
            <MainButton onPress={props.onRestart} >NEW GAME</MainButton>
        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: 150, // la metà di altezza e larghezza per avere un cerchio perfetto
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    resultContainer: {
        width: '80%',
        marginVertical: 20
    }
})

export default GameOverScreen

